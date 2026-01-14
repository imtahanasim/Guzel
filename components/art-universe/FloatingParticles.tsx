"use client"

import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { Points, BufferGeometry, Float32BufferAttribute, PointsMaterial, MathUtils } from "three"

export default function FloatingParticles({ count = 1000 }) {
    const points = useRef<Points>(null)

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50
        }
        return positions
    }, [count])

    useFrame((state, delta) => {
        if (points.current) {
            points.current.rotation.y += delta * 0.05
            points.current.rotation.x += delta * 0.02
        }
    })

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                    args={[particlesPosition, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                color="#fdfcf6"
                transparent
                opacity={0.6}
                sizeAttenuation={true}
            />
        </points>
    )
}
