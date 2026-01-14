"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import products from "@/data/products.json"

interface MegaMenuProps {
  category: string | null
  onMouseLeave: () => void
  onMouseEnter: () => void
  onLinkClick?: () => void
}

import { cn } from "@/lib/utils"

export default function MegaMenu({ category, onMouseLeave, onMouseEnter, onLinkClick }: MegaMenuProps) {
  const menuItems = [
    { name: "All", href: "/shop/catalog", description: "Browse our complete collection." },
    { name: "Wood Frames", href: "/shop/catalog?category=Wood+Frames", description: "Hand-finished, sustainable styles." },
    { name: "Metal Frames", href: "/shop/catalog?category=Metal+Frames", description: "Sleek, modern aluminium profiles." },
    { name: "Gallery Walls", href: "/shop/catalog?category=Gallery+Walls", description: "Curated sets for instant impact." },
    { name: "Art Prints", href: "/shop/catalog?category=Art+Prints", description: "Exclusive works on giclée paper." },
    { name: "Framed Art", href: "/shop/catalog?category=Framed+Art", description: "Ready-to-hang masterpieces." },
    { name: "Mirrors", href: "/shop/catalog?category=Mirrors", description: "Minimalist designs for any space." },
    { name: "Accessories", href: "/shop/catalog?category=Accessories", description: "The perfect finishing touches." },
  ]

  const slideshowImages = products
    .map((product) => product.imageMain)
    .filter((img) => img && !img.includes('#') && !img.toLowerCase().endsWith('.heic'))

  const [currentSlide, setCurrentSlide] = useState(() => Math.floor(Math.random() * slideshowImages.length))

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-0 right-0 top-full z-50 origin-top"
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      <div className="bg-[#FFF9EF] text-[#3D5C3D] border-t border-[#e6e3d5] shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
        <div className="container max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Column 1 - Primary categories */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6b6b6b]">
                {category === "Shop" ? "Shop Categories" : "Framing"}
              </h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href || "/"}
                    onClick={() => onLinkClick?.()}
                    className={cn(
                      "group block",
                      item.href === "#" && "border border-red-500 rounded-sm p-1" // Visual debugging
                    )}
                  >
                    <div className="text-sm font-medium text-[#1e1e1e] group-hover:text-[#3e523f] transition-colors uppercase tracking-wide">
                      {item.name}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-500 group-hover:text-[#3D5C3D] transition-colors">
                      {item.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3-4 - Featured card */}
            <div className="md:col-span-1 lg:col-span-2">
              <Link
                href="/shop?category=frames"
                onClick={() => onLinkClick?.()}
                className="block group"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#e6e3d5]">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url('${slideshowImages[currentSlide]}')` }}
                      />
                    </AnimatePresence>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 z-20 text-[#fdfcf6]">
                    <p className="text-xs tracking-[0.2em] uppercase mb-1 text-[#f0eee4]">
                      Featured
                    </p>
                    <h4 className="font-serif text-xl md:text-2xl mb-1">
                      New Walnut Collection
                    </h4>
                    <p className="text-xs md:text-sm text-[#f0eee4]">
                      Sculpted profiles in deep walnut, designed for gallery walls.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
