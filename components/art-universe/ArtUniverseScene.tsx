"use client"

import { ScrollControls, Scroll, Environment } from "@react-three/drei"

import { motion } from "framer-motion"
import ArtCloud from "./ArtCloud"
import ArtProvenanceScroll from "./ArtProvenanceScroll"


import Footer from "@/components/Footer"
export default function ArtUniverseScene() {
    return (
        <>
            <color attach="background" args={['#ffffff']} />
            <fog attach="fog" args={['#ffffff', 5, 20]} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[-5, 5, 5]} intensity={1} castShadow shadow-bias={-0.0001} />
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} castShadow />
            <Environment preset="city" />



            <ScrollControls pages={12.9} damping={0.2}>


                {/* The 3D Scrollable Content */}
                <ArtCloud />

                {/* The HTML Overlay Content */}
                <Scroll html style={{ width: '100%' }}>

                    {/* Scene 1: Intro */}
                    <div className="w-screen h-screen flex items-center justify-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            viewport={{ once: false, amount: 0.2 }}
                            className="text-4xl md:text-7xl lg:text-9xl font-serif text-[#1a1a1a] text-center tracking-tighter"
                        >
                            The World of Guzel
                        </motion.h1>
                    </div>

                    {/* Scene 2: Journey */}
                    <div className="w-screen h-screen flex items-center justify-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                            viewport={{ once: false, amount: 0.2 }}
                            className="text-4xl md:text-7xl lg:text-9xl font-serif text-[#1a1a1a] text-center tracking-tighter mix-blend-difference"
                        >
                            A Journey Through Time
                        </motion.h1>
                    </div>

                    {/* Scene 3: Curation */}
                    <div className="w-screen h-screen flex items-center justify-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            viewport={{ once: false, amount: 0.2 }}
                            className="text-4xl md:text-7xl lg:text-8xl font-serif text-[#1a1a1a] text-center tracking-tighter"
                        >
                            Curated for You
                        </motion.h1>
                    </div>

                    {/* Scene 4: Discovery */}
                    <div className="w-screen h-screen flex items-center justify-center">
                        <div className="text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                viewport={{ once: false, amount: 0.2 }}
                                className="text-4xl md:text-7xl lg:text-9xl font-serif text-[#1a1a1a] mb-8 tracking-tighter"
                            >
                                Find Your Masterpiece
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                viewport={{ once: false, amount: 0.2 }}
                                className="text-xl text-[#1a1a1a]/60 font-sans tracking-widest uppercase"
                            >
                                Scroll to explore
                            </motion.p>
                        </div>
                    </div>

                </Scroll>

                {/* Provenance Section - Appended to the scroll container */}
                <Scroll html style={{ width: '100%' }}>
                    {/* Compact Spacer to push Provenance just below the 3D intro */}
                    <div style={{ height: '500vh' }} className="pointer-events-none" />

                    <ArtProvenanceScroll />

                    {/* Manual Footer Injection */}
                    <Footer />
                </Scroll>
            </ScrollControls>
        </>
    )
}
