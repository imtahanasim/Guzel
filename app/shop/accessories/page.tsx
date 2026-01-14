import { Suspense } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CollectionGrid from "@/components/CollectionGrid"
import { getProducts } from "@/lib/products"

export default async function AccessoriesPage() {
    const allProducts = await getProducts()

    // Filter for accessories
    const products = allProducts.filter(p =>
        p.title.toLowerCase().includes("tray") ||
        p.title.toLowerCase().includes("hook") ||
        p.title.toLowerCase().includes("cloth") ||
        p.title.toLowerCase().includes("stand")
    )

    return (
        <main className="min-h-screen bg-[#FFF9EF]">
            <Header />
            <div className="pt-32 pb-16 px-6 container mx-auto text-center">
                <h1 className="font-serif text-4xl md:text-5xl text-[#3D5C3D] mb-4">Accessories</h1>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Small details that make a big difference.
                </p>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <CollectionGrid items={products} showHeading={false} />
            </Suspense>
            <Footer />
        </main>
    )
}
