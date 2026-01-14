"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface FadeInStaggerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export default function FadeInStagger({
  children,
  className = "",
  staggerDelay = 0.1,
}: FadeInStaggerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface FadeInStaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function FadeInStaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: FadeInStaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface FadeInStaggerItemProps {
  children: ReactNode
  className?: string
}

export function FadeInStaggerItem({
  children,
  className = "",
}: FadeInStaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
