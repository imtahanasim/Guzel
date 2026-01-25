"use server"

import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"
import { PRODUCTS as FALLBACK_PRODUCTS } from "./data"

export interface Product {
    slug: string
    title: string
    price: number
    imageMain: string
    imageHover: string
    badges: string[]
    [key: string]: any // Allow other properties from JSONB
}

// Helper to standardise the product shape from DB or Fallback
function mapProduct(data: any): Product {
    return {
        ...data,
        imageMain: data.images?.[0] || "",
        imageHover: data.images?.[1] || data.images?.[0] || "",
        badges: data.badges || []
    }
}

export async function getProducts(): Promise<Product[]> {
    // Graceful fallback if not connected to Vercel Postgres
    if (!process.env.POSTGRES_URL) {
        console.warn("⚠️ Vercel Postgres not connected. Using local fallback data.");
        return FALLBACK_PRODUCTS.map(p => mapProduct(p));
    }

    try {
        const { rows } = await sql`SELECT data FROM products ORDER BY (data->>'price')::int ASC`;
        if (rows.length === 0) {
            console.warn("No products in DB, falling back to local file.");
            return FALLBACK_PRODUCTS.map(p => mapProduct(p));
        }
        return rows.map(row => mapProduct(row.data));
    } catch (error) {
        // If table doesn't exist or other DB error
        console.error("Database connection issue, using fallback data.");
        return FALLBACK_PRODUCTS.map(p => mapProduct(p));
    }
}

export async function saveProduct(product: any) {
    try {
        // Upsert logic: Update if exists, Insert if not
        // Note: ON CONFLICT refers to the primary key 'id'
        await sql`
            INSERT INTO products (id, slug, data)
            VALUES (${product.id}, ${product.slug}, ${JSON.stringify(product)})
            ON CONFLICT (id) 
            DO UPDATE SET 
                slug = EXCLUDED.slug,
                data = EXCLUDED.data;
        `;

        revalidatePath("/shop");
        revalidatePath("/");
        revalidatePath("/dashboard");
        revalidatePath(`/products/${product.slug}`);

        return { success: true };
    } catch (error) {
        console.error("Error saving product:", error);
        return { success: false, error };
    }
}

export async function deleteProduct(id: string) {
    try {
        await sql`DELETE FROM products WHERE id = ${id}`;
        revalidatePath("/shop");
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { success: false, error };
    }
}

