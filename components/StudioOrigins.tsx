"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function StudioOrigins() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Specs Data
    const specs = [
        { title: "Museum Grade Glass", desc: "Anti-reflective & UV protective." },
        { title: "Italian Sourced Wood", desc: "Sustainably harvested olive & walnut." },
        { title: "100-Year Archival", desc: "Acid-free mounts that last generations." },
    ]

    // Map Data (Coordinates for 400x500 viewBox)
    const cities = [
        { name: "ISLAMABAD", x: 260, y: 120, isHub: true }, // The Studio
        { name: "KARACHI", x: 120, y: 420 },
        { name: "LAHORE", x: 300, y: 190 },
        { name: "PESHAWAR", x: 190, y: 90 },
        { name: "QUETTA", x: 60, y: 300 },
    ]

    const hub = cities.find(c => c.isHub)!

    return (
        <section ref={containerRef} className="relative min-h-screen bg-[#fdfcf6] text-[#3e523f] py-24 px-6 overflow-hidden">
            {/* Artisan Noise Texture Overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
                style={{
                    mixBlendMode: "overlay",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Subtle Blueprint Grid Background */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#3e523f 1px, transparent 1px), linear-gradient(90deg, #3e523f 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* LEFT COLUMN: Abstract Map (Swapped) */}
                <div className="relative w-full aspect-[4/5] flex items-center justify-center lg:justify-start order-2 lg:order-1">
                    <motion.svg
                        viewBox="0 0 400 500"
                        className="w-full h-full max-w-md drop-shadow-2xl"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        {/* Abstract Pakistan Outline (Placeholder Shape) */}
                        <motion.path
                            d="M 120 450 L 60 380 L 40 300 L 80 200 L 150 100 L 220 50 L 320 80 L 350 150 L 320 250 L 250 400 Z"
                            fill="none"
                            stroke="#3e523f"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeOpacity="0.3"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                            viewport={{ once: false, amount: 0.2 }}
                        />

                        {/* Connection Lines from Hub (Islamabad) */}
                        {cities.map((city, i) => {
                            if (city.isHub) return null;
                            return (
                                <motion.path
                                    key={`line-${i}`}
                                    d={`M ${hub.x} ${hub.y} Q ${(hub.x + city.x) / 2 + 20} ${(hub.y + city.y) / 2} ${city.x} ${city.y}`}
                                    fill="none"
                                    stroke="#3e523f"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 6"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                                    transition={{ delay: 1.5 + i * 0.2, duration: 1.5, ease: "easeOut" }}
                                    viewport={{ once: false, amount: 0.2 }}
                                />
                            )
                        })}

                        {/* Cities */}
                        {cities.map((city, i) => (
                            <motion.g
                                key={`city-${i}`}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 2.5 + i * 0.1 }}
                                viewport={{ once: false, amount: 0.2 }}
                            >
                                {/* City Marker */}
                                <circle cx={city.x} cy={city.y} r={4} fill="#3e523f" />

                                {/* Hub Pulse (Enhanced Ripple) */}
                                {city.isHub && (
                                    <>
                                        <motion.circle
                                            cx={city.x}
                                            cy={city.y}
                                            r={8}
                                            fill="none"
                                            stroke="#a67c52"
                                            strokeWidth="2"
                                            initial={{ scale: 1, opacity: 1 }}
                                            animate={{ scale: 3, opacity: 0 }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                                        />
                                        <motion.circle
                                            cx={city.x}
                                            cy={city.y}
                                            r={8}
                                            fill="none"
                                            stroke="#a67c52"
                                            strokeWidth="1.5"
                                            initial={{ scale: 1, opacity: 1 }}
                                            animate={{ scale: 4, opacity: 0 }}
                                            transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: "easeOut" }}
                                        />
                                    </>
                                )}

                                {/* City Name */}
                                <motion.text
                                    x={city.x + 12}
                                    y={city.y + 4}
                                    className="font-sans text-[10px] sm:text-xs tracking-[0.2em] font-bold uppercase fill-[#3e523f]"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: city.isHub ? 2.5 : 3 + i * 0.2 }}
                                    viewport={{ once: false, amount: 0.2 }}
                                >
                                    {city.name}
                                </motion.text>
                            </motion.g>
                        ))}
                    </motion.svg>
                </div>

                {/* RIGHT COLUMN: Narrative & Specs (Swapped) */}
                <div className="space-y-16 order-1 lg:order-2">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <div className="flex items-center gap-4 mb-4 opacity-60">
                            <span className="h-[1px] w-12 bg-[#3e523f]"></span>
                            <span className="text-xs font-sans tracking-[0.2em] uppercase">The Standard</span>
                        </div>
                        <h2 className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8 text-[#3e523f]">
                            From Our Studio <br /> to Your Wall.
                        </h2>
                        <p className="text-xl leading-relaxed text-[#3e523f]/80 max-w-lg">
                            Every piece begins its journey in our Islamabad studio, blending modern precision engineering with the soul of traditional craftsmanship.
                        </p>
                    </motion.div>

                    <ul className="space-y-10">
                        {specs.map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                                viewport={{ once: false, amount: 0.2 }}
                                whileHover={{ x: 10 }}
                                className="group flex items-start gap-6 cursor-default transition-all duration-300"
                            >
                                <div className="mt-1 text-[#a67c52] p-2 rounded-full bg-[#3e523f]/5 group-hover:bg-[#a67c52]/10 transition-colors">
                                    <Sparkles size={24} className="group-hover:animate-spin-slow transition-transform" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-3xl text-[#3e523f] group-hover:text-[#a67c52] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm font-sans tracking-widest uppercase text-[#3e523f]/50 mt-2 border-t border-[#3e523f]/10 pt-2 inline-block">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    )
}
