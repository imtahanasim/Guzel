"use server"

import fs from "fs/promises"
import path from "path"
import { revalidatePath } from "next/cache"

const dataFilePath = path.join(process.cwd(), "data", "products.json")

export interface Product {
    slug: string
    title: string
    price: number
    imageMain: string
    imageHover: string
    badges: string[]
}

import { PRODUCTS } from "./data"

export async function getProducts(): Promise<Product[]> {
    // Map the shared data to the Product interface expected by the app
    return PRODUCTS.map(p => ({
        slug: p.slug,
        title: p.title,
        price: p.price,
        imageMain: p.images[0],
        imageHover: p.images[1] || p.images[0],
        badges: p.badges || []
    }))
}

export async function addProduct(product: Product) {
    try {
        const products = await getProducts()
        products.unshift(product) // Add to beginning
        await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2))
        revalidatePath("/shop")
        revalidatePath("/") // Verify home page too
        return { success: true }
    } catch (error) {
        console.error("Error adding product:", error)
        return { success: false, error }
    }
}
