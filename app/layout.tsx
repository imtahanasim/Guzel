import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import CartSheet from "@/components/CartSheet"
import SmoothScroll from "@/components/SmoothScroll"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Guzel - Art & Framing Studio",
  description: "Handcrafted frames and art pieces from Pakistan",
}

import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CartSheet />
        </SmoothScroll>
      </body>
    </html>
  )
}
