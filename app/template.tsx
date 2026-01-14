"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Image from "next/image"

// The "Expensive" Curve
const transitionCurve = { duration: 1.2, ease: [0.76, 0, 0.24, 1] }

// Number of columns for the shutter effect
const columns = 5



export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    // Reset scroll on page change (behind the curtain)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <AnimatePresence mode="wait">
            <motion.div key={pathname} className="min-h-screen">

                {/* 
                   LAYER 1: The Shutters (Z-50)
                   Background animation layers
                */}

                {/* Entrance Shutters: Slide UP from Center (0%) to Top (-100%) */}
                <div className="fixed inset-0 z-[100] pointer-events-none flex">
                    {[...Array(columns)].map((_, i) => (
                        <motion.div
                            key={`enter-${i}`}
                            className="h-full bg-[#3e523f] w-1/5 relative border-r border-[#fdfcf6]/10 last:border-0"
                            initial={{ y: "0%" }}
                            animate={{ y: "-100%" }}
                            exit={{ y: "-100%" }} // Stays up (cleared)
                            transition={{
                                ...transitionCurve,
                                delay: i * 0.05,
                            }}
                        />
                    ))}
                </div>

                {/* Exit Shutters: Slide UP from Bottom (100%) to Center (0%) */}
                <div className="fixed inset-0 z-[100] pointer-events-none flex">
                    {[...Array(columns)].map((_, i) => (
                        <motion.div
                            key={`exit-${i}`}
                            className="h-full bg-[#3e523f] w-1/5 relative border-r border-[#fdfcf6]/10 last:border-0"
                            initial={{ y: "100%" }}
                            animate={{ y: "100%" }}
                            exit={{ y: "0%" }} // Covers screen
                            transition={{
                                ...transitionCurve,
                                delay: i * 0.05,
                            }}
                        />
                    ))}
                </div>

                {/* 
                   LAYER 2: The Logo (Z-[101])
                   "Heartbeat" Animation Sequence
                */}

                {/* Logo for Entrance Phase (Revealing) */}
                <motion.div
                    className="fixed inset-0 z-[101] pointer-events-none flex items-center justify-center"
                    initial={{ opacity: 1, scale: 1.1 }} // Match the end state of Exit
                    animate={{ opacity: 0, scale: 0.9 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.2, // "Stay pinned for 0.2s longer" (syncs with shutter clearing)
                        ease: "easeIn"
                    }}
                >
                    <div className="relative w-80 h-80 flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="Guzel Logo"
                            fill
                            className="object-contain"
                            priority
                            sizes="320px"
                        />
                    </div>
                </motion.div>

                {/* Logo for Exit Phase (Covering) */}
                <motion.div
                    className="fixed inset-0 z-[101] pointer-events-none flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 0.8 }}
                    exit={{ opacity: 1, scale: 1.1 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.2, // Wait for shutters to start covering
                        ease: [0.22, 1, 0.36, 1] // Gentle pulse
                    }}
                >
                    <div className="relative w-80 h-80 flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="Guzel Logo"
                            fill
                            className="object-contain"
                            priority
                            sizes="320px"
                        />
                    </div>
                </motion.div>


                {/* Page Content */}
                {children}

            </motion.div>
        </AnimatePresence>
    )
}
