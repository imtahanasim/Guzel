"use client"

import { useFrame } from "@react-three/fiber"
import { QuadraticBezierLine } from "@react-three/drei"
import { useRef, useMemo, useState, useEffect } from "react"
import { Vector3, Group } from "three"
import { useArtInteraction } from "./store"
import { artProducts } from "@/data/art-products"

interface NeuralConnectionsProps {
    itemsRef: React.MutableRefObject<(Group | null)[]>
}

export default function NeuralConnections({ itemsRef }: NeuralConnectionsProps) {
    const { hoveredId } = useArtInteraction()
    const [relatedIds, setRelatedIds] = useState<number[]>([])

    // Pick 3 related items when hoveredId changes
    useEffect(() => {
        if (hoveredId === null) {
            setRelatedIds([])
            return
        }

        // Simple random logic for demo. Real app would use tags.
        const pool = artProducts.filter(p => p.id !== hoveredId)
        const picked = []
        for (let i = 0; i < 3; i++) {
            if (pool.length === 0) break
            const idx = Math.floor(Math.random() * pool.length)
            picked.push(pool[idx].id)
            pool.splice(idx, 1)
        }
        setRelatedIds(picked)
    }, [hoveredId])

    // We need to track positions of source + targets.
    // They move every frame.
    // So we need a component that listens to frame and updates the lines?
    // Drei's QuadraticBezierLine accepts [start] [end] props.
    // If we pass Vector3 objects, it updates when they mutate?
    // Actually, it handles updates if props change.

    // Better: use a ref for the line and update geometry? 
    // Drei lines are abstractions.
    // Let's rely on React state updates or simplified approach.
    // Updating react state 60fps is bad.

    // Strategy: Child component "ActiveConnection" that uses useFrame to pull positions from refs.

    if (hoveredId === null || relatedIds.length === 0) return null

    return (
        <group>
            {relatedIds.map((targetId, i) => (
                <ActiveConnection
                    key={`${hoveredId}-${targetId}`}
                    sourceRef={itemsRef.current[hoveredId]}
                    targetRef={itemsRef.current[targetId]}
                />
            ))}
        </group>
    )
}

function ActiveConnection({ sourceRef, targetRef }: { sourceRef: Group | null, targetRef: Group | null }) {
    const lineRef = useRef<any>(null)
    const [start] = useState(() => new Vector3())
    const [end] = useState(() => new Vector3())
    const [mid] = useState(() => new Vector3())

    useFrame(() => {
        if (!sourceRef || !targetRef || !lineRef.current) return

        // Update positions 
        sourceRef.getWorldPosition(start)
        targetRef.getWorldPosition(end)

        // Midpoint with some arc
        mid.copy(start).add(end).multiplyScalar(0.5)
        mid.y += 2 // Arch it up

        lineRef.current.setPoints(start, end, mid)
    })

    if (!sourceRef || !targetRef) return null

    return (
        <QuadraticBezierLine
            ref={lineRef}
            start={[0, 0, 0]}
            end={[0, 0, 0]}
            mid={[0, 1, 0]}
            color="#C5A059"
            lineWidth={1}
            transparent
            opacity={0.6}
        />
    )
}
