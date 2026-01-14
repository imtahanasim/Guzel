"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ImageWithFallback from "@/components/ui/image-with-fallback"
import { cn } from "@/lib/utils"

interface ZoomableImageProps {
    src: string
    alt: string
}

export default function ZoomableImage({ src, alt }: ZoomableImageProps) {
    const [isHovering, setIsHovering] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return
        const { left, top, width, height } = containerRef.current.getBoundingClientRect()

        // Calculate percentage position (0 to 1)
        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setMousePosition({ x, y })
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[4/5] bg-[#f0f0f0] overflow-hidden rounded-sm cursor-zoom-in group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
        >
            {/* Base Image */}
            <div className={cn("absolute inset-0 transition-opacity duration-300", isHovering ? "opacity-0" : "opacity-100")}>
                <ImageWithFallback
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Zoomed Lens (Only visible on hover) */}
            <AnimatePresence>
                {isHovering && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 w-full h-full pointer-events-none"
                    >
                        <ImageWithFallback
                            src={src}
                            alt={alt}
                            fill
                            className="object-cover absolute"
                            style={{
                                transformOrigin: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,
                                transform: "scale(2.5)", // 2.5x zoom
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hint Overlay (Mobile/Initial) */}
            <div className="absolute bottom-4 right-4 bg-black/5 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/50"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
            </div>
        </div>
    )
}
