"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"

export default function ComingSoon() {
    const [cursorXY, setCursorXY] = useState({ x: -100, y: -100 })
    const [isTouch, setIsTouch] = useState(false)
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Mouse tracking
    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            setCursorXY({ x: e.clientX, y: e.clientY })
        }
        const handleTouch = () => setIsTouch(true)

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('touchstart', handleTouch)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('touchstart', handleTouch)
        }
    }, [])

    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsLoading(false)
        setIsSubmitted(true)
    }

    return (
        <main className="relative min-h-screen w-full bg-[#FFF9EF] overflow-hidden flex flex-col items-center justify-center p-6 md:p-12">

            {/* 1. TEXTURE & ATMOSPHERE */}

            {/* Base Noise Texture */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none z-0 mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* THE REVEAL LAYER (Hidden Sketches) */}
            {/* This layer is masked by the cursor spotlight */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    // On desktop: use masking. On mobile: masked fully visible or different animation?
                    // Let's implement the desktop spotlight mask first.
                    maskImage: isTouch
                        ? "radial-gradient(circle at 50% 50%, black 60%, transparent 100%)" // Static on touch
                        : `radial-gradient(circle 350px at ${cursorXY.x}px ${cursorXY.y}px, black 0%, transparent 100%)`,
                    WebkitMaskImage: isTouch
                        ? "radial-gradient(circle at 50% 50%, black 60%, transparent 100%)"
                        : `radial-gradient(circle 350px at ${cursorXY.x}px ${cursorXY.y}px, black 0%, transparent 100%)`,
                }}
            >
                {/* Background Image: Sketches / Workshop Feel */}
                {/* Using a placeholder that looks like sketches/lines */}
                <div
                    className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1549887552-93f954d1d960?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-150 brightness-110"
                />
            </div>

            {/* 2. CONTENT STAGE */}
            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center space-y-12 md:space-y-16">



                {/* Animated Headline */}
                <div className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#3A4D39] leading-[1.1] tracking-tight overflow-hidden">
                    <MaskedText text="Masterpieces" delay={0.2} />
                    <br className="hidden md:block" />
                    <MaskedText text="Take Time" delay={0.4} />
                </div>

                {/* Subtext */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="max-w-md mx-auto"
                >
                    <p className="font-sans text-[#3A4D39]/70 text-sm md:text-base leading-relaxed tracking-wide">
                        Our artisan studio in Islamabad is currently curating a new digital experience. We are crafting something timeless for your walls.
                    </p>
                </motion.div>

                {/* 3. WAITLIST TICKET */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="w-full max-w-sm mx-auto"
                >
                    {isSubmitted ? (
                        <div className="relative flex flex-col items-center justify-center p-8">
                            {/* Wax Seal Animation */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                                className="w-24 h-24 rounded-full bg-[#8B1C1C] border-4 border-[#5E1212] flex items-center justify-center shadow-xl relative"
                            >
                                <div className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center">
                                    <span className="font-serif text-white font-bold text-3xl">G.</span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#6e1616] rounded-full blur-[2px]" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-6 text-[#3A4D39] font-serif font-medium"
                            >
                                You are on the list.
                            </motion.div>
                        </div>
                    ) : (
                        <form onSubmit={handleJoin} className="relative group">
                            {/* Ticket Shape */}
                            <div className="relative overflow-hidden">
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#3A4D39] py-4 text-[#3A4D39] placeholder-[#3A4D39]/40 font-serif text-lg focus:outline-none focus:border-b-2 transition-all rounded-none pr-12"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="absolute right-0 top-0 bottom-0 flex items-center text-[#3A4D39] hover:text-[#2A3829] transition-colors"
                                >
                                    {isLoading ? (
                                        <span className="text-xs uppercase tracking-widest animate-pulse">Wait...</span>
                                    ) : (
                                        <ArrowRight className="w-6 h-6" />
                                    )}
                                </button>
                            </div>

                            {/* Decorative 'Ticket' Stubs */}
                            <div className="flex justify-between mt-2">
                                <div className="text-[10px] uppercase tracking-[0.2em] text-[#3A4D39]/30">No. 00214</div>
                                <div className="text-[10px] uppercase tracking-[0.2em] text-[#3A4D39]/30">ADMITS ONE</div>
                            </div>
                        </form>
                    )}
                </motion.div>

            </div>

            {/* Footer Stamp */}
            <div className="absolute bottom-8 text-center w-full z-10 opacity-30">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#3A4D39]">Est. 2026 • Islamabad</p>
            </div>

        </main>
    )
}

// Animation helper for text
function MaskedText({ text, delay }: { text: string, delay: number }) {
    const words = text.split(" ")
    return (
        <span className="inline-block overflow-hidden">
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-2 md:mr-4 align-bottom">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{
                            duration: 1.2,
                            delay: delay + (i * 0.1),
                            ease: [0.22, 1, 0.36, 1]
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    )
}
