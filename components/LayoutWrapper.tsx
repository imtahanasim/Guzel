"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import CartSheet from "./CartSheet";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Hide global layout elements on dashboard and admin routes
    const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");
    const isArtUniverse = pathname === "/art-universe";

    return (
        <>
            {!isDashboard && !isArtUniverse && <Header />}
            {!isDashboard && <CartSheet />}
            {children}
            {!isDashboard && !isArtUniverse && <Footer />}
        </>
    );
}
