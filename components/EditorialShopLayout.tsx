"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import CollectionGrid, { type CollectionItem } from "@/components/CollectionGrid"
import { cn } from "@/lib/utils"
import ProductCard from "@/components/ProductCard"
import { PRODUCTS as PRODUCTS_DATA } from "@/lib/data"
// New Components
import ShopVideoInterlude from "@/components/ShopVideoInterlude"
import ShopSplitFeature from "@/components/ShopSplitFeature"
import ShopServiceRow from "@/components/ShopServiceRow"

interface EditorialShopLayoutProps {
    products: CollectionItem[]
}

const safeCategories = [
    { name: "Oil Paintings", image: "/product-pictures/photo-1568945721269-c998c4cbb043.avif" },
    { name: "Canvas Prints", image: "/product-pictures/premium_photo-1667239474298-844804eca38f.avif" },
    { name: "Mirrors", image: "/product-pictures/photo-1712219002737-d4e04d21c2c8.avif" },
    { name: "Gallery Walls", image: "/product-pictures/premium_photo-1667239474298-844804eca38f.avif" },
    { name: "Trays", image: "/product-pictures/photo-1700605293481-0dbb483de8bc.avif" },
    { name: "Grand Masters", image: "/product-pictures/photo-1674382009124-fafdebe47267.avif" },
    { name: "Wooden Frames", image: "/product-pictures/photo-1694636435043-debf9ba4febb.avif" },
]

export default function EditorialShopLayout({ products }: EditorialShopLayoutProps) {
    // Unified data source logic: Use props if available, else fallback to mock data
    const displayProducts = products.length > 0
        ? products
        : PRODUCTS_DATA.map(p => ({
            slug: p.slug,
            title: p.title,
            price: p.price,
            imageMain: p.images[0],
            imageHover: p.images[1] || p.images[0],
            badges: p.badges || []
        }));

    // Ensure scroll starts at top when component mounts (fixes potential transition glitch)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Split products for the grid structure strictly
    const grid1 = displayProducts.slice(0, 8)
    const grid2 = displayProducts.slice(8, 16)
    const grid3 = displayProducts.slice(16)

    return (
        <div className="bg-cream min-h-screen pb-20">
            {/* Section A: Editorial Hero */}
            <section className="relative w-full h-[80vh] min-h-[600px] flex flex-col md:flex-row overflow-hidden">
                {/* Left Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12 z-10 bg-cream">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6b6b6b] mb-4 block">
                            The Collection
                        </span>
                        <h1 className="font-serif text-5xl md:text-7xl text-[#1e1e1e] leading-[1.1] mb-6">
                            The Walnut <br /> Collection.
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 font-serif italic max-w-md mb-8">
                            "Hand-finished in Islamabad using sustainable materials unlike anything else."
                        </p>
                        <Link
                            href="/shop/catalog"
                            className="inline-flex items-center text-sm uppercase tracking-widest font-bold text-[#1e1e1e] border-b border-[#1e1e1e] pb-1 hover:text-[#3D5C3D] hover:border-[#3D5C3D] transition-colors"
                        >
                            Explore All Catalogue <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
                {/* Right Image */}
                <div className="w-full md:w-1/2 h-full relative">
                    <video
                        src="/4.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>
            </section>

            {/* Section B: Visual Sub-Category Nav */}
            <section className="py-12 border-b border-[#e6e3d5] overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-6">
                        <span className="text-xs font-bold tracking-widest uppercase text-[#6b6b6b] block text-center md:text-left">
                            Explore Categories
                        </span>
                        {/* Shop Now link removed from here */}
                    </div>
                    <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x items-center">
                        {safeCategories.map((cat, idx) => (
                            <Link
                                href={`/shop/catalog?category=${encodeURIComponent(cat.name)}`}
                                key={cat.name}
                                legacyBehavior={false} // Next 13+ default
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: false, amount: 0.2 }}
                                    className="flex-shrink-0 flex flex-col items-center gap-3 group snap-start cursor-pointer min-w-[100px]"
                                >
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-[#e6e3d5] relative">
                                        <Image
                                            src={cat.image}
                                            alt={cat.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide uppercase text-[#3D5C3D] group-hover:text-black transition-colors whitespace-nowrap">
                                        {cat.name}
                                    </span>
                                </motion.div>
                            </Link>
                        ))}

                        {/* Explore All "Category" Item */}
                        <Link
                            href="/shop/catalog"
                            legacyBehavior={false}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: safeCategories.length * 0.1 }}
                                viewport={{ once: false, amount: 0.2 }}
                                className="flex-shrink-0 flex flex-col items-center gap-3 group snap-start cursor-pointer min-w-[100px]"
                            >
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-[#3D5C3D] bg-[#3D5C3D] group-hover:bg-[#2a402a] flex items-center justify-center transition-colors duration-500 relative">
                                    <ArrowRight className="text-[#fdfcf6] w-8 h-8 md:w-10 md:h-10 group-hover:scale-125 transition-transform duration-300" />
                                </div>
                                <span className="text-sm font-bold tracking-wide uppercase text-[#1e1e1e] group-hover:text-[#3D5C3D] transition-colors whitespace-nowrap border-b border-[#1e1e1e] pb-[1px] group-hover:border-[#3D5C3D]">
                                    Explore All
                                </span>
                            </motion.div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Section C: Product Grid 1 (Best Sellers) */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex items-end justify-between mb-12">
                        <h2 className="font-serif text-3xl md:text-4xl text-[#1e1e1e]">Best Sellers</h2>
                    </div>

                    {/* Explicit Grid Mapping as Requested */}
                    {/* Best Sellers: Standard Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-x-8 md:gap-y-16">
                        {grid1.map((product) => (
                            <div key={product.slug} className="group relative">
                                <ProductCard
                                    title={product.title}
                                    price={product.price}
                                    imageMain={product.imageMain}
                                    imageHover={product.imageHover}
                                    slug={product.slug}
                                    badges={product.badges}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GRID BREAKER: Video Manifesto */}
            <ShopVideoInterlude />

            {/* Section: Product Grid 2 */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <h2 className="font-serif text-2xl md:text-4xl text-[#1e1e1e] mb-6 md:mb-12 text-center">Curated Selection</h2>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-x-8 md:gap-y-16">
                        {grid2.map((product) => (
                            <div key={product.slug} className="group relative">
                                <ProductCard
                                    title={product.title}
                                    price={product.price}
                                    imageMain={product.imageMain}
                                    imageHover={product.imageHover}
                                    slug={product.slug}
                                    badges={product.badges}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GRID BREAKER: Split Editorial Feature */}
            <ShopSplitFeature />

            {/* Section: Product Grid 3 (Remaining) */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <h2 className="font-serif text-2xl md:text-4xl text-[#1e1e1e] mb-6 md:mb-12 text-center">More to Explore</h2>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-x-8 md:gap-y-16">
                        {grid3.map((product) => (
                            <div key={product.slug} className="group relative">
                                <ProductCard
                                    title={product.title}
                                    price={product.price}
                                    imageMain={product.imageMain}
                                    imageHover={product.imageHover}
                                    slug={product.slug}
                                    badges={product.badges}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GRID BREAKER: Service Cards */}
            <ShopServiceRow />

        </div>
    )
}
