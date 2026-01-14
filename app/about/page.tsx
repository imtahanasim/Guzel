"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Magnetic from "@/components/ui/Magnetic"

// --- 1. Data Structure Update (The 4 Eras) ---
const TIMELINE_ERAS = [
    {
        year: "1990",
        title: "The Woodworker's Oath",
        description: "It began in silence. A small workshop in Islamabad where the only sound was the chisel against walnut. He didn't just build frames; he engineered sanctuaries. Every mitre was a promise of longevity, every joint a lesson in structural integrity.",
        image: "/product-pictures/photo-1568945721269-c998c4cbb043.avif", // Father's Era
        align: "left",
        theme: "engineering"
    },
    {
        year: "2010",
        title: "Silent Perfection",
        description: "Reputation grew not by marketing, but by the weight of the work. We became the secret keeper for collectors who valued the archival standard above all else. The tools aged, but the precision never drifted.",
        image: "/product-pictures/custom-trays-main.jpg", // Tools/Workshop
        align: "right",
        theme: "engineering"
    },
    {
        year: "2023",
        title: "A New Eye",
        description: "I returned to the studio with a different perspective. Where he saw structure, I saw story. I brought design sensibility to his structural mastery, reimagining the frame not just as a border, but as an extension of the art itself.",
        image: "/product-pictures/andrew-atroshenko-main.jpg", // Daughter's Era / Studio
        align: "left",
        theme: "art"
    },
    {
        year: "NOW",
        title: "The Promise",
        description: "Two generations, one seal. Today, we fuse his engineering with my vision. It is no longer just a workshop; it is a design studio where history is re-framed for the modern aesthetic.",
        image: "/product-pictures/abstract-women-main.jpg", // The Union / Modern
        align: "right",
        theme: "art"
    }
]

export default function MethodologyPage() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Track active era for Sidebar
    const [activeEraIndex, setActiveEraIndex] = useState(0)

    // --- Hero Animations ---
    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.8])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
    const heroBlur = useTransform(scrollYProgress, [0, 0.15], ["0px", "10px"])

    return (
        <div ref={containerRef} className="relative bg-[#fdfcf6] text-[#1a1a1a] min-h-screen overflow-hidden selection:bg-[#3D5C3D] selection:text-white">



            {/* --- 1. ATMOSPHERIC FILM GRAIN --- */}
            <FilmGrain />

            {/* --- 3. FLOATING DUST (Workshop Atmosphere) --- */}
            <div className="hidden md:block">
                <FloatingDust />
            </div>

            {/* --- 2. CHRONOMETER SIDEBAR --- */}
            <div className="hidden md:block">
                <ChronometerSidebar activeIndex={activeEraIndex} eras={TIMELINE_ERAS} />
            </div>

            {/* --- THE LIVING SPINE (Progress Bar) --- */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-[1px] h-full bg-[#3D5C3D]/10 z-0">
                <motion.div
                    style={{ scaleY: useTransform(scrollYProgress, [0, 1], [0, 1]) }}
                    className="w-full h-full bg-[#3D5C3D] origin-top"
                />
            </div>

            {/* --- HERO SECTION --- */}
            <div className="h-screen flex flex-col items-center justify-center sticky top-0 z-10 pointer-events-none">
                <motion.h1
                    style={{ scale: heroScale, opacity: heroOpacity, filter: heroBlur }}
                    className="text-4xl md:text-[10vw] leading-none font-bold uppercase tracking-tighter text-[#3D5C3D] text-center whitespace-nowrap mb-6 pointer-events-auto"
                >
                    A Legacy <br /> Re-Framed
                </motion.h1>
                <motion.p
                    style={{ opacity: heroOpacity }}
                    className="font-serif text-lg md:text-xl text-[#3D5C3D] max-w-lg text-center leading-relaxed"
                >
                    From a father&#39;s workshop to a modern studio.
                </motion.p>
                <ScrollDownIndicator />
            </div>

            {/* --- CONTENT LAYER (The Timeline) --- */}
            <div className="relative z-20 bg-[#fdfcf6]">
                <div className="container mx-auto px-6 max-w-[1600px] relative pb-32">

                    {TIMELINE_ERAS.map((era, index) => (
                        <TimelineSection
                            key={index}
                            era={era}
                            index={index}
                            onInView={() => setActiveEraIndex(index)}
                        />
                    ))}

                    {/* SECTION 3: HERITAGE TOOLS (Horizontal Strip) */}
                    <div className="py-24 flex justify-center relative">
                        <div className="bg-[#fdfcf6] p-12 z-10 text-center border-y border-[#3D5C3D]/10">
                            <h2 className="text-4xl md:text-6xl font-bold text-[#3D5C3D] uppercase tracking-tighter">
                                30+ Years of Heritage
                            </h2>
                        </div>
                    </div>

                    {/* Tools Strip with Center Pop Layout */}
                    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 h-auto md:h-80 relative z-10 mb-24 md:mb-48 overflow-hidden px-6">
                        {/* Image 1 */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 0.7, x: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full md:w-1/3 h-64 bg-[#3D5C3D]/10 overflow-hidden group rounded-lg md:rounded-none"
                        >
                            <Image src="/product-pictures/andrew-atroshenko-painting.webp" alt="Vintage Tool 1" fill className="object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
                        </motion.div>

                        {/* Image 2 (Center - Popped) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1.1 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full md:w-1/3 h-80 bg-[#3D5C3D]/10 overflow-hidden shadow-2xl z-10 border-4 border-[#fdfcf6] group rounded-lg md:rounded-none"
                        >
                            <Image src="/product-pictures/abstract-women-main.jpg" alt="Vintage Tool 2" fill className="object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
                        </motion.div>

                        {/* Image 3 */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 0.7, x: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full md:w-1/3 h-64 bg-[#3D5C3D]/10 overflow-hidden group rounded-lg md:rounded-none"
                        >
                            <Image src="/product-pictures/abstract-women-hover.jpg" alt="Vintage Tool 3" fill className="object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
                        </motion.div>
                    </div>

                    {/* GRAND FINALE WITH STAMP */}
                    <ExperienceLoop />

                </div>
            </div>
        </div>
    )
}

function TimelineSection({ era, index, onInView }: { era: any, index: number, onInView: () => void }) {
    const isEven = index % 2 === 0
    // Use container ref for internal parallax
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

    // 3. Internal Parallax (Window Effect)
    const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

    const isInView = useInView(ref, { amount: 0.5 })

    useEffect(() => {
        if (isInView) onInView()
    }, [isInView, onInView])

    return (
        <div ref={ref} className="min-h-screen flex items-center justify-center relative py-32">

            {/* Sticky Year */}
            <div className="absolute top-1/2 left-6 md:left-1/2 -translate-y-1/2 md:-translate-x-1/2 z-20 mix-blend-difference text-[#fdfcf6] pointer-events-none">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] opacity-60 text-center mb-2 hidden md:block">
                    {era.theme === 'engineering' ? 'Engineering Phase' : 'Design Phase'}
                </h2>
                <div className="text-5xl md:text-9xl font-bold tracking-tighter opacity-20 select-none transform -translate-x-1/2 md:translate-x-0">
                    {era.year}
                </div>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 w-full">

                {/* LEFT SIDE CONTENT - Spacing Update: pl-8 md:pl-12 (Was pl-12 md:pl-24) */}
                <div className={`flex flex-col ${isEven ? 'items-start md:items-end pl-12 md:pr-24 text-left md:text-right' : 'items-start pl-12 md:pl-12 text-left md:order-2'}`}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-md relative z-30"
                    >
                        <h3 className="font-serif text-4xl md:text-6xl text-[#3D5C3D] mb-6 leading-tight">
                            {era.title}
                        </h3>
                        <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed text-balance">
                            {era.description}
                        </p>
                    </motion.div>
                </div>

                {/* RIGHT SIDE IMAGE */}
                <div className={`flex flex-col mt-4 md:mt-0 ${isEven ? 'items-start pl-12 md:pl-24' : 'items-start pl-12 md:pr-24 md:order-1'}`}>
                    {/* Internal Parallax Wrapper - overflow-hidden mandatory */}
                    <div
                        className="relative w-full aspect-video md:aspect-[4/5] h-48 md:h-[60vh] bg-[#3D5C3D]/10 group overflow-hidden rounded-lg md:rounded-none"
                    >

                        {/* Curtain Animation */}
                        <motion.div
                            initial={{ height: "100%" }}
                            whileInView={{ height: "0%" }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute bottom-0 left-0 w-full bg-[#3D5C3D] z-20"
                        />

                        {/* Image with Hover Reveal Caption */}
                        <motion.div
                            style={{ y: yParallax, scale: 1.2 }}
                            className="relative w-full h-full md:grayscale md:group-hover:grayscale-0 transition-all duration-700 ease-in-out" // Added Grayscale logic
                        >
                            <Image
                                src={era.image}
                                alt={era.title}
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Hover Reveal Caption */}
                        <div className="absolute bottom-4 left-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-[#fdfcf6]">
                                {era.theme === 'engineering' ? 'Original Workshop' : 'Design Studio'}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

function ChronometerSidebar({ activeIndex, eras }: { activeIndex: number, eras: any[] }) {
    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1 pointer-events-none">
            {/* Connecting Line - very thin olive/10 */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#3D5C3D]/10 -z-10" />

            {eras.map((era, index) => {
                const isActive = index === activeIndex
                return (
                    <div key={index} className="flex items-center gap-4 py-2 relative group pointer-events-auto">
                        {/* Text Label on Hover */}
                        <div className={`absolute right-8 whitespace-nowrap text-xs font-mono uppercase tracking-widest text-[#3D5C3D] transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                            {era.year}
                        </div>

                        {/* Dot - Scale 150 (1.5) when active */}
                        <motion.div
                            animate={{
                                scale: isActive ? 1.5 : 1,
                                backgroundColor: isActive ? "#3D5C3D" : "rgba(61, 92, 61, 0.3)"
                            }}
                            className="w-1.5 h-1.5 rounded-full"
                        />
                    </div>
                )
            })}
        </div>
    )
}

function FilmGrain() {
    return (
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay">
            {/* Simple CSS Noise via SVG Data URI */}
            <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJnoiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNnKSIgb3BhY2l0eT0iMC41IiAvPjwvc3ZnPg==')] opacity-100"></div>
        </div>
    )
}

function FloatingDust() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        x: Math.random() * 100, // This needs to be responsive, but simplified for server-render safety: CSS units would be better or just let it float
                        y: Math.random() * 100
                    }}
                    animate={{
                        y: [0, -50, 0],
                        x: [0, 20, 0],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                    }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    className="absolute w-1 h-1 bg-[#3D5C3D] rounded-full opacity-20"
                />
            ))}
        </div>
    )
}

function ScrollDownIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ opacity: { delay: 1, duration: 1 }, y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase font-mono text-[#3D5C3D]/60 pointer-events-none z-20"
        >
            Scroll Down
        </motion.div>
    )
}

function ExperienceLoop() {
    return (
        <div className="relative w-full py-48 bg-[#fdfcf6] overflow-hidden mt-32">
            <motion.div
                className="absolute inset-0 bg-[#3e523f] z-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "0px 0px -50% 0px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <div className="relative z-10 flex flex-col items-center justify-center text-center">

                {/* 4. Stamp Animation - Slam Effect */}
                <div className="mb-12 relative">
                    <motion.div
                        initial={{ scale: 3, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                        className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#fdfcf6] flex items-center justify-center shadow-xl relative"
                    >
                        <Image
                            src="/logo.png"
                            alt="Guzel Seal"
                            width={120}
                            height={120}
                            className="object-contain w-2/3 h-2/3"
                        />
                    </motion.div>
                </div>

                {/* Headline with Color Transition */}
                <motion.h2
                    initial={{ color: "#3e523f" }}
                    whileInView={{ color: "#fdfcf6" }}
                    viewport={{ margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-[10vw] font-bold uppercase tracking-tighter leading-none mb-12"
                >
                    The Experience <br /> Begins
                </motion.h2>

                <Magnetic>
                    <Link href="/shop" className="group flex items-center gap-4 inline-block">
                        <div className="relative overflow-hidden border border-[#fdfcf6]/20 px-8 py-4 bg-[#fdfcf6]/5 hover:bg-[#fdfcf6] transition-all duration-300">
                            <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] font-medium text-[#fdfcf6] group-hover:text-[#3D5C3D] transition-colors duration-300">
                                Visit The Family Studio
                            </span>
                        </div>
                    </Link>
                </Magnetic>
            </div>
        </div>
    )
}
