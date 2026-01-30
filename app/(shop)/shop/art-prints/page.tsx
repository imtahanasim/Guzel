import { Suspense } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CollectionGrid from "@/components/CollectionGrid"
import { getProducts } from "@/lib/products"

export default async function ArtPrintsPage() {
    const allProducts = await getProducts()

    // Filter for art prints
    const products = allProducts.filter(p =>
        p.title.toLowerCase().includes("art") ||
        p.title.toLowerCase().includes("print") ||
        p.title.toLowerCase().includes("painting")
    )

    return (
        <main className="min-h-screen bg-[#FFF9EF]">
            <Header />
            <div className="pt-32 pb-16 px-6 container mx-auto text-center">
                <h1 className="font-serif text-4xl md:text-5xl text-[#3D5C3D] mb-4">Art Prints</h1>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Curated collection of fine art prints and paintings.
                </p>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <CollectionGrid items={products} showHeading={false} />
            </Suspense>
            <Footer />
        </main>
    )
}
