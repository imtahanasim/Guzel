"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const BRAND_VALUES = [
  "HANDCRAFTED IN ISLAMABAD",
  "ARCHIVAL QUALITY MATERIALS",
  "CUSTOM FRAMING STUDIO",
  "FREE SHIPPING TO PAKISTAN",
  "VERIFIED ARTISAN WORKSHOP"
]

export default function AnnouncementBar() {
  return (
    <div className="h-10 bg-[#3A4D39] text-cream overflow-hidden flex items-center border-b border-[#3A4D39] relative z-50">
      {/* Seamless Double Marquee */}
      <div className="flex whitespace-nowrap overflow-hidden w-full">
        <motion.div
          className="flex"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40, // Very slow glide
          }}
        >
          {/* First Copy */}
          <MarqueeContent />
          {/* Second Copy (Duplicate for Loop) */}
          <MarqueeContent />
        </motion.div>
      </div>
    </div>
  )
}

function MarqueeContent() {
  return (
    <div className="flex gap-16 items-center shrink-0 pr-16 bg-[#3A4D39]">
      {BRAND_VALUES.map((value, idx) => (
        <div key={idx} className="flex items-center gap-16">
          <span className="text-xs md:text-sm font-serif font-medium tracking-[0.15em] uppercase">
            {value}
          </span>
          <Star className="w-2.5 h-2.5 fill-current text-cream/40" />
        </div>
      ))}
    </div>
  )
}
