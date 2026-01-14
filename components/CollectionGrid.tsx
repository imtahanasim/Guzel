"use client"

import { motion } from "framer-motion"
import ProductCard, { type ProductCardProps } from "@/components/ProductCard"


export type CollectionItem = ProductCardProps

interface CollectionGridProps {
    items: CollectionItem[]
    showHeading?: boolean
}

export default function CollectionGrid({
    items,
    showHeading = true,
}: CollectionGridProps) {

    // If no items provided, handle gracefully (or skeleton)
    if (!items || items.length === 0) {
        return null;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }

    return (
        <section className="w-full bg-[#FFF9EF] py-24">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                {showHeading && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="mb-16 text-center"
                    >
                        <h2 className="font-serif text-4xl md:text-5xl text-[#1e1e1e] mb-4">
                            Curated Frames
                        </h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto font-sans">
                            A selection of our most loved pieces, crafted to elevate your
                            walls with quiet luxury.
                        </p>
                    </motion.div>
                )}

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16"
                >
                    {items.map((product) => (
                        <motion.div key={product.slug} variants={itemVariants} className="group relative">
                            <div className="relative overflow-hidden rounded-lg mb-4">
                                <ProductCard {...product} />

                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
