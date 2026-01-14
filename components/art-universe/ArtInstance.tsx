"use client"

import { Instance, Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { useArtInteraction } from "./store"
import { motion } from "framer-motion"

interface ArtInstanceProps {
    id: number
    index: number
    title: string
    // Initials passed from parent's interpolation logic
    // Actually, we drive position via ref in parent?
    // Instance gives us a ref to the underlying object in the InstancedMesh
}

export default function ArtInstance({ id, index, title, itemRefCallback }: ArtInstanceProps & { itemRefCallback: (el: any) => void }) {
    const { hoveredId, setHoveredId } = useArtInteraction()
    const isHovered = hoveredId === id
    const isOthersHovered = hoveredId !== null && hoveredId !== id

    // We can't easily animate "scale" of an instance via state in loop w/o ref access
    // But parent ArtCloud handles the big movement.
    // We handle hover scale here?
    // Actually, if parent overwrites matrix every frame, local changes might be lost.
    // Better: Parent handles ALL movement/scale. 
    // We just handle events and maybe the tooltip.

    return (
        <group>
            <Instance
                ref={itemRefCallback}
                onPointerOver={(e) => { e.stopPropagation(); setHoveredId(id); document.body.style.cursor = 'pointer' }}
                onPointerOut={(e) => { e.stopPropagation(); setHoveredId(null); document.body.style.cursor = 'auto' }}
            />

            {isHovered && (
                <Html distanceFactor={10} position={[0, -2.5, 0]}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black/90 text-white px-3 py-2 text-sm rounded-md whitespace-nowrap backdrop-blur-md pointer-events-none font-serif tracking-widest border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    >
                        {title}
                    </motion.div>
                </Html>
            )}
        </group>
    )
}
