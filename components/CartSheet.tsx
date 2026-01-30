"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Minus, Plus, X, Loader2 } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"
import Link from "next/link"

import ImageWithFallback from "@/components/ui/image-with-fallback"

const CROSS_SELL_ITEMS = [
  {
    id: "walnut-hook",
    title: "Walnut Wall Hook",
    price: 2400,
    thumbnail: "/product-pictures/get (2).jpg",
  },
  {
    id: "tray-small",
    title: "Small Serving Tray",
    price: 3200,
    thumbnail: "/product-pictures/gallery-frames-main.jpg",
  },
  {
    id: "cleaning-cloth",
    title: "Glass Cleaning Cloth",
    price: 900,
    thumbnail: "/product-pictures/get.jpg",
  },
]

export default function CartSheet() {
  const {
    isOpen,
    closeCart,
    items,
    updateQuantity,
    removeItem,
    addItem,
    getSubtotal,
  } = useCartStore()

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const subtotal = getSubtotal()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const discount = subtotal > 0 ? Math.round(subtotal * 0.1) : 0
  const total = Math.max(subtotal - discount, 0)



  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col bg-[#FFF9EF] p-0 sm:max-w-xl lg:max-w-2xl [&>button]:hidden"
      >
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between border-b border-gray-200 px-6 py-5">
          <SheetTitle className="font-serif text-xs tracking-[0.28em] text-[#3D5C3D] uppercase">
            Shopping Cart
          </SheetTitle>
          <SheetClose asChild>
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="h-4 w-4" />
            </button>
          </SheetClose>
        </SheetHeader>

        {/* Scrollable content */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 space-y-8"
          data-lenis-prevent
        >
          {/* Cart items */}
          {items.length === 0 ? (
            <div className="flex min-h-[200px] items-center justify-center text-sm text-gray-500">
              Your cart is empty.
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-gray-200 pb-6 last:border-b-0"
                >
                  {/* Left: Image */}
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-[#F3E8D8]">
                    <ImageWithFallback
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Middle: Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-sm font-medium text-[#3D5C3D]">
                        {item.title}
                      </h3>
                      <div className="mt-1 space-y-0.5 text-xs text-gray-500">
                        <p>Frame: {item.frame}</p>
                        <p>Mount: {item.mount}</p>
                        <p>Size: {item.size}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Price & controls */}
                  <div className="flex flex-col items-end justify-between gap-2 text-right">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="line-through">
                          PKR{" "}
                          {Math.round(item.price * 1.15).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-[#3D5C3D]">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-2 py-1 text-xs">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="h-5 w-5 rounded-full hover:bg-gray-100 flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-xs font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-5 w-5 rounded-full hover:bg-gray-100 flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-1 text-[10px] uppercase tracking-[0.18em] text-gray-500 underline underline-offset-4 hover:text-[#3D5C3D]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cross-sell carousel */}
          <div className="space-y-3">
            <h3 className="font-serif text-xs tracking-[0.28em] uppercase text-[#3D5C3D]">
              Customers Also Bought
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-1">
              {CROSS_SELL_ITEMS.map((product) => (
                <div
                  key={product.id}
                  className="flex w-32 flex-shrink-0 flex-col gap-2"
                >
                  <div className="relative h-24 w-full overflow-hidden rounded-md bg-[#F3E8D8]">
                    <ImageWithFallback
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-xs font-medium text-[#3D5C3D]">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      PKR {product.price.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-full border-gray-300 bg-transparent text-[11px] uppercase tracking-[0.18em] text-[#3D5C3D] hover:bg-[#EADFCC]"
                    onClick={() => addItem({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      thumbnail: product.thumbnail,
                      frame: "Standard",
                      mount: "None",
                      size: "One Size"
                    })}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky footer */}
        <SheetFooter className="mt-auto flex-col sm:flex-col sm:space-x-0 sm:justify-start gap-4 border-t border-gray-200 bg-[#FFF9EF] px-6 pb-6 pt-4">
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center justify-between">
              <span>Products ({itemCount})</span>
              <span>PKR {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span className="text-[#B33939]">
                - PKR {discount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-[11px] text-gray-500">
                Taxes and duties included
              </span>
            </div>
          </div>

          <div className="flex w-full items-center justify-between pt-1">
            <span className="font-serif text-base text-[#3D5C3D]">Subtotal</span>
            <span className="font-serif text-2xl font-semibold text-[#3D5C3D]">
              PKR {total.toLocaleString()}
            </span>
          </div>

          <Button
            className="mt-2 h-12 w-full rounded-none bg-[#3D5C3D] text-xs font-semibold uppercase tracking-[0.24em] text-[#FFF9EF] hover:bg-[#304730]"
            onClick={() => {
              setIsLoading(true)
              closeCart()
              router.push("/checkout")
              // Reset loading state after a delay in case navigation fails or cart is reopened
              setTimeout(() => setIsLoading(false), 1000)
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

          {/* Trust strip */}
          <div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex h-6 items-center justify-center rounded border border-gray-300 px-2 text-[9px] text-gray-600">
                VISA
              </div>
              <div className="flex h-6 items-center justify-center rounded border border-gray-300 px-2 text-[9px] text-gray-600">
                MasterCard
              </div>
              <div className="flex h-6 items-center justify-center rounded border border-gray-300 px-2 text-[9px] text-gray-600">
                Apple Pay
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex h-3 w-3 items-center justify-center rounded-sm bg-[#00B67A] text-[7px] text-white">
                ★
              </span>
              <span className="text-[9px] font-medium text-gray-600">
                Trustpilot
              </span>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

