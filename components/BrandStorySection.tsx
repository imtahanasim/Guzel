"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import FadeInStagger from "./FadeInStagger"

export default function BrandStorySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section ref={containerRef} className="bg-[#F7EEDC] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text */}
          <FadeInStagger className="space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#3D5C3D] leading-tight">
              The Art of Framing.
            </h2>
            <p className="text-base md:text-lg text-[#3D5C3D]/80 leading-relaxed max-w-lg">
              We don't just frame pictures; we preserve memories. Using
              Italian-grade wood and museum-quality mounts, every piece is
              handcrafted in our Islamabad studio.
            </p>
            <Link
              href="/about"
              className="inline-block text-sm font-medium text-[#3e523f] underline underline-offset-4 hover:text-[#2c3a2d] transition-colors"
            >
              Read Our Story
            </Link>
          </FadeInStagger>

          {/* Right Side - Image */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative aspect-[4/5] rounded-lg overflow-hidden bg-gray-200"
          >
            {/* Placeholder image - replace with actual frame/artisan image */}
            <div className="w-full h-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🖼️</div>
                <p className="text-sm text-gray-600">
                  Frame corner join or artisan at work
                </p>
              </div>
            </div>
            {/* When you have the actual image, use BlurImage: */}
            {/* <BlurImage
              src="/product-pictures/artisan-framing.jpg"
              alt="Handcrafted frame corner join"
              fill
              className="object-cover"
            /> */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
