"use client"

import { useMemo, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import ControlBar from "@/components/ControlBar"
import FilterDrawer from "@/components/FilterDrawer"
import CollectionGrid, { type CollectionItem } from "@/components/CollectionGrid"
import ProductGridSkeleton from "@/components/ProductGridSkeleton"

interface ShopContentProps {
    initialProducts: CollectionItem[]
}

export default function ShopContent({ initialProducts }: ShopContentProps) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    // Get filters from URL params
    const categoryParam = searchParams.get("category")?.split(",") || []
    const materialParam = searchParams.get("material")?.split(",") || []
    const priceMin = Number(searchParams.get("priceMin")) || 0
    const priceMax = Number(searchParams.get("priceMax")) || 50000
    const sortBy = searchParams.get("sort") || "newest"

    const [filters, setFilters] = useState({
        category: categoryParam,
        material: materialParam,
        priceRange: [priceMin, priceMax] as [number, number],
    })

    // Update filters when URL params change
    useEffect(() => {
        setFilters({
            category: categoryParam,
            material: materialParam,
            priceRange: [priceMin, priceMax],
        })
    }, [categoryParam, materialParam, priceMin, priceMax])

    // Update URL when filters change
    const updateURL = (newFilters: typeof filters, newSort: string) => {
        const params = new URLSearchParams()

        if (newFilters.category.length > 0) {
            params.set("category", newFilters.category.join(","))
        }
        if (newFilters.material.length > 0) {
            params.set("material", newFilters.material.join(","))
        }
        if (newFilters.priceRange[0] > 0) {
            params.set("priceMin", newFilters.priceRange[0].toString())
        }
        if (newFilters.priceRange[1] < 50000) {
            params.set("priceMax", newFilters.priceRange[1].toString())
        }
        if (newSort !== "newest") {
            params.set("sort", newSort)
        }

        router.push(`/shop?${params.toString()}`, { scroll: false })
    }

    const handleFiltersChange = (newFilters: typeof filters) => {
        setFilters(newFilters)
        updateURL(newFilters, sortBy)
    }

    const handleSortChange = (newSort: string) => {
        updateURL(filters, newSort)
    }

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let products = [...initialProducts]

        // Apply category filter
        if (filters.category.length > 0) {
            products = products.filter((product) =>
                filters.category.some((cat) =>
                    product.title.toLowerCase().includes(cat.toLowerCase())
                )
            )
        }

        // Apply material filter
        if (filters.material.length > 0) {
            products = products.filter((product) =>
                filters.material.some((mat) =>
                    product.title.toLowerCase().includes(mat.toLowerCase())
                )
            )
        }

        // Apply price filter
        products = products.filter(
            (product) =>
                product.price >= filters.priceRange[0] &&
                product.price <= filters.priceRange[1]
        )

        // Apply sorting
        switch (sortBy) {
            case "price-low":
                products.sort((a, b) => a.price - b.price)
                break
            case "price-high":
                products.sort((a, b) => b.price - a.price)
                break
            case "best-selling":
                products.sort((a, b) => {
                    const aHasBestSeller = a.badges?.includes("Best Seller") ? 1 : 0
                    const bHasBestSeller = b.badges?.includes("Best Seller") ? 1 : 0
                    return bHasBestSeller - aHasBestSeller
                })
                break
            default:
                // Newest (default order - usually by array index if no date field)
                // If products have ID or date, sort by that. Assuming mock data is pre-sorted or irrelevant.
                break
        }

        return products
    }, [filters, sortBy, initialProducts])

    return (
        <>
            <ControlBar
                onFilterClick={() => setIsFilterOpen(true)}
                sortBy={sortBy}
                onSortChange={handleSortChange}
            />
            <FilterDrawer
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                resultCount={filteredProducts.length}
            />
            <section className="py-16 md:py-24 bg-[#fdfcf6]">
                <div className="container mx-auto px-4">
                    <CollectionGrid items={filteredProducts} showHeading={false} />
                </div>
            </section>
        </>
    )
}
