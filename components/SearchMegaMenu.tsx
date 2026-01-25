"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PRODUCTS } from "@/lib/data"

interface SearchMegaMenuProps {
    isOpen: boolean
    onClose: () => void
}

const CATEGORIES = [
    "Wood Frames",
    "Metal Frames",
    "Painted Frames",
    "Gallery Walls",
    "Art Prints",
    "Mirrors",
    "Home Decor"
]

export default function SearchMegaMenu({ isOpen, onClose }: SearchMegaMenuProps) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState(PRODUCTS)
    const [matchedCategories, setMatchedCategories] = useState<string[]>(CATEGORIES)
    const inputRef = useRef<HTMLInputElement>(null)

    // Reset query when opened
    useEffect(() => {
        if (isOpen) {
            setQuery("")
            // Focus input after animation roughly completes
            setTimeout(() => {
                inputRef.current?.focus()
            }, 300)
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => { document.body.style.overflow = "unset" }
    }, [isOpen])

    // Filter Logic
    useEffect(() => {
        if (!query.trim()) {
            // Zero State
            setResults(PRODUCTS.slice(0, 4)) // Show trending/top items
            setMatchedCategories(CATEGORIES)
        } else {
            const lowerQuery = query.toLowerCase()

            // Filter Products
            const filteredProducts = PRODUCTS.filter(p =>
                p.title.toLowerCase().includes(lowerQuery) ||
                p.category.toLowerCase().includes(lowerQuery)
            )
            setResults(filteredProducts)

            // Filter Categories
            const filteredCats = CATEGORIES.filter(c =>
                c.toLowerCase().includes(lowerQuery)
            )
            // If no categories match directly, keep showing all or maybe related? 
            // The logic "If user types, show 'Matching Categories'" usually implies filtering.
            // If the list becomes empty, it looks weird. Let's fallback to all if empty or just show matches.
            setMatchedCategories(filteredCats.length > 0 ? filteredCats : CATEGORIES)
        }
    }, [query])

    // Handle ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (isOpen && e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop (Click to close) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    {/* Mega Menu Panel */}
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 left-0 right-0 z-50 bg-cream border-b border-gray-100 shadow-xl"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-h-[85vh] overflow-y-auto">

                            {/* --- ROW 1: INPUT --- */}
                            <div className="relative mb-12">
                                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search for frames, sizes, or artists..."
                                    className="w-full pl-10 pr-12 py-4 text-2xl md:text-3xl font-serif text-[#1e1e1e] placeholder:text-gray-300 border-b border-gray-100 focus:outline-none focus:border-[#3D5C3D]/30 transition-colors bg-transparent"
                                />
                                <button
                                    onClick={onClose}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            {/* --- ROW 2: SPLIT GRID --- */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

                                {/* LEFT COL (Categories) */}
                                <div className="md:col-span-3 space-y-6 border-b md:border-b-0 md:border-r border-gray-100 pb-8 md:pb-0">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                        {query ? "Matching Sections" : "Sections"}
                                    </h3>
                                    <ul className="space-y-3">
                                        {matchedCategories.map((cat, idx) => (
                                            <li key={idx}>
                                                <Link
                                                    href={`/shop?category=${cat}`}
                                                    onClick={onClose}
                                                    className="flex items-center group text-[#3D5C3D]"
                                                >
                                                    <span className="text-lg font-medium group-hover:translate-x-2 transition-transform duration-300">
                                                        {cat}
                                                    </span>
                                                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 text-[#3D5C3D]/60" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* RIGHT COL (Products) */}
                                <div className="md:col-span-9">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                                        {query ? "Product Results" : "Trending Now"}
                                    </h3>

                                    {results.length > 0 ? (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                                            {results.slice(0, 8).map((product) => (
                                                <Link
                                                    key={product.slug}
                                                    href={`/products/${product.slug}`}
                                                    onClick={onClose}
                                                    className="group block"
                                                >
                                                    {/* Image */}
                                                    <div className="relative aspect-[3/4] overflow-hidden bg-[#f4f4f4] rounded-sm mb-3">
                                                        <Image
                                                            src={product.images[0]}
                                                            alt={product.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                            sizes="(min-width: 768px) 25vw, 50vw"
                                                        />
                                                    </div>
                                                    {/* Text */}
                                                    <div>
                                                        <h4 className="font-serif text-base text-[#1e1e1e] group-hover:underline underline-offset-4 decoration-black/20 truncate">
                                                            {product.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                                                            PKR {product.price.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-12 text-center text-gray-400">
                                            <p className="font-serif text-xl italic">
                                                No matches found for "{query}".
                                            </p>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
