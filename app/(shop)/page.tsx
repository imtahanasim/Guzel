import Link from "next/link"
import { ArrowRight } from "lucide-react"

import Hero from "@/components/Hero"
import GuzelScroll from "@/components/GuzelScroll"
import ArtisanProcess from "@/components/ArtisanProcess"
import StudioOrigins from "@/components/StudioOrigins"

import CollectionGrid from "@/components/CollectionGrid"

import SistersStoryDivider from "@/components/SistersStoryDivider"

import { getProducts } from "@/lib/products"

export default async function Home() {
  const products = await getProducts()
  const featuredProducts = products.slice(0, 4)

  return (
    <main className="min-h-screen">
      <Hero />
      <GuzelScroll />
      <ArtisanProcess />
      <section className="py-16 md:py-32 bg-cream">
        <CollectionGrid items={featuredProducts} />
        <div className="flex justify-center mt-16">
          <Link
            href="/shop/catalog"
            className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-serif border border-[#3D5C3D] rounded-full transition-all duration-300 hover:bg-[#3D5C3D]"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#3D5C3D] rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
            <span className="relative text-sm md:text-base font-bold tracking-[0.2em] uppercase text-[#3D5C3D] group-hover:text-[#fdfcf6] transition-colors duration-300 flex items-center gap-3">
              All Products <ArrowRight className="w-5 h-5" />
            </span>
          </Link>
        </div>
      </section>

      <StudioOrigins />


      <SistersStoryDivider />

    </main>
  )
}
