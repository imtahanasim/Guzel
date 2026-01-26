"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion"
import { Menu, X, ShoppingBag, Search } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"
import AnnouncementBar from "./AnnouncementBar"
import MegaMenu from "./MegaMenu"
import SearchMegaMenu from "./SearchMegaMenu"
import MobileMenu from "./MobileMenu"


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const openCart = useCartStore((state) => state.openCart)
  const items = useCartStore((state) => state.items)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40)
  })

  const menuItems = [
    { label: "Shop", href: "/shop" },
    { label: "Art", href: "/art-universe" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  const handleMouseEnter = (menuLabel: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setHoveredMenu(menuLabel)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredMenu(null)
    }, 150)
  }

  const handleCloseMenu = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setHoveredMenu(null)
    setIsMenuOpen(false)
  }

  return (
    <>
      <AnnouncementBar />
      <motion.header
        className="sticky top-0 z-50 text-[#3D5C3D]"
        initial={false}
        animate={{
          backgroundColor: "#FFF9EF", // Solid Cream matched to body
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
          paddingTop: isScrolled ? 12 : 24,
          paddingBottom: isScrolled ? 12 : 24,
          boxShadow: isScrolled
            ? "0 10px 30px rgba(0,0,0,0.12)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-4">

          {/* --- MOBILE HEADER (Visible < md) --- */}
          <div className="flex md:hidden items-center justify-between h-12">
            {/* Left: Hamburger */}
            <button
              className="inline-flex items-center justify-center w-10 h-10 -ml-2 text-[#3D5C3D]"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Center: Small Logo */}
            <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-24 h-8 relative">
                <img
                  src="/main-logo.png"
                  alt="Guzel"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>

            {/* Right: Search + Bag */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-[#3D5C3D]"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={openCart}
                className="relative text-[#3D5C3D]"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#3D5C3D] text-[#FFF9EF] text-[0.5rem] font-bold">
                    {items.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* --- DESKTOP HEADER (Visible >= md) --- */}
          <div className="hidden md:flex items-center justify-between gap-6 relative">
            {/* Left: Nav */}
            <div className="flex items-center gap-8 flex-1">
              <nav className="flex items-center gap-8">
                {menuItems.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      if (item.label === "Shop" || item.label === "Framing") {
                        handleMouseEnter(item.label)
                      }
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      prefetch={item.label === "Art" ? false : undefined}
                      className="group inline-flex flex-col items-center text-xs font-medium tracking-[0.18em] uppercase text-[#3D5C3D]"
                    >
                      <span className="transition-opacity duration-200 group-hover:opacity-80">
                        {item.label}
                      </span>
                      <span className="mt-1 h-px w-8 overflow-hidden">
                        <span className="block h-px w-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-[#3D5C3D]" />
                      </span>
                    </Link>
                  </div>
                ))}
              </nav>
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link href="/">
                <div className="w-96 h-20 relative flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <img
                      src="/main-logo.png"
                      alt="Guzel"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                </div>
              </Link>
            </div>

            {/* Right: Icons */}
            <div className="flex-1 flex items-center justify-end gap-4">
              <button
                className="hidden md:inline-flex w-9 h-9 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                aria-label="Search"
                onClick={() => setIsSearchOpen(true)}
              >
                <motion.span
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Search className="w-4 h-4" />
                </motion.span>
              </button>



              <button
                onClick={openCart}
                className="relative inline-flex w-9 h-9 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                aria-label="Open shopping cart"
              >
                <motion.span
                  whileHover={{ scale: 1.1, rotate: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <ShoppingBag className="w-4 h-4" />
                </motion.span>
                {items.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#FFF9EF] text-[#3D5C3D] text-[0.6rem] font-semibold px-1">
                    {items.length > 9 ? "9+" : items.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {(hoveredMenu === "Shop" || hoveredMenu === "Framing") && (
            <MegaMenu
              category={hoveredMenu}
              onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current)
              }}
              onMouseLeave={handleMouseLeave}
              onLinkClick={handleCloseMenu}
            />
          )}
        </AnimatePresence>

      </motion.header>

      {/* Mobile Fullscreen Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={menuItems}
        onSearch={() => setIsSearchOpen(true)}
        onCart={openCart}
        cartCount={items.length}
      />

      {/* Search Mega Menu */}
      <SearchMegaMenu
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  )
}
