"use client"

import { useScroll, Instances } from "@react-three/drei"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { useMemo, useRef, useState, useEffect } from "react"
import { Group, Vector3, Euler, MathUtils, TextureLoader, Color, CatmullRomCurve3, Object3D } from "three"
import ArtInstance from "./ArtInstance"
import { artProducts } from "@/data/art-products"
import { useArtInteraction } from "./store"

// 1. Data Generation (400 items)
const COUNT = 400
const ribbonData = Array.from({ length: COUNT }).map((_, i) => {
    const base = artProducts[i % artProducts.length]
    return { ...base, id: i, title: `Artwork ${i + 1}` }
})

// Group by URL for instancing
const groupedData = ribbonData.reduce((acc, item) => {
    if (!acc[item.url]) acc[item.url] = []
    acc[item.url].push(item)
    return acc
}, {} as Record<string, typeof ribbonData>)

export default function ArtCloud() {
    const scroll = useScroll()
    const { camera } = useThree()
    const { activeFilter, hoveredId } = useArtInteraction()

    // 2. The "Ribbon" Path (Deep Z axis wind)
    // Starts at Z=0, winding back to Z=-100 or -150
    const curve = useMemo(() => {
        return new CatmullRomCurve3([
            new Vector3(0, 0, 0),
            new Vector3(10, 5, -20),
            new Vector3(-5, -5, -40),
            new Vector3(-15, 0, -60),
            new Vector3(10, 10, -80),
            new Vector3(20, -5, -100),
            new Vector3(0, 0, -120)
        ], false, 'catmullrom', 0.5)
    }, [])

    // 3. Compute Positions along the curve + Noise
    const positions = useMemo(() => {
        const data = []
        // We want specific spacing. constant t steps.

        for (let i = 0; i < COUNT; i++) {
            const t = i / COUNT
            const point = curve.getPoint(t)
            const tangent = curve.getTangent(t) // Direction vector

            // Create a "Disk" frame perpendicular to the curve
            // We need a stable 'up' vector. 
            // Standard trick: cross tangent with arbitrary up (0,1,0), unless tangent is vertical.
            const up = new Vector3(0, 1, 0)
            let axis = new Vector3().crossVectors(up, tangent).normalize()
            if (axis.lengthSq() < 0.001) { // Gimbal lock check
                axis = new Vector3(1, 0, 0)
            }
            const bitangent = new Vector3().crossVectors(tangent, axis).normalize()

            // Random angle and radius for tube thickness
            const angle = Math.random() * Math.PI * 2
            const radius = 3 + Math.random() * 4 // 3 to 7 spread (Tube thickness)

            // Calculate offset in the disk plane (axis/bitangent plane)
            // Actually, we can just use the axis rotated around the tangent.
            // Or simpler: axis * cos(angle) + bitangent * sin(angle) (Orbit)
            const offset = axis.clone().multiplyScalar(Math.cos(angle) * radius)
                .add(bitangent.clone().multiplyScalar(Math.sin(angle) * radius))

            const pos = point.clone().add(offset)

            // Rotation: The image should face the "track" (tangent) or be perpendicular?
            // "Floating panels" usually face the camera or the path center.
            // Option A: Face the curve tangent (like a wall along the tunnel).
            // Option B: Billboard to camera (too dynamic).
            // Let's do Option A: The panel's normal points towards the curve center OR runs parallel to tangent.
            // The user said: "rotated to face the curve's tangent". 
            // This usually means the panel's *face* (Z axis usually) points along tangent? No, that makes them invisible (thin edge).
            // It likely means normal is perpendicular to tangent (walls of a tunnel).
            // Let's align the object so its +Z (face) points towards the curve center line?
            // Or just align its Up vector with tangent?

            // Let's make them Look At the point on the curve they belong to.
            // So they form a tunnel looking inward.
            const rot = new Euler()
            const dummyObject = new Object3D()
            dummyObject.position.copy(pos)
            dummyObject.lookAt(point) // Face the spine of the ribbon
            rot.copy(dummyObject.rotation)

            data.push({ position: pos, rotation: rot })
        }
        return data
    }, [curve])

    // Refs for instances to update interactivity
    const itemsRef = useRef<(any)[]>([])

    // 4. Camera Fly-Through Logic
    useFrame((state, delta) => {
        // Check for safe offset
        const rawOffset = scroll.offset
        const offset = (Number.isFinite(rawOffset)) ? rawOffset : 0

        // Map scroll to full curve
        const t = MathUtils.clamp(offset, 0, 0.999) // Stay just under 1 to avoid potential edge case
        const lookAhead = MathUtils.clamp(t + 0.05, 0, 1)

        const camPos = curve.getPointAt(t)
        const lookAtPos = curve.getPointAt(lookAhead)

        // Smoothly move camera
        camera.position.lerp(camPos, 0.1) // 0.1 factor for stiffer tracking (train on tracks)
        camera.lookAt(lookAtPos)
        // Note: lookAt in loop might fight with OrbitControls if enabled, but we are using ScrollControls only.
        // If damping is handled by ScrollControls, 'offset' is already damped.
        // So we can set position directly or lerp very fast.

        // Update Instances (Focus Effect)
        itemsRef.current.forEach((ref, i) => {
            if (!ref) return

            // Hover Logic
            // If we have a hovered ID, others fade.
            const isHovered = hoveredId === i
            const isAnyHovered = hoveredId !== null

            // Base opacity/color
            // InstancedMesh color handling:
            // "White" is default. "Grey" is dim.
            const targetColor = new Color()

            if (isAnyHovered) {
                if (isHovered) {
                    targetColor.set('#ffffff') // Full bright
                } else {
                    targetColor.set('#e0e0e0') // Ghosted
                }
            } else {
                targetColor.set('white')
            }

            ref.color.lerp(targetColor, delta * 5)

            // Scale pulse on hover
            const targetScale = isHovered ? 1.5 : 1
            ref.scale.lerp(new Vector3(targetScale, targetScale, targetScale), delta * 5)
        })
    })

    return (
        <group>
            {Object.entries(groupedData).map(([url, items]) => (
                <Instances key={url} range={items.length} castShadow receiveShadow>
                    <planeGeometry args={[3, 4]} />
                    <meshStandardMaterial side={2} />
                    {/* shadows need meshStandard/Physical, basic doesn't receive shadows */}
                    <TextureHandler url={url} />

                    {items.map((item) => (
                        <ArtInstance
                            key={item.id}
                            {...item}
                            index={item.id}
                            itemRefCallback={(el) => {
                                if (el) {
                                    itemsRef.current[item.id] = el
                                    // Set initial static positions once
                                    // Note: This only runs on mount/remount.
                                    // If we moved them in loop previously, this sets them back.
                                    // Since we don't move them in loop (only camera moves), this is fine!
                                    el.position.copy(positions[item.id].position)
                                    el.rotation.copy(positions[item.id].rotation)
                                }
                            }}
                        />
                    ))}
                </Instances>
            ))}
        </group>
    )
}

function TextureHandler({ url }: { url: string }) {
    const texture = useLoader(TextureLoader, url)
    return <meshStandardMaterial map={texture} toneMapped={false} />
}
