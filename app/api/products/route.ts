import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/data';
import fs from 'fs';
import path from 'path';

export async function GET() {
    return NextResponse.json(PRODUCTS);
}

export async function POST(request: Request) {
    try {
        const products = await request.json();

        // Format the products array as a TypeScript string
        const fileContent = `export const PRODUCTS = ${JSON.stringify(products, null, 4)};\n`;

        // Path to lib/data.ts
        const filePath = path.join(process.cwd(), 'lib', 'data.ts');

        // Write the new content to the file
        fs.writeFileSync(filePath, fileContent, 'utf-8');

        return NextResponse.json({ success: true, message: 'Products updated successfully' });
    } catch (error) {
        console.error('Error updating products:', error);
        return NextResponse.json({ success: false, message: 'Failed to update products' }, { status: 500 });
    }
}
