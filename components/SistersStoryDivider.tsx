"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Ruler, Pencil, Hammer, Frame, Sparkles, Spline } from "lucide-react"

export default function SistersStoryDivider() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Parallax: slide entire scene from right to left as user scrolls down
    const x = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])

    // Tool animations: gentle working motion
    const workTransition = {
        repeat: Infinity,
        repeatType: "mirror" as const, // Fix: Cast string to proper type or let inference handle it, but "mirror" is valid for Framer Motion
        duration: 1.5,
        ease: "easeInOut"
    }

    return (
        <section ref={containerRef} className="w-full h-[320px] bg-[#fdfcf6] overflow-hidden flex items-center justify-center relative border-y border-[#3e523f]/5">

            {/* Background decorative faint grid/noise for consistency */}
            <div className="absolute inset-0 opacity-[0.02]"
                style={{ backgroundImage: "radial-gradient(#3e523f 1px, transparent 1px)", backgroundSize: "20px 20px" }}
            />

            <motion.div
                style={{ x }}
                className="relative w-[1200px] h-full flex items-center justify-center"
            >
                {/* Main Illustration "Line Art" composed of SVG paths and Icons */}

                {/* Connecting Vines/Flow Lines (SVG Layer) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none text-[#3e523f]/30" viewBox="0 0 1200 320" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">

                    {/* Table Top Line */}
                    <path d="M 300 220 L 900 220" />
                    {/* Table Legs */}
                    <path d="M 350 220 L 350 280" />
                    <path d="M 850 220 L 850 280" />

                    {/* Flowing connector line (Vine) linking Left Sister to Right Sister */}
                    <path d="M 200 180 Q 400 100, 600 180 T 1000 180" strokeDasharray="4 4" opacity="0.5" />

                    {/* Sister 1 (Left) - Abstract Figure Forms */}
                    <path d="M 250 220 C 250 150, 200 150, 220 180" /> {/* Arm/Body hint */}

                    {/* Sister 2 (Right) - Abstract Figure Forms */}
                    <path d="M 950 220 C 950 150, 1000 150, 980 180" /> {/* Arm/Body hint */}

                </svg>

                {/* SCENE LEFT: Measuring (Sister 1) */}
                <div className="absolute left-[200px] top-[140px] flex flex-col items-center">
                    {/* Head hint */}
                    <div className="w-8 h-8 rounded-full border border-[#3e523f]/40 mb-2" />
                    <div className="relative">
                        {/* Ruler */}
                        <motion.div
                            animate={{ rotate: [-5, 5] }}
                            transition={workTransition}
                            className="absolute -left-8 top-0 text-[#3e523f]/60"
                        >
                            <Ruler size={40} />
                        </motion.div>
                        {/* Pencil */}
                        <motion.div
                            animate={{ y: [0, -5, 0], x: [0, 2, 0] }}
                            transition={{ ...workTransition, duration: 2 }}
                            className="absolute left-4 top-4 text-[#3e523f]"
                        >
                            <Pencil size={32} />
                        </motion.div>
                    </div>
                </div>

                {/* SCENE CENTER: Workbench Items */}
                <div className="absolute left-[500px] top-[190px] flex gap-8 opacity-40">
                    <Sparkles size={24} className="text-[#3e523f] animate-pulse" />
                    <div className="w-16 h-1 border border-[#3e523f]" /> {/* Material */}
                </div>

                {/* SCENE RIGHT: Assembling (Sister 2) */}
                <div className="absolute right-[200px] top-[140px] flex flex-col items-center">
                    {/* Head hint */}
                    <div className="w-8 h-8 rounded-full border border-[#3e523f]/40 mb-2" />
                    <div className="relative">
                        {/* Frame being worked on */}
                        <div className="absolute -left-6 top-8 text-[#3e523f]/50">
                            <Frame size={48} />
                        </div>
                        {/* Hammer */}
                        <motion.div
                            animate={{ rotate: [0, -20, 0] }}
                            transition={{ ...workTransition, duration: 1 }}
                            className="absolute left-6 -top-2 text-[#3e523f]"
                        >
                            <Hammer size={36} />
                        </motion.div>
                        {/* Flying Sawdust/Sparkles */}
                        <motion.div
                            animate={{ opacity: [0, 1, 0], y: [0, -20], x: [0, 10] }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                            className="absolute left-10 top-10 text-[#a67c52]"
                        >
                            <div className="w-1 h-1 rounded-full bg-current" />
                        </motion.div>
                    </div>
                </div>

            </motion.div>
        </section>
    )
}
