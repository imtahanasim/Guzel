"use client"

import { Image, Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Group, Vector3, MathUtils } from "three"
import { useArtInteraction } from "./store"

interface ArtProductProps {
    url: string
    position: [number, number, number]
    rotation?: [number, number, number]
    scale?: [number, number, number] | number
    index: number
    title: string
}

export default function ArtProduct({ url, position, rotation = [0, 0, 0], scale = 1, index, title }: ArtProductProps) {
    const group = useRef<Group>(null)
    const { hoveredId, setHoveredId } = useArtInteraction()

    const isHovered = hoveredId === index
    const isOthersHovered = hoveredId !== null && hoveredId !== index

    // Smooth hover animation
    useFrame((state, delta) => {
        if (group.current) {
            // Target Scale
            const targetScale = isHovered ? 1.4 : 1
            // Target Opacity (via grayscale/color maybe? Image doesn't have opacity easily without custom material)
            // We can scale down others or push them back?
            // Let's just scale others down slightly
            const finalScale = isOthersHovered ? 0.9 : targetScale

            // Smooth vector lerp
            group.current.scale.lerp(new Vector3(finalScale, finalScale, finalScale), delta * 8)

            // LookAt camera if hovered? 
            if (isHovered) {
                group.current.lookAt(state.camera.position)
            }
        }
    })

    return (
        <group
            ref={group}
            position={position}
            rotation={rotation}
            onPointerOver={(e) => { e.stopPropagation(); setHoveredId(index); document.body.style.cursor = 'pointer' }}
            onPointerOut={(e) => { e.stopPropagation(); setHoveredId(null); document.body.style.cursor = 'auto' }}
        >
            <Image
                url={url}
                transparent
                opacity={isOthersHovered ? 0.3 : 1} // Drei Image supports transparent & opacity prop if transparent is true 
                scale={[3, 4, 1]}
                color={isOthersHovered ? "#444" : "white"} // Dim effect
            />

            {isHovered && (
                <Html distanceFactor={10} position={[0, -2.5, 0]}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black/80 text-white px-3 py-2 text-sm rounded-md whitespace-nowrap backdrop-blur-sm pointer-events-none font-serif tracking-widest border border-white/20"
                    >
                        {title}
                    </motion.div>
                </Html>
            )}
        </group>
    )
}

// Need to import motion for the tooltip
import { motion } from "framer-motion"
