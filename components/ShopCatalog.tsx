"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { PRODUCTS } from "@/lib/data"
import ProductCard from "@/components/ProductCard"
import { useSearchParams, useRouter } from "next/navigation"

// --- TYPES ---
type Category = "All" | "Wood Frames" | "Metal Frames" | "Gallery Walls" | "Art Prints" | "Framed Art" | "Mirrors" | "Accessories"

const CATEGORIES: Category[] = [
    "All",
    "Wood Frames",
    "Metal Frames",
    "Gallery Walls",
    "Art Prints",
    "Framed Art",
    "Mirrors",
    "Accessories"
]

// --- MAIN COMPONENT ---
export default function ShopCatalog() {
    const searchParams = useSearchParams()
    const router = useRouter()

    // Initialize from URL or default to "All"
    const initialCategory = searchParams.get("category") as Category
    const [activeCategory, setActiveCategory] = useState<Category>(
        (initialCategory && CATEGORIES.includes(initialCategory)) ? initialCategory : "All"
    )

    // Sync state with URL params on change (e.g. back button or external link navigation)
    useEffect(() => {
        const cat = searchParams.get("category") as Category
        if (cat && CATEGORIES.includes(cat)) {
            setActiveCategory(cat)
        } else {
            setActiveCategory("All")
        }
    }, [searchParams])

    // Sync URL when category changes (optional, but good for shareability)
    const handleCategoryChange = (category: Category) => {
        // Optimistically update state
        setActiveCategory(category)

        // Update URL
        const params = new URLSearchParams(searchParams.toString())
        if (category === "All") {
            params.delete("category")
        } else {
            params.set("category", category)
        }
        router.replace(`/shop/catalog?${params.toString()}`, { scroll: false })
    }

    // Filter Logic
    const filteredProducts = activeCategory === "All"
        ? PRODUCTS
        : PRODUCTS.filter(p => {
            const cat = p.category
            const title = p.title

            if (activeCategory === "Wood Frames") return cat.includes("Wood") || cat.includes("Painted")
            if (activeCategory === "Metal Frames") return cat.includes("Metal")
            if (activeCategory === "Gallery Walls") return title.includes("Gallery")
            if (activeCategory === "Art Prints") return cat === "Art Prints"
            if (activeCategory === "Framed Art") return cat === "Art Prints" || title.includes("Art") // Broaden match
            if (activeCategory === "Mirrors") return cat === "Mirrors"
            if (activeCategory === "Accessories") return cat === "Home Decor"

            return false
        })

    return (
        <main className="bg-[#fdfcf6] min-h-screen relative">
            {/* 1. Sticky Filter Strip - Flush with Header */}
            <FilterStrip active={activeCategory} onChange={handleCategoryChange} />

            {/* 2. Shuffle Grid - Living Grid Animation */}
            <div className="container mx-auto px-4 py-12 min-h-screen">
                <motion.div
                    layout
                    variants={{
                        show: {
                            transition: {
                                staggerChildren: 0.05
                            }
                        }
                    }}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 gap-y-8 px-4"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map(product => (
                            <motion.div
                                key={product.slug}
                                layout
                                variants={{
                                    hidden: { opacity: 0, y: 20, scale: 0.9 },
                                    show: { opacity: 1, y: 0, scale: 1 }
                                }}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: false, amount: 0.2 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="will-change-transform"
                            >
                                <ProductCard
                                    {...product}
                                    imageMain={product.images[0]}
                                    imageHover={product.images[1]}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>


        </main>
    )
}

// --- SUB-COMPONENTS ---

function FilterStrip({ active, onChange }: { active: Category, onChange: (c: Category) => void }) {
    return (
        <div className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#fdfcf6]/80 border-b border-[#3D5C3D]/10 transition-all duration-300 mt-0">
            <div className="container mx-auto px-0 md:px-4">
                <div className="flex items-center gap-2 py-4 overflow-x-auto snap-x snap-mandatory scroll-pl-4 px-4 md:px-0 no-scrollbar">
                    {CATEGORIES.map(category => {
                        const isActive = active === category
                        return (
                            <button
                                key={category}
                                onClick={() => onChange(category)}
                                className={`
                                    relative px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-colors duration-300 whitespace-nowrap snap-start
                                    ${isActive ? "text-[#fdfcf6]" : "text-[#3D5C3D] hover:bg-[#3D5C3D]/5"}
                                `}
                            >
                                {/* Sliding Pill Background */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-[#3D5C3D] rounded-full"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {/* Text Label (z-10 to sit on top of pill) */}
                                <span className="relative z-10">{category}</span>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


