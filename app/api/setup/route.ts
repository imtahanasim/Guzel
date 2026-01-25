import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // 1. Create Table
        await sql`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE,
        data JSONB
      );
    `;

        // 2. Check for existing data to avoid double seeding
        const { rows } = await sql`SELECT count(*) FROM products`;
        const count = parseInt(rows[0].count);

        if (count === 0) {
            // 3. Seed Data
            for (const p of PRODUCTS) {
                // Ensure data is valid JSON
                await sql`
          INSERT INTO products (id, slug, data)
          VALUES (${p.id}, ${p.slug}, ${JSON.stringify(p)})
        `;
            }
            return NextResponse.json({
                success: true,
                message: `Database initialized and seeded with ${PRODUCTS.length} products.`
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Database already exists and contains data. No changes made.'
        });

    } catch (error) {
        console.error('Database setup failed:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
