"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

interface TypewriterProps {
    isTyping: boolean
    isSuccess: boolean
    textLength: number
}

export default function VintageTypewriter({ isTyping, isSuccess, textLength }: TypewriterProps) {
    const controls = useAnimation()

    // Rattle Effect on container when typing
    // We can just rely on isTyping prop changes if they are frequent,
    // but better to just shake a bit while isTyping is true in a loop?
    // Actually, standard CSS animation or simple variant loop works.

    // Calculate paper rise based on text length (capped at some limit)
    // Max rise ~100px. Assume message ~500 chars.
    const paperRise = Math.min(textLength * 0.2, 120) * -1

    // Animation triggers
    useEffect(() => {
        if (isTyping) {
            controls.start("typing")
        } else {
            controls.start("idle")
        }
    }, [isTyping, controls])

    return (
        <motion.div
            className="relative w-full aspect-square flex items-center justify-center"
            animate={isTyping ? { x: [-1, 1, -1, 1, 0] } : { x: 0 }}
            transition={{ duration: 0.1, repeat: isTyping ? Infinity : 0, repeatDelay: 0.05 }}
        >
            {/* Container for the illustration */}
            <motion.svg
                viewBox="0 0 400 400"
                className="w-full max-w-md h-auto drop-shadow-2xl"
                initial="idle"
                animate={controls}
            >
                {/* --- THE PAPER --- */}
                {/* Rises when typing, Flies out on success */}
                <motion.g
                    animate={isSuccess ? "success" : { y: paperRise }} // Dynamic Y based on text length
                    variants={{
                        success: { y: -600, x: 20, rotate: 5, opacity: 0, transition: { duration: 0.6, ease: "backIn" } }
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }} // Smooth paper rise
                >
                    <rect x="100" y="50" width="200" height="250" fill="#fdfcf6" stroke="#1a1a1a" strokeWidth="2" />
                    {/* Text Lines on Paper */}
                    <motion.path
                        d="M 120 80 H 280 M 120 100 H 280 M 120 120 H 260"
                        stroke="#1a1a1a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0.3 }}
                        animate={isTyping ? { pathLength: [0.3, 0.4, 0.35] } : { pathLength: Math.min(0.3 + (textLength * 0.002), 0.9) }}
                        transition={{ repeat: isTyping ? Infinity : 0, duration: 0.2 }} // Shake lines when typing
                    />
                </motion.g>

                {/* --- THE TYPEWRITER BODY --- */}
                {/* Main Chassis */}
                <path d="M 50 250 L 350 250 L 320 350 L 80 350 Z" fill="#3D5C3D" stroke="#1a1a1a" strokeWidth="3" />
                <rect x="80" y="200" width="240" height="60" rx="4" fill="#2a402a" stroke="#1a1a1a" strokeWidth="3" />

                {/* Carriage / Roller */}
                <rect x="60" y="220" width="280" height="30" rx="2" fill="#1a1a1a" />

                {/* Keys Area */}
                <g transform="translate(90, 260)">
                    {/* Rows of keys */}
                    {[0, 1, 2].map((row) => (
                        <g key={row} transform={`translate(${row * 10}, ${row * 25})`}>
                            {[0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
                                <motion.circle
                                    key={`${row}-${col}`}
                                    cx={col * 25 + 10}
                                    cy="15"
                                    r="8"
                                    fill="#fdfcf6"
                                    stroke="#1a1a1a"
                                    strokeWidth="1"
                                    variants={{
                                        idle: { y: 0 },
                                        typing: { y: [0, 2, 0] },
                                    }}
                                    // Randomize typing effect for keys
                                    animate={isTyping ? "typing" : "idle"}
                                    transition={{
                                        repeat: isTyping ? Infinity : 0,
                                        duration: 0.2,
                                        delay: Math.random() * 0.5,
                                        repeatDelay: Math.random() * 0.2
                                    }}
                                />
                            ))}
                        </g>
                    ))}
                </g>

                {/* Brand Label on Typewriter */}
                <text x="200" y="340" textAnchor="middle" fill="#fdfcf6" fontFamily="serif" fontSize="14" letterSpacing="2" opacity="0.6">GUZEL STUDIO</text>

            </motion.svg>

            {/* --- SUCCESS ENVELOPE --- */}
            {/* Slides in from bottom when success */}
            <motion.div
                className="absolute bottom-10"
                initial={{ y: 200, opacity: 0 }}
                animate={isSuccess ? { y: 0, opacity: 1 } : { y: 200, opacity: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
            >
                <div className="w-64 h-40 bg-[#fdfcf6] border-2 border-[#3D5C3D] shadow-xl relative flex items-center justify-center">
                    {/* Envelope Flap Pattern */}
                    <svg className="absolute top-0 w-full h-full pointer-events-none" viewBox="0 0 100 60" preserveAspectRatio="none">
                        <path d="M 0 0 L 50 30 L 100 0" fill="#3D5C3D" fillOpacity="0.1" stroke="#3D5C3D" strokeWidth="0.5" />
                    </svg>
                    <div className="text-center">
                        <p className="font-serif text-2xl text-[#3D5C3D]">Thank You</p>
                        <p className="font-sans text-xs uppercase tracking-widest text-[#3D5C3D]/60 mt-2">We'll be in touch</p>
                    </div>
                    {/* Wax Seal */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-6 w-12 h-12 bg-[#8b0000] rounded-full border-4 border-[#600000] shadow-md flex items-center justify-center">
                        <span className="text-white font-serif font-bold text-lg">G</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
