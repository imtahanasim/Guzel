"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface LivingCanvasProps {
    isTyping: boolean
}

export default function LivingCanvas({ isTyping }: LivingCanvasProps) {
    const videos = ["/1.mp4", "/2.mp4", "/3.mp4"]
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

    const handleVideoEnd = () => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[3/4] max-w-md mx-auto"
        >
            {/* walnut frame */}
            <div className="absolute inset-0 border-[12px] border-[#5C4033] shadow-2xl rounded-sm z-20 pointer-events-none">
                {/* Inner Bezel for realism */}
                <div className="absolute inset-0 border-4 border-[#3a2820] opacity-50"></div>
            </div>

            {/* The Canvas Content */}
            <div className="relative w-full h-full overflow-hidden bg-[#e8e4dc]">
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-20 z-10 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/watercolor.png')]"></div>

                {/* Video Loop */}
                <motion.div
                    key={currentVideoIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 1 }}
                    className="w-full h-full"
                >
                    <video
                        autoPlay
                        muted
                        playsInline
                        // No loop here, we handle it manually to switch src
                        onEnded={handleVideoEnd}
                        className="w-full h-full object-cover"
                        src={videos[currentVideoIndex]}
                    />
                </motion.div>

                {/* Live Interaction Overlay */}
                <motion.div
                    className="absolute inset-0 bg-[#3D5C3D]/10 z-10 flex items-end justify-center pb-8"
                    animate={{ opacity: isTyping ? 1 : 0 }}
                >
                    <span className="bg-cream/90 backdrop-blur-sm px-4 py-1 text-xs font-serif tracking-widest text-[#3D5C3D] shadow-sm rounded-full">
                        ARTIST IS LISTENING...
                    </span>
                </motion.div>
            </div>

            {/* Easel Legs (Visual Decor) */}
            <div className="absolute -bottom-16 left-10 w-4 h-24 bg-[#5C4033] -z-10 rotate-12"></div>
            <div className="absolute -bottom-16 right-10 w-4 h-24 bg-[#5C4033] -z-10 -rotate-12"></div>
        </motion.div>
    )
}
