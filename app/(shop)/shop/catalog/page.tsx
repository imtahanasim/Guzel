import Catalog from "@/components/Catalog"
import { Suspense } from "react"

export default function CatalogPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#fdfcf6]" />}>
            <Catalog />
        </Suspense>
    )
}
