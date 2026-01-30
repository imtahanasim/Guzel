import { Suspense } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CollectionGrid from "@/components/CollectionGrid"
import { getProducts } from "@/lib/products"

export default async function MirrorsPage() {
    const allProducts = await getProducts()

    // Filter for mirrors
    const products = allProducts.filter(p =>
        p.title.toLowerCase().includes("mirror")
    )

    return (
        <main className="min-h-screen bg-[#FFF9EF]">
            <Header />
            <div className="pt-32 pb-16 px-6 container mx-auto text-center">
                <h1 className="font-serif text-4xl md:text-5xl text-[#3D5C3D] mb-4">Mirrors</h1>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Reflect style with our collection of antique and modern mirrors.
                </p>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <CollectionGrid items={products} showHeading={false} />
            </Suspense>
            <Footer />
        </main>
    )
}
