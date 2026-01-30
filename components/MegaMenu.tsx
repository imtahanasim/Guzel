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
  const shopCategories = [
    { name: "Shop All", href: "/shop/catalog", description: "Explore our complete curated collection." },
    { name: "Oil Paintings", href: "/shop/catalog?category=Oil+Paintings", description: "Hand-painted textures and rich vivid colors." },
    { name: "Canvas Prints", href: "/shop/catalog?category=Canvas+Prints", description: "Museum-quality giclée prints on canvas." },
    { name: "Mirrors", href: "/shop/catalog?category=Mirrors", description: "Reflective elegance for expanding spaces." },
    { name: "Calligraphy", href: "/shop/catalog?category=Calligraphy", description: "Traditional scripts with modern aesthetics." },
    { name: "Landscape Paintings", href: "/shop/catalog?category=Landscape+Paintings", description: "Scenic views tailored for serenity." },
    { name: "Abstract Art", href: "/shop/catalog?category=Abstract+Art", description: "Contemporary forms and expressionism." },
  ]

  const collectionCategories = [
    { name: "Gallery Walls", href: "/shop/catalog?category=Gallery+Walls", description: "Curated sets for instant impact." },
    { name: "Trays", href: "/shop/catalog?category=Trays", description: "Functional art for serving or display." },
    { name: "Grand Masters", href: "/shop/catalog?category=Grand+Masters", description: "Replicas of history's greatest works." },
  ]

  const framingCategories = [
    { name: "All Frames", href: "/shop/catalog?category=All+Frames", description: "Our complete range of custom mouldings." },
    { name: "Wooden Frames", href: "/shop/catalog?category=Wooden+Frames", description: "Natural warmth and organic textures." },
    { name: "Metal Frames", href: "/shop/catalog?category=Metal+Frames", description: "Sleek aluminum profiles for modern homes." },
    { name: "Empty Frames", href: "/shop/catalog?category=Empty+Frames", description: "Just the frame, for your own art." },
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
        <div className="container max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Column 1: Shop */}
            <div>
              <h3 className="font-serif text-3xl font-bold text-[#3A4D39] mb-6 border-b border-[#3A4D39]/20 pb-3">
                Shop
              </h3>
              <div className="flex flex-col">
                {shopCategories.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => onLinkClick?.()}
                    className="group block mb-4 last:mb-0"
                  >
                    <div className="font-sans font-medium text-[#3A4D39] group-hover:text-[#2A3829] transition-colors tracking-wide">
                      {item.name}
                    </div>
                    <div className="mt-1 text-xs text-stone-500 group-hover:text-[#3A4D39] transition-colors line-clamp-1">
                      {item.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Collections */}
            <div>
              <h3 className="font-serif text-3xl font-bold text-[#3A4D39] mb-6 border-b border-[#3A4D39]/20 pb-3">
                Collections
              </h3>
              <div className="flex flex-col">
                {collectionCategories.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => onLinkClick?.()}
                    className="group block mb-4 last:mb-0"
                  >
                    <div className="font-sans font-medium text-[#3A4D39] group-hover:text-[#2A3829] transition-colors tracking-wide">
                      {item.name}
                    </div>
                    <div className="mt-1 text-xs text-stone-500 group-hover:text-[#3A4D39] transition-colors line-clamp-1">
                      {item.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: Framing */}
            <div>
              <h3 className="font-serif text-3xl font-bold text-[#3A4D39] mb-6 border-b border-[#3A4D39]/20 pb-3">
                Framing
              </h3>
              <div className="flex flex-col">
                {framingCategories.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => onLinkClick?.()}
                    className="group block mb-4 last:mb-0"
                  >
                    <div className="font-sans font-medium text-[#3A4D39] group-hover:text-[#2A3829] transition-colors tracking-wide">
                      {item.name}
                    </div>
                    <div className="mt-1 text-xs text-stone-500 group-hover:text-[#3A4D39] transition-colors line-clamp-1">
                      {item.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 4: Featured Image */}
            <div className="hidden md:block h-full">
              <h3 className="font-serif text-xs tracking-[0.2em] uppercase text-[#3A4D39]/60 mb-6 opacity-0">
                Featured
              </h3>
              <Link
                href="/shop?category=Grand+Masters"
                onClick={() => onLinkClick?.()}
                className="block group relative h-[360px] w-full rounded-xl overflow-hidden bg-[#e6e3d5]"
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0 w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url('${slideshowImages[currentSlide]}')` }}
                    />
                  </AnimatePresence>
                </div>
                <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                  <p className="text-[10px] tracking-[0.2em] uppercase mb-2 text-white/80">
                    New Arrival
                  </p>
                  <h4 className="font-serif text-2xl mb-1 leading-tight">
                    Grand Masters
                  </h4>
                  <p className="text-xs text-white/90 font-light">
                    Museum quality replicas for your home.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
