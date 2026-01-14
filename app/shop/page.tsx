import { Suspense } from "react"
import EditorialShopLayout from "@/components/EditorialShopLayout"
import { getProducts } from "@/lib/products"

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <EditorialShopLayout products={products} />
      </Suspense>
    </main>
  )
}
