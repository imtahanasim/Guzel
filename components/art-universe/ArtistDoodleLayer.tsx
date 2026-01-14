"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// --- SVG Shapes / Doodles ---

const Scribble = ({ color = "white" }) => (
    <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="6" className="w-full h-full opacity-90">
        <motion.path
            d="M 20,50 Q 30,20 40,50 T 60,50 T 80,50"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        />
    </svg>
)

const Star = ({ color = "white" }) => (
    <svg viewBox="0 0 100 100" fill={color} className="w-full h-full opacity-90">
        <motion.path
            d="M50 0L61 35H98L68 57L79 91L50 70L21 91L32 57L2 35H39L50 0Z"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
        />
    </svg>
)

const Splatter = ({ color = "white" }) => (
    <svg viewBox="0 0 100 100" fill={color} className="w-full h-full opacity-80">
        <motion.path
            d="M55.5 12.5C59.5 12.5 61.5 8.5 64.5 10.5C69.6 13.9 66.5 24.5 73.5 26.5C79.4 28.1 89.5 22.5 91.5 28.5C93.4 34.2 82.5 39.5 82.5 45.5C82.5 49.6 89.5 53.5 85.5 58.5C81.9 63 72.5 58.5 67.5 62.5C62.9 66.1 63.5 76.5 57.5 77.5C51.2 78.5 47.5 69.5 41.5 68.5C35.8 67.5 26.5 73.5 22.5 68.5C18.1 63 26.5 55.5 24.5 49.5C22.6 43.8 11.5 41.5 13.5 35.5C15.6 29.2 25.5 31.5 29.5 26.5C33.1 21.9 29.5 12.5 35.5 10.5C41.2 8.6 44.5 17.5 50.5 17.5C51.5 17.5 53.9 12.5 55.5 12.5Z"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
        />
    </svg>
)

const BrushStroke = ({ color = "white" }) => (
    <svg viewBox="0 0 200 50" fill="none" stroke={color} strokeWidth="15" strokeLinecap="round" className="w-full h-full opacity-90">
        <motion.path
            d="M 10,25 Q 50,5 90,25 T 190,25"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
        />
    </svg>
)

const DOODLE_TYPES = [Scribble, Star, Splatter, BrushStroke, Star]
const COLORS = ["#3D5C3D", "#3e523f", "#4a6b4a"] // Theme Greens

// --- Main Component ---

export default function ArtistDoodleLayer() {
    return (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden mix-blend-overlay">
            <RandomDoodles />
            <MouseTrail />
        </div>
    )
}

// --- Sub-Components ---

function RandomDoodles() {
    // We want a list of doodles that are currently on screen.
    // Each has an ID, position, type, color, key.
    const [doodles, setDoodles] = useState<any[]>([])

    useEffect(() => {
        // Spawn interval
        const spawnInterval = setInterval(() => {
            // Chance to spawn
            if (Math.random() > 0.3 && doodles.length < 15) {
                const id = Date.now() + Math.random()
                const typeIdx = Math.floor(Math.random() * DOODLE_TYPES.length)
                const Component = DOODLE_TYPES[typeIdx]
                const x = Math.random() * 90 + 5 // 5% to 95%
                const y = Math.random() * 90 + 5
                const size = Math.random() * 60 + 40 // 40px to 100px
                const rotation = Math.random() * 360
                const color = COLORS[Math.floor(Math.random() * COLORS.length)]
                const duration = Math.random() * 5 + 5 // 5-10s lifetime

                const newDoodle = { id, Component, x, y, size, rotation, color, duration }

                setDoodles(prev => [...prev, newDoodle])

                // Despawn timeout
                setTimeout(() => {
                    setDoodles(prev => prev.filter(d => d.id !== id))
                }, duration * 1000)
            }
        }, 800) // Check every 800ms

        return () => clearInterval(spawnInterval)
    }, [doodles.length]) // Dep on length so we don't overspawn if checks are fast, but here interval is slow enough?
    // Actually standard React implementation: access doodles via functional update, so deps [] is often okay if logic is self contained,
    // but here we check length.

    return (
        <AnimatePresence>
            {doodles.map((doodle) => (
                <motion.div
                    key={doodle.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, -20, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{
                        opacity: { duration: 0.5 },
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    style={{
                        position: "absolute",
                        top: `${doodle.y}%`,
                        left: `${doodle.x}%`,
                        width: doodle.size,
                        height: doodle.size,
                        rotate: doodle.rotation
                    }}
                >
                    <doodle.Component color={doodle.color} />
                </motion.div>
            ))}
        </AnimatePresence>
    )
}

function MouseTrail() {
    const [points, setPoints] = useState<{ id: number, x: number, y: number }[]>([])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Throttle: only add point if distance is enough? Or just raw.
            // Let's do a simple stochastic add or time-based.
            if (Math.random() > 0.3) {
                const id = Date.now() + Math.random()
                setPoints(prev => [...prev, { id, x: e.clientX, y: e.clientY }])

                // Remove after 1s
                setTimeout(() => {
                    setPoints(prev => prev.filter(p => p.id !== id))
                }, 1000)
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <AnimatePresence>
            {points.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ opacity: 0.6, scale: 0.5 }}
                    animate={{ opacity: 0, scale: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="fixed rounded-full pointer-events-none bg-[#3D5C3D]"
                    style={{
                        left: p.x,
                        top: p.y,
                        width: 8,
                        height: 8,
                        marginLeft: -4, // Center
                        marginTop: -4
                    }}
                />
            ))}
        </AnimatePresence>
    )
}
