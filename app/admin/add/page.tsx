"use client"

import { useState } from "react"
import { saveProduct } from "@/lib/products"
import { useRouter } from "next/navigation"

export default function AddProductPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        slug: "",
        imageMain: "",
        imageHover: "",
    })

    // Simple slug generation
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        setFormData(prev => ({
            ...prev,
            title,
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const product = {
                id: `manual-${Date.now()}`,
                ...formData,
                price: Number(formData.price),
                badges: ["New"], // Default badge
                imageMain: formData.imageMain || "/product-pictures/artisan-framing.jpg", // Fallback
                imageHover: formData.imageHover || "/product-pictures/frame-walnut.jpg",
                images: [
                    formData.imageMain || "/product-pictures/artisan-framing.jpg",
                    formData.imageHover || "/product-pictures/frame-walnut.jpg"
                ]
            }

            const res = await saveProduct(product)
            if (res.success) {
                alert("Product added successfully!")
                router.push("/shop")
            } else {
                alert("Failed to add product.")
            }
        } catch (err) {
            console.error(err)
            alert("Error adding product")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#fdfcf6] p-8 flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-[#3e523f]/10">
                <h1 className="font-serif text-3xl text-[#3e523f] mb-6">Add New Product</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Product Title</label>
                        <input
                            type="text"
                            required
                            className="w-full p-2 border rounded"
                            value={formData.title}
                            onChange={handleTitleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Slug (Auto-generated)</label>
                        <input
                            type="text"
                            required
                            className="w-full p-2 border rounded bg-gray-50"
                            value={formData.slug}
                            onChange={e => setFormData({ ...formData, slug: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Price (PKR)</label>
                        <input
                            type="number"
                            required
                            className="w-full p-2 border rounded"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Image URL (Main)</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="/product-pictures/..."
                            value={formData.imageMain}
                            onChange={e => setFormData({ ...formData, imageMain: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Image URL (Hover)</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="/product-pictures/..."
                            value={formData.imageHover}
                            onChange={e => setFormData({ ...formData, imageHover: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#3e523f] text-white font-bold py-3 rounded hover:bg-[#2c3b2d] transition-colors"
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    )
}
