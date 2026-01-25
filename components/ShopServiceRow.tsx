"use client"

import { Button } from "@/components/ui/button"
import { Ruler, Layers } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ShopServiceRow() {
    return (
        <section className="container mx-auto px-4 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Card A: Samples */}
                <div className="relative group overflow-hidden rounded-xl h-[400px] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out cursor-pointer">
                    <Image
                        src="/product-pictures/artisan-framing.jpg"
                        alt="Frame Samples"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
                        <Layers className="w-12 h-12 mb-4 opacity-90" />
                        <h3 className="font-serif text-3xl mb-2">Order Samples</h3>
                        <p className="text-white/80 mb-8 max-w-xs">Not sure about the finish? Get a sample kit delivered to your door.</p>
                        <Link href="/coming-soon">
                            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-cream hover:text-black">
                                View Kit
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Card B: Custom Sizing */}
                <div className="relative group overflow-hidden rounded-xl h-[400px] bg-[#3e523f] text-[#fdfcf6] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out flex flex-col items-center justify-center text-center p-8 cursor-pointer">
                    <Ruler className="w-12 h-12 mb-4 opacity-90" />
                    <h3 className="font-serif text-3xl mb-2">Need a custom size?</h3>
                    <p className="text-[#fdfcf6]/80 mb-8 max-w-xs">We build frames to your exact specifications. No standard sizes required.</p>
                    <Link href="/coming-soon">
                        <Button variant="secondary" className="bg-[#fdfcf6] text-[#3e523f] hover:bg-white">
                            Start Customizing
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    )
}
