import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Only protect /dashboard routes
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        const session = request.cookies.get('dashboard_session_v2')

        // If no session cookie exists, redirect to login
        if (!session) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/dashboard/:path*',
}
