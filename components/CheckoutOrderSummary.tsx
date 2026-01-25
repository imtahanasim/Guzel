"use client"

import { useCartStore } from "@/store/useCartStore"
import Image from "next/image"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function CheckoutOrderSummary() {
  const items = useCartStore((state) => state.items)
  const getSubtotal = useCartStore((state) => state.getSubtotal)
  const [isOpen, setIsOpen] = useState(false)

  const subtotal = getSubtotal()
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  return (
    <div className="lg:sticky lg:top-24 h-fit">
      {/* Mobile Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between py-4 border-b border-gray-200"
      >
        <span className="font-serif text-lg text-[#1e1e1e]">
          Order Summary
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {/* Order Summary Content */}
      <div
        className={`${isOpen ? "block" : "hidden"
          } lg:block bg-[#f5f5f0] rounded-lg p-6`}
      >
        <h2 className="font-serif text-xl text-[#1e1e1e] mb-6">
          Order Summary
        </h2>

        {/* Items List */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              {/* Thumbnail */}
              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                {/* Image */}
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Item Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-medium text-sm text-[#1e1e1e] mb-1">
                  {item.title}
                </h3>
                <div className="text-xs text-gray-600 space-y-0.5 mb-2">
                  <p>Frame: {item.frame}</p>
                  <p>Mount: {item.mount}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity} × PKR {item.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="space-y-3 pt-6 border-t border-gray-300">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-[#1e1e1e]">
              PKR {subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="text-[#1e1e1e]">Free</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-300">
            <span className="font-serif text-lg text-[#1e1e1e]">Total</span>
            <span className="font-serif text-xl text-[#1e1e1e]">
              PKR {total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
