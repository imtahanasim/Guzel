"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"
import { useEffect, useRef } from "react"

export default function CheckoutSuccessPage() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const hasCleared = useRef(false)

  useEffect(() => {
    // Clear cart on success page load (only once)
    if (!hasCleared.current && items.length > 0) {
      items.forEach((item) => removeItem(item.id))
      hasCleared.current = true
    }
  }, [items, removeItem])

  return (
    <div className="min-h-screen bg-[#fdfcf6] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <CheckCircle className="w-16 h-16 text-[#3e523f] mx-auto mb-6" />
        <h1 className="font-serif text-3xl md:text-4xl text-[#1e1e1e] mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your order. We'll send you a confirmation email shortly
          and begin processing your custom frame.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              Continue Shopping
            </Button>
          </Link>
          <Link href="/">
            <Button className="bg-[#3e523f] text-[#fdfcf6] hover:bg-[#2c3a2d]">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
