"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/useCartStore"

// Mock Data
const FRAME_OPTIONS = [
  {
    id: "oak",
    name: "Oak",
    thumbnail_url: "/product-pictures/get.jpg",
    price_modifier: 0, // Base price
  },
  {
    id: "walnut",
    name: "Walnut",
    thumbnail_url: "/product-pictures/get (1).jpg",
    price_modifier: 500,
  },
  {
    id: "mahogany",
    name: "Mahogany",
    thumbnail_url: "/product-pictures/get (2).jpg",
    price_modifier: 800,
  },
  {
    id: "black-metal",
    name: "Black Metal",
    thumbnail_url: "/product-pictures/get (3).jpg",
    price_modifier: 300,
  },
  {
    id: "brass",
    name: "Brass",
    thumbnail_url: "/product-pictures/Customised printed trays.heic",
    price_modifier: 1000,
  },
]

const MOUNT_OPTIONS = [
  {
    id: "none",
    name: "None",
    color: "transparent",
    price_modifier: 0,
  },
  {
    id: "off-white",
    name: "Off-White",
    color: "#f5f5f0",
    price_modifier: 200,
  },
  {
    id: "cream",
    name: "Cream",
    color: "#FFF9EF",
    price_modifier: 200,
  },
  {
    id: "black",
    name: "Black",
    color: "#1e1e1e",
    price_modifier: 200,
  },
]

const SIZE_OPTIONS = [
  {
    id: "8x10",
    name: "8\" × 10\"",
    dimensions: "8x10",
    base_price: 2500,
  },
  {
    id: "12x16",
    name: "12\" × 16\"",
    dimensions: "12x16",
    base_price: 3500,
  },
  {
    id: "16x20",
    name: "16\" × 20\"",
    dimensions: "16x20",
    base_price: 4500,
  },
  {
    id: "18x24",
    name: "18\" × 24\"",
    dimensions: "18x24",
    base_price: 5500,
  },
  {
    id: "24x30",
    name: "24\" × 30\"",
    dimensions: "24x30",
    base_price: 7500,
  },
]

export default function FrameConfigurator() {
  const [selectedFrame, setSelectedFrame] = useState(FRAME_OPTIONS[0].id)
  const [selectedMount, setSelectedMount] = useState(MOUNT_OPTIONS[0].id)
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[1].id)
  const addItem = useCartStore((state) => state.addItem)

  // Calculate dynamic price
  const totalPrice = useMemo(() => {
    const sizeOption = SIZE_OPTIONS.find((s) => s.id === selectedSize)
    const frameOption = FRAME_OPTIONS.find((f) => f.id === selectedFrame)
    const mountOption = MOUNT_OPTIONS.find((m) => m.id === selectedMount)

    if (!sizeOption || !frameOption || !mountOption) return 0

    return (
      sizeOption.base_price +
      frameOption.price_modifier +
      mountOption.price_modifier
    )
  }, [selectedFrame, selectedMount, selectedSize])

  // Get current frame image
  const currentFrameImage = FRAME_OPTIONS.find((f) => f.id === selectedFrame)
    ?.thumbnail_url || "/product-pictures/get.jpg"

  // Handle add to cart
  const handleAddToCart = () => {
    const sizeOption = SIZE_OPTIONS.find((s) => s.id === selectedSize)
    const frameOption = FRAME_OPTIONS.find((f) => f.id === selectedFrame)
    const mountOption = MOUNT_OPTIONS.find((m) => m.id === selectedMount)

    if (!sizeOption || !frameOption || !mountOption) return

    addItem({
      id: `${selectedFrame}-${selectedMount}-${selectedSize}-${Date.now()}`,
      title: "Custom Frame",
      price: totalPrice,
      thumbnail: currentFrameImage,
      frame: frameOption.name,
      mount: mountOption.name,
      size: sizeOption.name,
    })
  }

  return (
    <div className="min-h-screen bg-[#FFF9EF] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Sticky Image Gallery */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center order-2 lg:order-1">
            <div className="w-full max-w-lg">
              <motion.div
                key={selectedFrame}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/5] bg-gray-200 rounded-lg overflow-hidden"
              >
                {/* Placeholder for frame image - replace with actual images */}
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-4xl mb-4">🖼️</div>
                    <p className="text-sm text-gray-600">
                      {currentFrameImage}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {SIZE_OPTIONS.find((s) => s.id === selectedSize)?.name}
                    </p>
                  </div>
                </div>
                {/* When you have actual images, use this: */}
                {/* <Image
                  src={currentFrameImage}
                  alt={`${FRAME_OPTIONS.find(f => f.id === selectedFrame)?.name} frame`}
                  fill
                  className="object-cover"
                /> */}
              </motion.div>
            </div>
          </div>

          {/* Right Column - Customization Options */}
          <div className="py-8 order-1 lg:order-2">
            <div className="max-w-lg mx-auto lg:mx-0 space-y-12">
              {/* Frame Style Section */}
              <div>
                <h2 className="font-serif text-3xl text-[#1e1e1e] mb-6">
                  Frame Style
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                  {FRAME_OPTIONS.map((frame) => {
                    const isSelected = selectedFrame === frame.id
                    return (
                      <motion.button
                        key={frame.id}
                        onClick={() => setSelectedFrame(frame.id)}
                        className="relative group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                          {/* Placeholder - replace with actual thumbnail images */}
                          <div
                            className={`w-full h-full ${frame.id === "oak"
                                ? "bg-amber-200"
                                : frame.id === "walnut"
                                  ? "bg-amber-900"
                                  : frame.id === "mahogany"
                                    ? "bg-red-900"
                                    : frame.id === "black-metal"
                                      ? "bg-gray-800"
                                      : "bg-yellow-600"
                              }`}
                          />
                          {/* When you have thumbnails, use this: */}
                          {/* <Image
                            src={frame.thumbnail_url}
                            alt={frame.name}
                            fill
                            className="object-cover"
                          /> */}
                        </div>
                        {/* Double ring border for selected state */}
                        {isSelected && (
                          <div className="absolute inset-0 rounded-lg border-4 border-[#3e523f] pointer-events-none">
                            <div className="absolute inset-1 rounded-md border-2 border-[#3e523f]" />
                          </div>
                        )}
                        {/* Hover border */}
                        {!isSelected && (
                          <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-[#3e523f]/50 transition-colors" />
                        )}
                        <p className="text-xs text-center mt-2 text-[#1e1e1e] font-medium">
                          {frame.name}
                        </p>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Mat Board Section */}
              <div>
                <h2 className="font-serif text-3xl text-[#1e1e1e] mb-6">
                  Mat Board
                </h2>
                <div className="flex flex-wrap gap-4">
                  {MOUNT_OPTIONS.map((mount) => {
                    const isSelected = selectedMount === mount.id
                    return (
                      <motion.button
                        key={mount.id}
                        onClick={() => setSelectedMount(mount.id)}
                        className="relative group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
                            {mount.id === "none" ? (
                              <div className="w-full h-full bg-cream border-2 border-dashed border-gray-400 flex items-center justify-center">
                                <span className="text-xs text-gray-500">×</span>
                              </div>
                            ) : (
                              <div
                                className="w-full h-full"
                                style={{ backgroundColor: mount.color }}
                              />
                            )}
                          </div>
                          {/* Double ring border for selected state */}
                          {isSelected && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-[#3e523f] pointer-events-none">
                              <div className="absolute inset-1 rounded-full border-2 border-[#3e523f]" />
                            </div>
                          )}
                          {/* Hover border */}
                          {!isSelected && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-2 border-transparent group-hover:border-[#3e523f]/50 transition-colors" />
                          )}
                          <p className="text-xs text-center text-[#1e1e1e] font-medium">
                            {mount.name}
                          </p>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Size Section */}
              <div>
                <h2 className="font-serif text-3xl text-[#1e1e1e] mb-6">
                  Size
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {SIZE_OPTIONS.map((size) => {
                    const isSelected = selectedSize === size.id
                    return (
                      <motion.button
                        key={size.id}
                        onClick={() => setSelectedSize(size.id)}
                        className={`relative p-4 rounded-lg border-2 transition-all ${isSelected
                            ? "border-[#3e523f] bg-[#3e523f]/5"
                            : "border-gray-300 bg-cream hover:border-[#3e523f]/50"
                          }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Double ring effect for selected */}
                        {isSelected && (
                          <div className="absolute inset-0 rounded-lg border-2 border-[#3e523f] pointer-events-none" />
                        )}
                        <p className="text-sm font-medium text-[#1e1e1e]">
                          {size.name}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          PKR {size.base_price.toLocaleString()}
                        </p>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Price Display */}
              <div className="pt-8 border-t border-gray-200">
                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-lg text-gray-600">Total Price</span>
                  <span className="font-serif text-4xl text-[#1e1e1e]">
                    PKR {totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-[#3e523f] text-[#fdfcf6] hover:bg-[#2c3a2d] text-lg py-6 rounded-none font-sans"
                  size="lg"
                >
                  Add to Cart — PKR {totalPrice.toLocaleString()}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
