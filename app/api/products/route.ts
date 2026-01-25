import { NextResponse } from 'next/server';
import { getProducts, saveProduct } from '@/lib/products';

export async function GET() {
    const products = await getProducts();
    return NextResponse.json(products);
}

export async function POST(request: Request) {
    try {
        const products = await request.json();

        // Handle both single product and array of products for backward compatibility
        const productList = Array.isArray(products) ? products : [products];

        for (const product of productList) {
            await saveProduct(product);
        }

        return NextResponse.json({ success: true, message: 'Products updated successfully' });
    } catch (error) {
        console.error('Error updating products:', error);
        return NextResponse.json({ success: false, message: 'Failed to update products' }, { status: 500 });
    }
}
