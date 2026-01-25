"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useCartStore } from "@/store/useCartStore"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, getSubtotal } =
    useCartStore()

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const subtotal = getSubtotal()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-lg p-0 bg-cream">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle className="font-serif text-2xl text-left">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 stroke-1 mb-4" />
            <p className="text-gray-500 mb-6 text-center">
              Your cart is empty
            </p>
            <Button
              onClick={closeCart}
              className="bg-[#3e523f] text-[#fdfcf6] hover:bg-[#2c3a2d]"
            >
              Start Framing
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div
              className="flex-1 overflow-y-auto px-6 space-y-6"
              data-lenis-prevent
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-gray-200 last:border-0"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-[#f5f5f0]">
                    {/* Placeholder - replace with actual image */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-xs text-gray-500">🖼️</span>
                    </div>
                    {/* When you have images, use this: */}
                    {/* <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                    /> */}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-medium text-[#1e1e1e] mb-1">
                      {item.title}
                    </h3>

                    {/* Variant Details */}
                    <div className="text-xs text-muted-foreground space-y-0.5 mb-3">
                      <p>Frame: {item.frame}</p>
                      <p>Mount: {item.mount}</p>
                      <p>Size: {item.size}</p>
                    </div>

                    {/* Quantity Counter */}
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <p className="text-sm font-medium text-[#1e1e1e]">
                      PKR {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex-shrink-0 p-2 hover:bg-gray-100 rounded transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <SheetFooter className="flex-col gap-4 mt-auto pt-6 px-6 pb-6 border-t border-gray-200">
              {/* Subtotal */}
              <div className="flex justify-between items-center w-full">
                <span className="text-lg text-gray-600">Subtotal</span>
                <span className="font-serif text-xl text-[#1e1e1e]">
                  PKR {subtotal.toLocaleString()}
                </span>
              </div>

              {/* Checkout Button */}
              <Button
                className="w-full bg-[#3e523f] text-[#fdfcf6] hover:bg-[#2c3a2d] h-[50px] text-base font-sans rounded-none"
                onClick={() => {
                  setIsLoading(true)
                  router.push("/checkout")
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </Button>

              {/* Shipping Note */}
              <p className="text-xs text-center text-gray-500">
                Shipping calculated at checkout.
              </p>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
