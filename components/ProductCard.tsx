"use client"

import { useState } from "react"
import Link from "next/link"
import ImageWithFallback from "@/components/ui/image-with-fallback"
import { cn } from "@/lib/utils"
import { Bookmark, ArrowUpRight } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"

export interface ProductCardProps {
  title: string
  price: number
  originalPrice?: number
  imageMain: string      // Studio Shot
  imageHover: string     // Lifestyle/Hover Shot
  slug: string
  badges?: string[]
}

export default function ProductCard({
  title,
  price,
  originalPrice,
  imageMain,
  imageHover,
  slug,
  badges = [],
}: ProductCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem({
      id: slug, // Using slug as ID for now or could combine with options
      title,
      price,
      thumbnail: imageMain,
      frame: "Standard", // Defaults
      mount: "None",
      size: "One Size"
    })
  }

  return (
    <div className="group relative w-full cursor-pointer">
      <Link href={`/products/${slug}`} className="block">
        {/* Image Wrapper */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#f0f0f0] rounded-sm">
          {/* Base Image (Studio) */}
          <div className="absolute inset-0 transition-opacity duration-500 ease-out lg:group-hover:opacity-0 delay-100">
            <ImageWithFallback
              src={imageMain}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>

          {/* Hover Image (Lifestyle) - Desktop Only */}
          <div className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 ease-out">
            <ImageWithFallback
              src={imageHover}
              alt={`${title} lifestyle`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>

          {/* Badges */}
          {badges.length > 0 && (
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
              {badges.map(tag => (
                <span key={tag} className="bg-cream/90 backdrop-blur-sm px-1.5 py-0.5 md:px-2 md:py-1 text-[9px] md:text-[10px] uppercase tracking-widest font-mono border border-black/5 self-start">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Floating Action Icon (Top Right) */}
          <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="bg-cream/90 p-1.5 rounded-full backdrop-blur-sm border border-black/5 hover:bg-cream hover:scale-105 transition-transform">
              <ArrowUpRight className="w-4 h-4 text-[#1e1e1e]" />
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button className="flex-1 bg-cream/90 backdrop-blur-sm text-[#1e1e1e] py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold border border-white/20 hover:bg-[#3D5C3D] hover:text-cream transition-colors shadow-lg">
              Customize
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#3D5C3D] text-white py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold border border-[#3D5C3D] hover:bg-cream hover:text-[#3D5C3D] transition-colors shadow-lg"
            >
              Add
            </button>
          </div>
        </div>

        {/* Information Row */}
        <div className="flex justify-between items-start mt-4">
          <div className="space-y-1">
            <h3 className="font-serif text-xs md:text-sm leading-tight text-[#1e1e1e] group-hover:text-[#3D5C3D] transition-colors">{title}</h3>
            <div className="font-mono text-[10px] md:text-xs text-gray-500 flex gap-2 items-center">
              {originalPrice && (
                <span className="line-through decoration-gray-400 opacity-60">
                  PKR {originalPrice.toLocaleString()}
                </span>
              )}
              <span className={originalPrice ? "text-[#B33939] font-medium" : ""}>
                PKR {price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Bookmark Icon */}
          <button
            onClick={(e) => {
              e.preventDefault() // Prevent navigation
              setIsBookmarked(!isBookmarked)
            }}
            className="text-gray-400 hover:text-[#3D5C3D] transition-colors p-1"
          >
            <Bookmark
              className={cn("w-5 h-5 transition-all duration-300", isBookmarked ? "fill-[#3D5C3D] text-[#3D5C3D]" : "")}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </Link>
    </div>
  )
}
