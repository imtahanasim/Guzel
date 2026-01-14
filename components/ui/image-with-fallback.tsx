"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps extends ImageProps {
    fallbackText?: string
}

export default function ImageWithFallback({
    src,
    alt,
    className,
    fallbackText,
    ...props
}: ImageWithFallbackProps) {
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(false)
    }, [src])

    if (error || !src) {
        return (
            <div
                className={cn(
                    "flex h-full w-full items-center justify-center bg-[#f5f5f0] text-[#1e1e1e]",
                    className
                )}
            >
                <span className="font-serif text-4xl opacity-20 select-none">G</span>
            </div>
        )
    }

    return (
        <Image
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            {...props}
        />
    )
}
