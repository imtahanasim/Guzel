"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Play, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ArtisanProcess() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Parallax for the visual side
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    // Visual moves slightly faster/slower than scroll
    const yVisual = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

    // Mouse tracking for Magnetic Play Button
    const visualRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)
    const [isVideoOpen, setIsVideoOpen] = useState(false)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth springs for the button
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 }
    const buttonX = useSpring(mouseX, springConfig)
    const buttonY = useSpring(mouseY, springConfig)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!visualRef.current) return
        const rect = visualRef.current.getBoundingClientRect()

        // Relative coordinates
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        mouseX.set(x)
        mouseY.set(y)
    }

    // Text Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const wordVariants = {
        hidden: { y: "100%" },
        visible: {
            y: "0%",
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        },
    }

    const text = "The Art of Knowing How to Preserve."
    const words = text.split(" ")

    return (
        <section ref={containerRef} className="relative min-h-[150vh] bg-[#fdfcf6] text-[#3e523f]">
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* LEFT COLUMN: Narrative (Sticky) */}
                <div className="w-full lg:w-1/2 relative z-10">
                    <div className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20">
                        <motion.h2
                            className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight overflow-hidden"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.2 }}
                        >
                            {words.map((word, i) => (
                                <span key={i} className="inline-block overflow-hidden mr-[0.25em] -mb-[0.1em] pb-[0.1em]">
                                    <motion.span className="inline-block" variants={wordVariants}>
                                        {word}
                                    </motion.span>
                                </span>
                            ))}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            viewport={{ once: false, amount: 0.2 }}
                            className="mt-8 text-lg md:text-xl max-w-md text-[#3e523f]/80 font-medium"
                        >
                            Every frame is a dialogue between the past and the present, crafted by hands that understand the weight of memory.
                        </motion.p>
                    </div>
                </div>

                {/* RIGHT COLUMN: Visual (Parallax) */}
                <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-[150vh] overflow-hidden bg-[#f0e6d2]">
                    <motion.div
                        style={{ y: yVisual }}
                        className="absolute inset-0 w-full h-[120%] -top-[10%]"
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        >
                            <source src="/second.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-black/10" />
                    </motion.div>

                    {/* Magnetic Play Button Container */}
                    <div
                        ref={visualRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onClick={() => setIsVideoOpen(true)}
                        className="absolute inset-0 z-20 cursor-none flex items-center justify-center"
                    >
                        {/* The Button */}
                        <motion.div
                            style={{
                                x: buttonX,
                                y: buttonY,
                                translateX: "-50%",
                                translateY: "-50%",
                                scale: isHovering ? 1 : 0
                            }}
                            animate={{
                                opacity: isHovering ? 1 : 0,
                                scale: isHovering ? 1 : 0
                            }}
                            className="absolute top-0 left-0 pointer-events-none"
                        >
                            <div className="w-32 h-32 rounded-full backdrop-blur-md bg-[#3e523f]/20 border border-white/50 flex flex-col items-center justify-center text-[#fdfcf6] shadow-2xl transition-transform active:scale-95">
                                <Play className="fill-current w-8 h-8 ml-1 mb-1 opacity-90" />
                                <span className="text-xs font-bold tracking-widest uppercase">Watch</span>
                            </div>
                        </motion.div>

                        {/* Fallback Center Play Button (Visible when not hovering/Mobile) */}
                        <div className="lg:hidden absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-20 h-20 rounded-full backdrop-blur-md bg-[#3e523f]/40 border border-white/50 flex items-center justify-center text-[#fdfcf6]">
                                <Play className="fill-current w-6 h-6 ml-1" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Video Focus Modal */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                        onClick={() => setIsVideoOpen(false)}
                    >
                        <button
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-6xl aspect-video rounded-lg overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                autoPlay
                                controls
                                className="w-full h-full object-cover"
                            >
                                <source src="/second.mp4" type="video/mp4" />
                            </video>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
