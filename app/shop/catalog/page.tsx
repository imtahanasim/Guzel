import ShopCatalog from "@/components/ShopCatalog"
import { Suspense } from "react"

export default function CatalogPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#fdfcf6]" />}>
            <ShopCatalog />
        </Suspense>
    )
}
