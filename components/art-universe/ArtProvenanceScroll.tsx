"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { artProducts } from "@/data/art-products"
import BrandMarqueeSection from "./BrandMarqueeSection"

// --- Data Structure ---

const CHAPTERS = [
    {
        id: 0,
        image: artProducts[0]?.url || "https://images.unsplash.com/photo-1578301978018-3005759f48f7",
        title: "The Genesis",
        meta: "1864 | ISLAMABAD STUDIO",
        paragraphs: [
            "In the quiet corners of the 19th-century studio, the first strokes were laid. The air was thick with the scent of turpentine and ambition.",
            "A rebellion against the rigid realism of the era, this piece sought to capture the fleeting soul of the object. It was rejected by the Salon three times."
        ]
    },
    {
        id: 1,
        image: artProducts[2]?.url || "https://images.unsplash.com/photo-1577083639236-0f555f0b5a93",
        title: "The Merchant's Gaze",
        meta: "1790 | PRIVATE COLLECTION",
        paragraphs: [
            "Commissioned by a wealthy spice trader, this portrait was intended to signal power and influence across the trade routes.",
            "Yet, the artist hid a subtle melancholy in the eyes—a secret burden known only to them, perhaps the cost of their fortune."
        ]
    },
    {
        id: 2,
        image: artProducts[4]?.url || "https://images.unsplash.com/photo-1578301978162-7a0199da78ce",
        title: "Midnight Garden",
        meta: "1905 | ROYAL COLLECTION",
        paragraphs: [
            "Painted under the light of a full moon, the colors are impossible, dreamlike, defying the laws of nature.",
            "Critics called it madness; history calls it genius. It marked a pivotal moment in the birth of surrealism."
        ]
    }
]

const INTERLUDES = [
    {
        title: "From the chaos of the studio, a singular vision emerges.",
        subtitle: "Every stroke is a deliberate act of rebellion against the silence of the canvas."
    },
    {
        title: "Preserved in silence, verified by the weight of the past.",
        subtitle: "History is not just written; it is painted, framed, and passed down through generations."
    }
]

// --- Main Component ---

export default function ArtProvenanceScroll() {
    return (
        <section className="relative w-full bg-[#fdfdfd] text-[#1a1a1a] font-serif pointer-events-auto overflow-clip z-10 pb-0">
            {/* Chapter 0 */}
            <ProvenanceChapter index={0} data={CHAPTERS[0]} />

            {/* Interlude 1 */}
            <ProvenanceInterlude data={INTERLUDES[0]} />

            {/* Chapter 1 */}
            <ProvenanceChapter index={1} data={CHAPTERS[1]} />

            {/* Interlude 2 */}
            <ProvenanceInterlude data={INTERLUDES[1]} />

            {/* Chapter 2 */}
            <ProvenanceChapter index={2} data={CHAPTERS[2]} />

            {/* The Brand Marquee (The Finale) */}
            <div className="relative h-screen w-full bg-[#fdfcf6]">
                <BrandMarqueeSection />
            </div>
        </section>
    )
}

// --- Sub-Components ---

function ProvenanceChapter({ index, data }: { index: number, data: typeof CHAPTERS[0] }) {
    const isEven = index % 2 === 0
    const ref = useRef(null)
    const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", amount: 0.3 })

    // Curtain Wipe Logic
    // We want the curtain to slide UP revealing the painting when the chapter starts
    // We can just use whileInView or just stick to simple motion

    return (
        <div ref={ref} className={`relative flex w-full min-h-screen md:min-h-[140vh] ${isEven ? 'flex-col-reverse md:flex-row' : 'flex-col-reverse md:flex-row-reverse'}`}>

            {/* STICKY IMAGE (The Anchor) */}
            <div className="relative h-[50vh] md:sticky md:top-0 md:h-screen w-full md:w-1/2 flex items-center justify-center overflow-hidden bg-[#fafafa] border-t md:border-t-0 md:border-r border-[#1a1a1a]/5">
                <div className="relative w-full h-full md:w-[80%] md:h-[70%] shadow-none md:shadow-2xl overflow-hidden group">
                    <img
                        src={data.image}
                        alt={data.title}
                        className="w-full h-full object-cover"
                    />
                    {/* Authentic Paper Texture Overlay */}
                    <div
                        className="absolute inset-0 mix-blend-multiply opacity-20 pointer-events-none"
                        style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/aged-paper.png")` }}
                    />

                    <motion.div
                        className="absolute inset-0 z-20 pointer-events-none"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.7 }}
                        viewport={{ amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ willChange: "opacity" }} // Performance: hint to browser to promote layer
                    >
                        {/* Use a paper texture background image with mix-blend-multiply */}
                        <div className="w-full h-full bg-[#f4f1ea] mix-blend-multiply opacity-50"
                            style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/aged-paper.png")` }}
                        />

                        {/* The Red Stamp/Box */}
                        <div className="absolute top-10 right-10 border-4 border-red-800/60 p-4 rotate-[-12deg] mask-image-grunge">
                            <p className="font-mono text-red-900 text-xs font-bold tracking-widest uppercase text-center leading-relaxed">
                                VERIFIED<br />ISLAMABAD<br />ARCHIVE
                            </p>
                        </div>
                    </motion.div>

                    {/* The Curtain Wipe (Visual Upgrade) */}
                    <motion.div
                        className="absolute inset-0 bg-[#3e523f] z-30"
                        initial={{ height: "100%" }}
                        whileInView={{ height: "0%" }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} // Heavy Curtain Ease
                    />
                </div>
            </div>

            {/* SCROLLING TEXT (The Content) */}
            <div className="relative w-full md:w-1/2 flex items-center justify-center min-h-[60vh] md:min-h-[140vh]">
                {/* The Vertically Locked Container */}
                <div className="flex flex-col justify-center w-full px-6 py-12 md:px-24 md:py-0 space-y-16 md:space-y-12">
                    <div>
                        <span className="block font-mono text-xs text-[#556b2f] mb-6 md:mb-4 tracking-[0.2em] font-bold uppercase border-b border-[#556b2f]/20 pb-4 md:pb-2 w-full text-center md:w-fit md:text-left">
                            {data.meta}
                        </span>
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif text-[#1a1a1a] mb-6 md:mb-8 leading-[1.1] md:leading-[0.9] text-balance">
                            {data.title}
                        </h2>
                        <TypewriterText text={data.paragraphs[0]} className="text-xl md:text-3xl leading-relaxed font-serif text-justify md:text-left hyphens-auto break-words" />
                    </div>

                    <div>
                        <TypewriterText text={data.paragraphs[1]} className="text-xl md:text-3xl leading-relaxed font-serif text-justify md:text-left hyphens-auto break-words" />
                    </div>
                </div>
            </div>

        </div>
    )
}

function TypewriterText({ text, className = "text-2xl md:text-3xl leading-relaxed font-serif" }: { text: string, className?: string }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false, amount: 0.2 })

    const characters = text.split("")

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.015, delayChildren: 0.1 }, // Fast staggered type
        },
    }

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.1 }
        },
        hidden: {
            opacity: 0,
            y: 10,
        },
    }

    return (
        <motion.p
            ref={ref}
            className={`${className} text-[#1a1a1a]`}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {characters.map((char, index) => (
                <motion.span variants={child} key={index} className="inline-block relative">
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.p>
    )
}

// Memoize static text components to prevent re-renders when 3D scene updates
const ProvenanceInterlude = React.memo(function ProvenanceInterlude({ data }: { data: typeof INTERLUDES[0] }) {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center text-center px-6 md:px-20 max-w-7xl mx-auto bg-[#fdfdfd] relative overflow-hidden">

            {/* Rotating Monogram Background - Reduced complexity? It's just an SVG */}
            <motion.div
                className="absolute opacity-[0.03] pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{ willChange: "transform" }} // Optimize rotation
            >
                <svg width="800" height="800" viewBox="0 0 100 100" className="w-[60vw] h-[60vw]">
                    <path d="M 50,50 m -40,0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0" fill="none" stroke="black" strokeWidth="1" />
                    <path d="M 50,10 L 50,90 M 10,50 L 90,50" stroke="black" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="black" strokeWidth="0.5" />
                </svg>
            </motion.div>

            <div className="z-10 relative">
                <TypewriterText
                    text={data.title}
                    className="text-3xl md:text-5xl lg:text-7xl font-serif text-[#3e523f] mb-8 leading-tight"
                />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="text-base md:text-xl text-black/60 font-sans mt-8 max-w-3xl mx-auto px-4 leading-relaxed"
                >
                    {data.subtitle}
                </motion.p>
            </div>
        </div>
    )
})
