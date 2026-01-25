"use client"

import { Star } from "lucide-react"

export default function TrustSignalStrip() {
  return (
    <section className="w-full bg-[#FFF9EF] py-6 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-[#3e523f] text-[#3e523f]"
              />
            ))}
          </div>
          <span className="text-sm text-[#3D5C3D] font-medium">
            Excellent
          </span>
          <span className="text-sm text-gray-500">Trustpilot</span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">4.8 out of 5</span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">1,234 reviews</span>
        </div>
      </div>
    </section>
  )
}
