"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import Link from "next/link"
import { useCartStore } from "@/store/useCartStore"
import { usePathname } from "next/navigation"

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isCartOpen = useCartStore((state) => state.isOpen)
  // Art universe has its own scroll controls (R3F)
  const isArtUniverse = pathname === "/art-universe"

  useEffect(() => {
    if (isArtUniverse) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxury "Heavy" Ease
      smoothWheel: true,
    })

    if (isCartOpen) {
      lenis.stop()
    }

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [isArtUniverse, isCartOpen])

  return <>{children}</>
}
