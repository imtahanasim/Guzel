import { PRODUCTS } from "@/lib/data"
import { notFound } from "next/navigation"
import ProductContent from "@/components/ProductContent"

// Force dynamic rendering so we always see the latest data from lib/data.ts
export const dynamic = "force-dynamic"
export const revalidate = 0

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    // Soft Fallback: Default to first product if slug not found
    const product = PRODUCTS.find((p) => p.slug === params.slug)

    if (!product) {
        notFound()
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

    return (
        <ProductContent product={product} relatedProducts={relatedProducts} />
    )
}
