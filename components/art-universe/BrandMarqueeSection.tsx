"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BrandMarqueeSection() {
    return (
        <section className="relative w-full py-24 overflow-hidden bg-[#f4f1ea]">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')] mix-blend-multiply pointer-events-none" />

            {/* Container for the Crossed Bars */}
            <div className="relative w-full h-[400px] flex items-center justify-center">

                {/* STRIP 1: Deep Olive (Rotated -6deg) */}
                <div className="absolute w-[120%] h-16 bg-[#3A4D39] -rotate-6 shadow-xl flex items-center border-y border-white/10 z-10 overflow-hidden transform origin-center">
                    <MarqueeContent text="Handcrafted in Islamabad • 100-Year Archival Materials • Custom Framing Studio •" />
                </div>

                {/* STRIP 2: Rich Walnut (Rotated 6deg) */}
                <div className="absolute w-[120%] h-16 bg-[#5D4037] rotate-6 shadow-2xl flex items-center border-y border-white/10 z-20 overflow-hidden transform origin-center">
                    <MarqueeContent text="Guzel Art Studio • Verified Artisan Workshop • Certified Authentic •" bold />
                </div>

                {/* CENTERPIECE: Wax Seal */}
                <div className="absolute z-30 w-32 h-32 rounded-full bg-[#3A4D39] border-4 border-[#5D4037] shadow-2xl flex items-center justify-center">
                    {/* Inner Ring */}
                    <div className="w-28 h-28 rounded-full border border-white/20 flex items-center justify-center relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                                <path
                                    id="curve"
                                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                    fill="transparent"
                                />
                                <text className="text-[10px] font-bold uppercase tracking-[0.3em] fill-[#FFF9EF]">
                                    <textPath href="#curve">
                                        • Est. 2026 • Islamabad •
                                    </textPath>
                                </text>
                            </svg>
                        </motion.div>
                        <span className="font-serif text-4xl text-[#FFF9EF] font-bold pt-1">G.</span>
                    </div>
                </div>

            </div>
        </section>
    )
}

function MarqueeContent({ text, bold = false }: { text: string, bold?: boolean }) {
    return (
        <div className="flex whitespace-nowrap overflow-hidden w-full">
            <motion.div
                className="flex gap-8"
                animate={{ x: "-50%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30,
                }}
            >
                {/* Render content multiple times to ensure no gaps */}
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex gap-8 items-center shrink-0">
                        <span className={cn(
                            "text-[#FFF9EF]/90 font-serif tracking-[0.25em] uppercase text-sm",
                            bold ? "font-bold" : "font-medium"
                        )}>
                            {text}
                        </span>
                        <Star className="w-3 h-3 text-[#FFF9EF]/30 fill-[#FFF9EF]/30" />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
