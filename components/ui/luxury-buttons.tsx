"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"

// --- Magnetic Wrapper ---

export const MagneticWrapper = ({
    children,
    className,
    strength = 0.5,
}: {
    children: React.ReactNode
    className?: string
    strength?: number
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const position = { x: useMotionValue(0), y: useMotionValue(0) }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e
        const { left, top, width, height } = ref.current!.getBoundingClientRect()

        const middleX = left + width / 2
        const middleY = top + height / 2

        const offsetX = (clientX - middleX) * strength
        const offsetY = (clientY - middleY) * strength

        position.x.set(offsetX)
        position.y.set(offsetY)
    }

    const handleMouseLeave = () => {
        position.x.set(0)
        position.y.set(0)
    }

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
    const x = useSpring(position.x, springConfig)
    const y = useSpring(position.y, springConfig)

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            className={cn("relative", className)}
        >
            {children}
        </motion.div>
    )
}

// --- Luxury Button (Liquid Fill) ---

interface LuxuryButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode
    className?: string
    variant?: "primary" | "outline"
}

export const LuxuryButton = ({
    children,
    className,
    variant = "primary",
    onClick,
    ...props
}: LuxuryButtonProps) => {
    // Colors - using the project's Deep Olive and Cream
    const olive = "#3D5C3D"
    const cream = "#FFF9EF"

    return (
        <motion.button
            className={cn(
                "relative overflow-hidden border border-[#3D5C3D] px-8 py-4 font-sans text-lg font-medium outline-none",
                className
            )}
            style={{
                color: olive,
                backgroundColor: cream,
            }}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
                visible: {
                    y: 0,
                    opacity: 1,
                    transition: { delay: 0.2, duration: 0.5 }
                },
                initial: { y: 20, opacity: 0 }
            }}
            onClick={onClick}
            {...props}
        >
            {/* Tap Scale */}
            <motion.div
                className="w-full h-full flex items-center justify-center"
                variants={{
                    tap: { scale: 0.95 },
                }}
            >
                {/* Base Text */}
                <span className="relative z-10 block">{children}</span>

                {/* Liquid Fill Overlay */}
                <motion.div
                    className="absolute inset-0 z-0 bg-[#3D5C3D] flex items-center justify-center"
                    variants={{
                        initial: { y: "100%" },
                        hover: { y: "0%" },
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                    }}
                >
                    {/* Overlay Text (for color swap) */}
                    {/* We need the text to be stable, not moving with the fill. 
                 Since the parent container clips, we can put the text here but counter-translate? 
                 Actually, the 'clip-path' approach is cleaner for text stability, 
                 but sliding a div behind text is requested.
                 
                 Requested: "Text color must switch from Olive to Cream instantly as the fill passes behind it"
                 
                 Approach: Two layers of content. Base layer and Top layer.
                 Top layer is clipped by the fill progress.
             */}
                </motion.div>

                {/* 
            Re-implementing the structure to support the text color swap cleanly using Clip Path.
            The user explicitly asked for "masked div... slides up... text color must switch".
            Clip path is the best way to achieve the "instantly as the fill passes" look.
        */}
            </motion.div>

            {/* Correct Implementation using Clip Path for absolute precision */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center bg-[#3D5C3D] text-[#FFF9EF] z-20"
                variants={{
                    initial: { clipPath: "inset(100% 0 0 0)" },
                    hover: { clipPath: "inset(0% 0 0 0)" },
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                }}
                style={{ pointerEvents: "none" }} // Allow clicks to pass through if needed, but button handles it
            >
                <span className="font-medium">{children}</span>
            </motion.div>
        </motion.button>
    )
}


// --- Text Button (Editorial Link) ---

interface TextButtonProps extends HTMLMotionProps<"a"> {
    href: string
    children: React.ReactNode
}

export const TextButton = ({ href, children, className, ...props }: TextButtonProps) => {
    return (
        <Link href={href} legacyBehavior passHref>
            <motion.a
                className={cn(
                    "group relative inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-[#3D5C3D]",
                    className
                )}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.2 }}
                {...props}
            >
                <motion.span
                    className="relative"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {children}
                </motion.span>

                {/* Underline Flow */}
                <span className="absolute -bottom-1 left-0 h-[1px] w-full origin-left scale-x-0 bg-[#3D5C3D] transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-left group-focus:scale-x-100 group-[.hover-exit]:origin-right group-[.hover-exit]:scale-x-0" />

                {/* 
            React-based enter/exit animation for the line direction:
            We can use framer motion for the line to control the origin.
        */}
                <Underline />
            </motion.a>
        </Link>
    )
}

const Underline = () => {
    return (
        <motion.span
            className="absolute -bottom-1 left-0 h-[1px] w-full bg-[#3D5C3D]"
            initial={{ scaleX: 0, originX: 0 }}
            variants={{
                hover: { scaleX: 1, originX: 0, transition: { duration: 0.3, ease: "easeOut" } },
                initial: { scaleX: 0, originX: 1, transition: { duration: 0.3, ease: "easeOut" } }
            }}
        /* 
           Trick: To make it slide OUT to the right, we switch originX to 1 on exit.
           However, Framer Motion variants for hover exit can be tricky with changing properties.
           Let's try a standard CSS animation approach or just stick to the requested "slide in left, slide out right" using two blocks or origin swap.
        */
        />
    )
}

// Improved TextButton with precise control
export const TextButtonEnhanced = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link href={href}>
            <motion.div
                className={cn(
                    "relative inline-block cursor-pointer py-1",
                    className
                )}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
            >
                <div className="overflow-hidden">
                    <motion.span
                        className="block text-xs font-bold uppercase tracking-[0.25em] text-[#3D5C3D]"
                        animate={{ x: isHovered ? 4 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {children}
                    </motion.span>
                </div>
                {/* Underline */}
                <motion.div
                    className="absolute bottom-0 left-0 h-[1px] w-full bg-[#3D5C3D]"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{
                        scaleX: isHovered ? 1 : 0,
                        originX: isHovered ? 0 : 1
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
            </motion.div>
        </Link>
    )
}
