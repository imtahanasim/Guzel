"use client"

import { motion } from "framer-motion"

interface TypewriterIllustrationProps {
    isTyping: boolean
    isSuccess: boolean
    textLength: number
}

export default function TypewriterIllustration({ isTyping, isSuccess, textLength }: TypewriterIllustrationProps) {
    // Calculate paper climb based on text length (clamp to max climb)
    // Moves up 1px for every 2 chars, max 100px
    const paperY = Math.max(-100, -(textLength * 0.5));

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center">
            <motion.div
                className="relative"
                animate={isTyping ? { x: [-1, 1, -1, 1, 0] } : { x: 0 }} // Rattle effect on entire container
                transition={{ duration: 0.1, repeat: isTyping ? Infinity : 0, repeatDelay: 0.1 }}
            >
                <motion.svg
                    width="400"
                    height="400"
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#3D5C3D]"
                >
                    {/* Paper Sheet - Animated */}
                    <motion.g
                        initial={{ y: 50 }}
                        animate={
                            isSuccess
                                ? { y: -600, opacity: 0, rotate: 5, transition: { duration: 0.8, ease: "backIn" } } // Success: Fly out
                                : {
                                    y: 50 + paperY, // Dynamic climb based on typing
                                    rotate: isTyping ? 0 : [-1, 1, -1],
                                    transition: {
                                        y: { type: "spring", stiffness: 100, damping: 20 },
                                        rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                                    }
                                }
                        }
                    >
                        <rect
                            x="100"
                            y="50"
                            width="200"
                            height="250"
                            fill="#FFF9EF"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        {/* Paper Text Lines (appear when typing or just static representation) */}
                        <path d="M120 80H280" stroke="#3D5C3D" strokeWidth="2" opacity="0.2" />
                        <path d="M120 100H260" stroke="#3D5C3D" strokeWidth="2" opacity="0.2" />
                        <path d="M120 120H270" stroke="#3D5C3D" strokeWidth="2" opacity="0.2" />

                        {/* Dynamic lines appearing as you type more */}
                        {textLength > 50 && <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M120 140H250" stroke="#3D5C3D" strokeWidth="2" opacity="0.2" />}
                        {textLength > 100 && <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M120 160H280" stroke="#3D5C3D" strokeWidth="2" opacity="0.2" />}
                        {textLength > 150 && <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M120 180H230" stroke="#3D5C3D" strokeWidth="2" opacity="0.2" />}
                    </motion.g>


                    {/* Typewriter Body - Static but stylized */}
                    <path
                        d="M50 300L80 200H320L350 300H50Z"
                        fill="#3D5C3D"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <rect x="80" y="180" width="240" height="40" fill="#2c3a2d" stroke="currentColor" strokeWidth="2" />

                    {/* Keys - Animate on typing */}
                    <motion.g
                        animate={isTyping ? { y: [0, 2, 0] } : { y: 0 }}
                        transition={{ repeat: Infinity, duration: 0.1 }}
                    >
                        <circle cx="100" cy="320" r="15" fill="#fdfcf6" stroke="currentColor" strokeWidth="2" />
                        <circle cx="140" cy="320" r="15" fill="#fdfcf6" stroke="currentColor" strokeWidth="2" />
                        <circle cx="180" cy="320" r="15" fill="#fdfcf6" stroke="currentColor" strokeWidth="2" />
                        <circle cx="220" cy="320" r="15" fill="#fdfcf6" stroke="currentColor" strokeWidth="2" />
                        <circle cx="260" cy="320" r="15" fill="#fdfcf6" stroke="currentColor" strokeWidth="2" />
                        <circle cx="300" cy="320" r="15" fill="#fdfcf6" stroke="currentColor" strokeWidth="2" />

                        {/* Second Row */}
                        <circle cx="120" cy="350" r="15" fill="#fdfcf6" stroke="currentColor" strokeWidth="2" />
                        <circle cx="160" cy="350" r="15" fill="#fdfcf6" stroke="currentColor" strokeWidth="2" />
                        <circle cx="200" cy="350" r="15" fill="#fdfcf6" stroke="currentColor" strokeWidth="2" />
                        <circle cx="240" cy="350" r="15" fill="#fdfcf6" stroke="currentColor" strokeWidth="2" />
                        <circle cx="280" cy="350" r="15" fill="#fdfcf6" stroke="currentColor" strokeWidth="2" />
                    </motion.g>

                    {/* Carriage Return Lever */}
                    <path d="M320 200L380 180" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />

                </motion.svg>
            </motion.div>

            {/* Success Envelope (Slides in) */}
            <motion.div
                className="absolute"
                initial={{ y: 100, opacity: 0, scale: 0.8 }}
                animate={isSuccess ? { y: 0, opacity: 1, scale: 1 } : { y: 100, opacity: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
            >
                <div className="w-64 h-40 bg-[#fdfcf6] border-2 border-[#3D5C3D] flex items-center justify-center relative shadow-xl">
                    <div className="absolute top-0 left-0 w-full h-full border-b-2 border-r-2 border-[#3D5C3D] origin-top-left transform -skew-y-6 opacity-10"></div>
                    <p className="font-serif text-[#3D5C3D] text-xl font-bold">Thank You!</p>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent border-t-[80px] border-t-[#3D5C3D]/10"></div>
                </div>
            </motion.div>
        </div>
    )
}
