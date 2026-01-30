"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import ArtUniverseScene from "@/components/art-universe/ArtUniverseScene"
import ArtistDoodleLayer from "@/components/art-universe/ArtistDoodleLayer"

import Header from "@/components/Header"

export default function ArtUniversePage() {
    return (
        <div className="h-screen w-full bg-[#1e1e1e] relative overflow-hidden">
            {/* Manual Header Injection */}
            <Header />
            {/* Hand-Drawn Doodle Overlay */}
            <ArtistDoodleLayer />

            <Canvas
                gl={{ antialias: true, alpha: false }}
                camera={{ position: [0, 0, 15], fov: 50 }}
                dpr={[1, 1.5]} // Performance: Cap pixel ratio at 1.5
            >
                <color attach="background" args={['#1e1e1e']} />
                <Suspense fallback={null}>
                    <ArtUniverseScene />
                </Suspense>
            </Canvas>
        </div>
    )
}
