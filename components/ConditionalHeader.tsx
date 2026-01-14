"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/Header"

export default function ConditionalHeader() {
    const pathname = usePathname()
    // Hide header on coming-soon page
    if (pathname === '/coming-soon') {
        return null
    }
    return <Header />
}
