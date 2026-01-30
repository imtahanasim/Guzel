import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { writeFile } from 'fs/promises';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file received.' },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replaceAll(' ', '_');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = path.extname(filename);
        const basename = path.basename(filename, extension);
        const uniqueFilename = `${basename}-${uniqueSuffix}${extension}`;

        // Ensure directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'product-pictures');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, uniqueFilename);
        await writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            url: `/product-pictures/${uniqueFilename}`
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { error: 'Error uploading file.' },
            { status: 500 }
        );
    }
}
