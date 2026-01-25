"use client"

import Link from "next/link"
import { Filter } from "lucide-react"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface ControlBarProps {
  onFilterClick: () => void
  sortBy: string
  onSortChange: (value: string) => void
}

export default function ControlBar({
  onFilterClick,
  sortBy,
  onSortChange,
}: ControlBarProps) {
  return (
    <div className="bg-[#FFF9EF] border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#3D5C3D] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#3D5C3D] transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-[#3D5C3D]">Art Prints</span>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Sort By */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort By:</label>
              <Select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price Low-High</option>
                <option value="price-high">Price High-Low</option>
                <option value="best-selling">Best Selling</option>
              </Select>
            </div>

            {/* Filter Button */}
            <Button
              onClick={onFilterClick}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
