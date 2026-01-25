"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const VIDEOS = [
    "/2.mp4",
    "/3.mp4",
    "/first.mp4",
    "/1.mp4"
]

export default function ShopVideoInterlude() {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

    return (
        <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black flex items-center justify-center text-center my-16">
            {/* Sequential Video Background */}
            <div className="absolute inset-0 w-full h-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentVideoIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <video
                            src={VIDEOS[currentVideoIndex]}
                            autoPlay
                            muted
                            playsInline
                            // When video ends, go to next index
                            onEnded={() => {
                                setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length)
                            }}
                            className="w-full h-full object-cover opacity-80"
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 px-4 max-w-2xl">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/80 mb-6 block">
                    Our Philosophy
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight drop-shadow-lg">
                    Made in Islamabad.
                </h2>
                <p className="text-lg md:text-xl text-white/90 font-serif italic drop-shadow-md">
                    "Every joint, every glass cut, handled by master craftsmen."
                </p>
            </div>
        </section>
    )
}
