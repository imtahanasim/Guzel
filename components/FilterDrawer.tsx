"use client"

import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Accordion } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface FilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  filters: {
    category: string[]
    material: string[]
    priceRange: [number, number]
  }
  onFiltersChange: (filters: {
    category: string[]
    material: string[]
    priceRange: [number, number]
  }) => void
  resultCount: number
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  resultCount,
}: FilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const categories = ["Art", "Frames", "Mirrors"]
  const materials = ["Wood", "Metal", "Canvas"]

  const handleCategoryToggle = (category: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category],
    }))
  }

  const handleMaterialToggle = (material: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      material: prev.material.includes(material)
        ? prev.material.filter((m) => m !== material)
        : [...prev.material, material],
    }))
  }

  const handlePriceChange = (value: number, index: 0 | 1) => {
    setLocalFilters((prev) => {
      const newRange: [number, number] = [...prev.priceRange]
      newRange[index] = value
      if (index === 0 && newRange[0] > newRange[1]) {
        newRange[1] = newRange[0]
      }
      if (index === 1 && newRange[1] < newRange[0]) {
        newRange[0] = newRange[1]
      }
      return { ...prev, priceRange: newRange }
    })
  }

  const handleApplyFilters = () => {
    onFiltersChange(localFilters)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-sm p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-gray-200">
          <SheetTitle className="font-serif text-xl text-left">Filters</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Category Filter */}
          <Accordion title="Category" defaultOpen>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.category.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                    className="w-4 h-4 text-[#3e523f] border-gray-300 rounded focus:ring-[#3e523f]"
                  />
                  <span className="text-sm text-[#1e1e1e]">{cat}</span>
                </label>
              ))}
            </div>
          </Accordion>

          {/* Material Filter */}
          <Accordion title="Material" defaultOpen>
            <div className="space-y-2">
              {materials.map((mat) => (
                <label
                  key={mat}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.material.includes(mat)}
                    onChange={() => handleMaterialToggle(mat)}
                    className="w-4 h-4 text-[#3e523f] border-gray-300 rounded focus:ring-[#3e523f]"
                  />
                  <span className="text-sm text-[#1e1e1e]">{mat}</span>
                </label>
              ))}
            </div>
          </Accordion>

          {/* Price Range Filter */}
          <Accordion title="Price Range" defaultOpen>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-xs text-gray-600 mb-1 block">Min (PKR)</label>
                  <input
                    type="number"
                    value={localFilters.priceRange[0]}
                    onChange={(e) =>
                      handlePriceChange(Number(e.target.value), 0)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#3e523f]"
                    min="0"
                    max="50000"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-600 mb-1 block">Max (PKR)</label>
                  <input
                    type="number"
                    value={localFilters.priceRange[1]}
                    onChange={(e) =>
                      handlePriceChange(Number(e.target.value), 1)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#3e523f]"
                    min="0"
                    max="50000"
                  />
                </div>
              </div>
            </div>
          </Accordion>
        </div>

        {/* Footer */}
        <SheetFooter className="px-6 py-4 border-t border-gray-200">
          <Button
            onClick={handleApplyFilters}
            className="w-full bg-[#3e523f] text-[#fdfcf6] hover:bg-[#2c3a2d]"
          >
            Show {resultCount} Results
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
