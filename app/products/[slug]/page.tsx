"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ImageWithFallback from "@/components/ui/image-with-fallback"
import { useCartStore } from "@/store/useCartStore"
import ProductCard from "@/components/ProductCard"
import ZoomableImage from "@/components/ZoomableImage"
import { ChevronDown, ChevronUp, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { notFound } from "next/navigation"

import { PRODUCTS } from "@/lib/data"
import SizeGuideModal from "@/components/SizeGuideModal"

// Animation Variants
const containerVariant = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

const SIZES = [
    { id: "12x16", label: '12" x 16"', multiplier: 1 },
    { id: "18x24", label: '18" x 24"', multiplier: 1.5 },
    { id: "24x36", label: '24" x 36"', multiplier: 2.2 },
    { id: "custom", label: 'Custom', multiplier: 0 } // handled separately
]

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    // 2. Debug & Fallback Logic
    // console.log("Current Slug:", params.slug)

    // Soft Fallback: Default to first product if slug not found
    const product = PRODUCTS.find((p) => p.slug === params.slug) || PRODUCTS[0]

    const [activeImage, setActiveImage] = useState(product.images[0])
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
    const [selectedSize, setSelectedSize] = useState(SIZES[0])
    const [openAccordion, setOpenAccordion] = useState<string | null>("story")
    const [currentPrice, setCurrentPrice] = useState(product.price)
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)

    // Reset state when product changes
    useEffect(() => {
        setActiveImage(product.images[0])
        setSelectedVariant(product.variants[0])
        setSelectedSize(SIZES[0])
        setOpenAccordion("story")
        setCurrentPrice(product.price)
    }, [product])

    // Update price when size changes
    useEffect(() => {
        if (selectedSize.id !== 'custom') {
            setCurrentPrice(Math.round(product.price * selectedSize.multiplier))
        }
    }, [selectedSize, product.price])

    const addItem = useCartStore(state => state.addItem)

    const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id)
    }

    const handleAddToCart = () => {
        if (selectedSize.id === 'custom') return // Use contact form logic instead

        addItem({
            id: `${product.id}-${selectedVariant.id}-${selectedSize.id}-${Date.now()}`,
            title: `${product.title} - ${selectedVariant.name}`,
            price: currentPrice,
            thumbnail: selectedVariant.image,
            frame: selectedVariant.name,
            mount: "None",
            size: selectedSize.label
        })
    }

    // Related Products Logic
    let relatedProducts = PRODUCTS.filter(
        (p) => p.category === product.category && p.slug !== product.slug
    )
    if (relatedProducts.length < 4) {
        const others = PRODUCTS.filter(
            (p) => p.category !== product.category && p.slug !== product.slug
        )
        for (const other of others) {
            if (relatedProducts.length >= 4) break
            relatedProducts.push(other)
        }
    }
    const relatedProductsMapped = relatedProducts.slice(0, 4).map(p => ({
        ...p,
        imageMain: p.images[0],
        imageHover: p.images[1] || p.images[0]
    }))

    return (
        <div className="bg-cream min-h-screen pt-32 pb-32">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">

                {/* 3. Breadcrumb Navigation */}
                <div className="mb-12 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#1e1e1e]/40">
                    <Link href="/" className="hover:text-[#3D5C3D] transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:text-[#3D5C3D] transition-colors">Frames</Link>
                    <span>/</span>
                    <span className="text-[#3D5C3D]">{product.title}</span>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start relative">

                    {/* Left Column: Visual Gallery (Span 7 to give more breathing room to text) */}
                    <div className="lg:col-span-7 space-y-20">

                        {/* Main Gallery Section */}
                        <div className="space-y-6 sticky top-32">
                            {/* Main Stage: High-Fidelity Zoom */}
                            <div className="w-full">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeImage}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    >
                                        <ZoomableImage src={activeImage} alt={product.title} />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Thumbnail Grid */}
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={cn(
                                            "relative aspect-square overflow-hidden rounded-sm transition-all duration-300 border border-transparent",
                                            activeImage === img ? "border-[#3D5C3D] opacity-100" : "opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <ImageWithFallback
                                            src={img}
                                            alt={`View ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Atelier Options (Span 5) */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            className="lg:sticky lg:top-32 space-y-10"
                            variants={containerVariant}
                            initial="hidden"
                            animate="show"
                        >

                            {/* Header Info */}
                            <motion.div variants={itemVariant} className="space-y-4 border-b border-[#3D5C3D]/10 pb-8">
                                <h1 className="font-serif text-4xl lg:text-5xl text-[#1e1e1e] leading-[1.1]">
                                    {product.title}
                                </h1>
                                <div className="flex items-center gap-4 font-mono">
                                    <span className="text-2xl text-[#3D5C3D]">
                                        {selectedSize.id === 'custom'
                                            ? "Contact for Quote"
                                            : `PKR ${currentPrice.toLocaleString()}`
                                        }
                                    </span>
                                </div>
                            </motion.div>

                            {/* Selectors Stack */}
                            <motion.div variants={itemVariant} className="space-y-8">

                                {/* Size Selector */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#1e1e1e]/60">Select Size</span>
                                        <button onClick={() => setIsSizeGuideOpen(true)} className="text-[10px] underline decoration-dotted text-[#3D5C3D] uppercase tracking-wider hover:text-black transition-colors">Size Guide</button>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {SIZES.map((size) => (
                                            <button
                                                key={size.id}
                                                onClick={() => setSelectedSize(size)}
                                                className={cn(
                                                    "px-4 py-2 text-sm font-medium border rounded-full transition-all duration-300 min-w-[3rem]",
                                                    selectedSize.id === size.id
                                                        ? "border-[#3D5C3D] bg-[#3D5C3D] text-white"
                                                        : "border-[#1e1e1e]/20 text-[#1e1e1e] hover:border-[#3D5C3D]"
                                                )}
                                            >
                                                {size.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Finish Selector */}
                                <div className="space-y-4">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#1e1e1e]/60">
                                        Finish: <span className="text-[#1e1e1e]">{selectedVariant.name}</span>
                                    </span>
                                    <div className="flex gap-4">
                                        {product.variants.map((variant) => (
                                            <button
                                                key={variant.id}
                                                onClick={() => {
                                                    setSelectedVariant(variant)
                                                    setActiveImage(variant.image)
                                                }}
                                                className={cn(
                                                    "relative w-12 h-12 rounded-full overflow-hidden border transition-all duration-300",
                                                    selectedVariant.id === variant.id
                                                        ? "border-[#3D5C3D] ring-1 ring-[#3D5C3D] ring-offset-2 ring-offset-cream scale-110"
                                                        : "border-transparent opacity-80 hover:opacity-100 dark:ring-offset-black" // dark mode safety
                                                )}
                                            >
                                                <ImageWithFallback
                                                    src={variant.image}
                                                    alt={variant.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Add To Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={selectedSize.id === 'custom'}
                                    className={cn(
                                        "w-full py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg active:scale-[0.99] transform",
                                        selectedSize.id === 'custom'
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                                            : "bg-[#3D5C3D] text-white hover:bg-[#2c402c]"
                                    )}
                                >
                                    {selectedSize.id === 'custom' ? "Request Custom Size" : "Add to Cart"}
                                </button>

                            </motion.div>

                            {/* Premium Accordions */}
                            <motion.div variants={itemVariant} className="pt-8">
                                {/* Story */}
                                <div className="border-t border-[#3D5C3D]/10">
                                    <button
                                        onClick={() => toggleAccordion('story')}
                                        className="w-full flex justify-between items-center py-5 text-xs font-bold uppercase tracking-widest text-[#1e1e1e] hover:text-[#3D5C3D] transition-colors group"
                                    >
                                        <span>The Story</span>
                                        <span className="text-[#3D5C3D] transition-transform duration-300 group-hover:rotate-90">
                                            {openAccordion === 'story' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {openAccordion === 'story' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="pb-8 text-sm md:text-[15px] text-[#4a4a4a] font-serif leading-relaxed whitespace-pre-line">
                                                    {product.longDescription || product.description}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Dimensions & Material */}
                                <div className="border-t border-[#3D5C3D]/10">
                                    <button
                                        onClick={() => toggleAccordion('dimensions')}
                                        className="w-full flex justify-between items-center py-5 text-xs font-bold uppercase tracking-widest text-[#1e1e1e] hover:text-[#3D5C3D] transition-colors group"
                                    >
                                        <span>Dimensions & Material</span>
                                        <span className="text-[#3D5C3D] transition-transform duration-300 group-hover:rotate-90">
                                            {openAccordion === 'dimensions' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {openAccordion === 'dimensions' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-8 space-y-4 text-sm md:text-[15px] text-[#4a4a4a] font-serif leading-relaxed whitespace-pre-line">
                                                    <p>{product.dimensionsDetails || product.specs.dimensions}</p>
                                                    {product.materialStory && (
                                                        <div className="pt-2 border-t border-dashed border-[#3D5C3D]/10">
                                                            <p className="pt-2 italic text-[#3D5C3D]">{product.materialStory}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Shipping */}
                                <div className="border-t border-[#3D5C3D]/10 border-b">
                                    <button
                                        onClick={() => toggleAccordion('shipping')}
                                        className="w-full flex justify-between items-center py-5 text-xs font-bold uppercase tracking-widest text-[#1e1e1e] hover:text-[#3D5C3D] transition-colors group"
                                    >
                                        <span>Shipping & Care</span>
                                        <span className="text-[#3D5C3D] transition-transform duration-300 group-hover:rotate-90">
                                            {openAccordion === 'shipping' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {openAccordion === 'shipping' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="pb-8 text-sm md:text-[15px] text-[#4a4a4a] font-serif leading-relaxed">
                                                    {product.specs.shipping}. Each piece is carefully packaged in our custom reinforced wooden crate to ensure perfect arrival. Wipe with a microfiber cloth to maintain the finish. Avoid direct sunlight.
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                        </motion.div>
                    </div>
                </div>

                {/* Bottom Section: Related Products */}
                <div className="mt-32 border-t border-[#3D5C3D]/10 pt-20">
                    <h2 className="text-center font-serif text-3xl text-[#1e1e1e] mb-16 tracking-wide">
                        Curated for You
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-x-8 md:gap-y-16">
                        {relatedProductsMapped.map((prod) => (
                            <div key={prod.slug} className="group relative">
                                <ProductCard
                                    title={prod.title}
                                    price={prod.price}
                                    imageMain={prod.imageMain}
                                    imageHover={prod.imageHover}
                                    slug={prod.slug}
                                    badges={prod.badges}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* MOBILE FIXED ACTION BAR */}
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-cream border-t border-[#3D5C3D]/10 p-4 lg:hidden flex items-center gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-gray-500">Total</span>
                        <span className="font-mono text-lg text-[#3D5C3D] font-bold">
                            {selectedSize.id === 'custom'
                                ? "Quote"
                                : `PKR ${currentPrice.toLocaleString()}`
                            }
                        </span>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        disabled={selectedSize.id === 'custom'}
                        className={cn(
                            "flex-1 py-3 text-xs font-bold uppercase tracking-[0.2em] shadow-lg active:scale-[0.98] transition-transform",
                            selectedSize.id === 'custom'
                                ? "bg-gray-200 text-gray-400"
                                : "bg-[#3D5C3D] text-white"
                        )}
                    >
                        {selectedSize.id === 'custom' ? "Custom" : "Add to Cart"}
                    </button>
                </div>

            </div>
            {/* Size Guide Modal */}
            <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
        </div>
    )
}
