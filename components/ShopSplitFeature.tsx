"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function ShopSplitFeature() {
    return (
        <section className="group flex flex-col md:flex-row h-[70vh] min-h-[500px] overflow-hidden my-16">
            {/* Image Side - Zooms on hover of container (or just text side hover if strictly requested, but group hover is smoother) */}
            <div className="w-full md:w-1/2 relative overflow-hidden bg-[#e6e3d5]">
                <video
                    src="/second.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 bg-cream flex flex-col justify-center px-8 md:px-20 py-12">
                <div className="max-w-md">
                    <h2 className="font-serif text-3xl md:text-5xl text-[#1e1e1e] mb-6">
                        The Artisan Series
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 font-serif leading-relaxed line-clamp-3 md:line-clamp-none">
                        Rich, warm tones and sustainable sourcing make our Walnut series the perfect choice for modern homes.
                    </p>
                    <Link
                        href="/shop/catalog"
                        className="inline-flex items-center text-sm uppercase tracking-widest font-bold text-[#1e1e1e] border-b border-[#1e1e1e] pb-1 hover:text-[#3D5C3D] hover:border-[#3D5C3D] transition-colors"
                    >
                        Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
