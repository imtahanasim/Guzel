"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

export default function GuzelScroll() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    // Smooth out scroll progress
    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.5 })

    // --- HOOKS ---

    // Background Transition
    const backgroundColor = useTransform(smoothScroll, [0, 0.8], ["#FFF9EF", "#3e523f"])

    // Parallax Values
    const yLayer1 = useTransform(smoothScroll, [0, 1], ["0%", "-50%"]) // Background Text

    // Opacity for Background Text (Fade out to avoid overlap)
    const bgTextOpacity = useTransform(smoothScroll, [0.6, 0.8], [0.4, 0])

    // Abstract Spheres Parallax
    const ySphere1 = useTransform(smoothScroll, [0, 1], ["150%", "-150%"])
    const ySphere2 = useTransform(smoothScroll, [0, 1], ["50%", "-250%"])

    // Frame Animation
    const rotate = useTransform(smoothScroll, [0.2, 0.8], [-5, 5])
    const scale = useTransform(smoothScroll, [0.2, 0.8], [0.8, 1.0])
    const frameOpacity = useTransform(smoothScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    // Shadow Animation
    const shadowY = useTransform(smoothScroll, [0.2, 0.8], [20, 60])
    const shadowBlur = useTransform(smoothScroll, [0.2, 0.8], [10, 40])
    const shadowBlurString = useTransform(shadowBlur, (v) => `blur(${v}px)`)
    const shadowOpacity = useTransform(smoothScroll, [0.2, 0.8], [0.5, 0.2])

    // Sheen Animation
    const sheenX = useTransform(smoothScroll, [0.2, 0.8], ["-100%", "200%"])

    // Text Reveal & Cinematic Lens
    const textOpacity = useTransform(smoothScroll, [0.75, 0.9], [0, 1])
    const textY = useTransform(smoothScroll, [0.75, 0.9], [50, 0])

    // Cinematic Lens: Blur the "Stage" (Frame + Charms) as text appears
    const stageBlurValue = useTransform(smoothScroll, [0.75, 0.9], [0, 8])
    const stageBlurFilter = useTransform(stageBlurValue, (v) => `blur(${v}px)`)

    // Warmth Halo Opacity
    const haloOpacity = useTransform(smoothScroll, [0.75, 0.9], [0, 1])

    // Content Color
    const contentColor = useTransform(smoothScroll, [0.3, 0.5], ["#3e523f", "#fdfcf6"])

    return (
        <div ref={containerRef} className="relative h-[300vh] w-full">
            <motion.div
                className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
                style={{ backgroundColor }}
            >
                {/* Artisan Noise Texture Overlay */}
                <div
                    className="pointer-events-none absolute inset-0 z-50 opacity-[0.05]"
                    style={{
                        mixBlendMode: "overlay",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                />

                {/* Global Warmth Halo (Radial Gradient) */}
                <motion.div
                    className="absolute inset-0 pointer-events-none z-40"
                    style={{
                        opacity: haloOpacity,
                        background: "radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, transparent 70%)"
                    }}
                />

                {/* Layer 1: Background Narrative Text */}
                <motion.div
                    style={{ x: yLayer1, color: contentColor, opacity: bgTextOpacity, mixBlendMode: "overlay" }}
                    className="absolute whitespace-nowrap text-[20vw] font-serif font-bold leading-none select-none z-10"
                >
                    CAPTURE BEAUTY — PRESERVE MEMORIES
                </motion.div>

                {/* THE STAGE: Elements that will blur */}
                <motion.div
                    className="relative w-full h-full flex items-center justify-center z-20 scale-[0.55] md:scale-100"
                    style={{ filter: stageBlurFilter }}
                >
                    {/* Central Anchor: Timeless Piece */}
                    <div className="relative">
                        {/* Dynamic Shadow */}
                        <motion.div
                            style={{
                                y: shadowY,
                                filter: shadowBlurString,
                                opacity: shadowOpacity,
                                width: "40vh",
                                height: "10vh"
                            }}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-4 w-full bg-black/50 rounded-[50%]"
                        />

                        <motion.div
                            style={{
                                rotate: rotate,
                                scale: scale,
                                opacity: frameOpacity
                            }}
                            className="relative h-[60vh] w-[45vh]"
                        >
                            <div className="relative w-full h-full border-[12px] border-[#a67c52] bg-[#f0e6d2] overflow-hidden shadow-sm">
                                <Image
                                    src="/product-pictures/photo-1725711028446-055093f4c658.avif"
                                    alt="Vintage Walnut Frame"
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                {/* Golden Sheen */}
                                <motion.div
                                    style={{ x: sheenX }}
                                    className="absolute inset-0 z-10 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full"
                                />
                            </div>
                        </motion.div>
                    </div>



                    {/* Charm C: Warmth (Abstract Blurred Spheres) */}
                    <motion.div
                        style={{ y: ySphere1, opacity: 0.6 }}
                        className="absolute left-[25%] bottom-[10%] z-10 h-32 w-32 rounded-full bg-[#d4af37] blur-[60px]"
                    />
                    <motion.div
                        style={{ y: ySphere2, opacity: 0.4 }}
                        className="absolute right-[20%] top-[10%] z-10 h-40 w-40 rounded-full bg-[#a67c52] blur-[80px]"
                    />
                </motion.div>

                {/* Layer 4: Emotional Text Reveal (In front of blur) */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY, color: "#fdfcf6" }}
                    className="absolute z-50 text-center px-6 md:px-20 max-w-5xl"
                >
                    <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl italic leading-tight">
                        <span className="block">Turning emotions</span>
                        <span className="block">into elegance.</span>
                    </h2>
                </motion.div>

            </motion.div>
        </div>
    )
}
