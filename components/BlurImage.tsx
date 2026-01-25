"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BlurImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export default function BlurImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority = false,
}: BlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={{ scale: 1.1, filter: "blur(20px)" }}
      animate={{
        scale: isLoaded ? 1 : 1.1,
        filter: isLoaded ? "blur(0px)" : "blur(20px)",
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onLoad={() => setIsLoaded(true)}
          priority={priority}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover"
          onLoad={() => setIsLoaded(true)}
          priority={priority}
        />
      )}
    </motion.div>
  )
}
