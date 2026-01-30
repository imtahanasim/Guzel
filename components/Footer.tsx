"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ArrowRight, CreditCard, Wallet } from "lucide-react"

// Payment Icons Component
const PaymentIcons = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Visa */}
      <div className="flex items-center justify-center w-14 h-9 bg-cream rounded border border-white/20 px-2">
        <span className="text-[10px] font-bold text-[#1434CB] tracking-wider">VISA</span>
      </div>
      {/* Mastercard */}
      <div className="flex items-center justify-center w-14 h-9 bg-cream rounded border border-white/20 px-2">
        <div className="flex items-center gap-0.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] -ml-2"></div>
        </div>
      </div>
      {/* Cash on Delivery */}
      <div className="flex items-center justify-center gap-1.5 w-14 h-9 bg-cream rounded border border-white/20 px-2">
        <Wallet className="w-3.5 h-3.5 text-[#3D5C3D]" />
        <span className="text-[9px] font-semibold text-[#3D5C3D]">COD</span>
      </div>
    </div>
  )
}

// Accordion Component for Mobile
const Accordion = ({
  title,
  children,
  isOpen,
  onToggle,
}: {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}) => {
  return (
    <div className="border-b border-white/20">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-medium">{title}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Footer() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [supportOpen, setSupportOpen] = useState(false)
  const [theStudioOpen, setTheStudioOpen] = useState(false)
  const [studioOpen, setStudioOpen] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setEmailError("Please enter your email")
      return
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }
    setEmailError("")
    // Handle newsletter subscription here
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  const supportLinks = [
    { label: "Shipping & Delivery", href: "/policies?tab=shipping" },
    { label: "Track My Order", href: "https://merchantapi.leopardscourier.com/track" },
    { label: "Refund Policy", href: "/policies?tab=returns" },
    { label: "Privacy Policy", href: "/policies?tab=privacy" },
    { label: "Terms of Service", href: "/policies?tab=terms" },
  ]

  const theStudioLinks = [
    { label: "Our Story", href: "/about" },
    { label: "Visit the Studio", href: "/visit-studio" },
    { label: "B2B/Corporate Orders", href: "/contact" },
    { label: "Contact Us", href: "/contact" },
  ]

  const studioLinks = [
    { label: "About Us", href: "/about" },
    { label: "guzel.printmallislamabad@gmail.com", href: "mailto:guzel.printmallislamabad@gmail.com" },
    { label: "Instagram", href: "https://www.instagram.com/guzel.byprintmall/" },
  ]

  return (
    <footer className="bg-[#3D5C3D] text-[#FFF9EF]">
      <div className="container mx-auto px-4 py-16 md:py-20 mt-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 lg:gap-x-8 mb-12">
          {/* Column 1: Brand & Ethos (Spans 3 cols) */}
          <div className="space-y-4 lg:col-span-3">
            <h3 className="font-serif text-3xl md:text-4xl">Guzel.</h3>
            <p className="text-sm text-[#FFF9EF]/90 leading-relaxed max-w-xs">
              Güzel is a handcrafted framing studio creating timeless pieces that capture beauty in every form; turning art, memories, and emotions into frames that bring warmth, elegance, and meaning to every space.
            </p>
          </div>

          {/* Mobile Accordions (Hidden on Desktop) */}
          <div className="md:hidden col-span-1 space-y-2">
            <Accordion
              title="Customer Care"
              isOpen={supportOpen}
              onToggle={() => setSupportOpen(!supportOpen)}
            >
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#FFF9EF]/80 hover:text-[#FFF9EF] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion>
            <Accordion
              title="The Studio"
              isOpen={theStudioOpen}
              onToggle={() => setTheStudioOpen(!theStudioOpen)}
            >
              <ul className="space-y-3">
                {theStudioLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#FFF9EF]/80 hover:text-[#FFF9EF] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion>
            <Accordion
              title="Connect"
              isOpen={studioOpen}
              onToggle={() => setStudioOpen(!studioOpen)}
            >
              <ul className="space-y-3">
                {studioLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#FFF9EF]/80 hover:text-[#FFF9EF] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion>
          </div>

          {/* Desktop Links Wrapper (Spans 5 cols, starts at col 5 for spacing) */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:col-span-6 lg:col-start-5">
            {/* Column 2: Support */}
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
                Customer Care
              </h4>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#FFF9EF]/80 hover:text-[#FFF9EF] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: The Studio */}
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
                The Studio
              </h4>
              <ul className="space-y-3">
                {theStudioLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#FFF9EF]/80 hover:text-[#FFF9EF] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Connect */}
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
                Connect
              </h4>
              <ul className="space-y-3">
                {studioLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#FFF9EF]/80 hover:text-[#FFF9EF] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 5: Newsletter (Spans 3 cols) */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Join the List
            </h4>
            <form onSubmit={handleEmailSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError("")
                  }}
                  placeholder="your@email.com"
                  className="w-full bg-transparent border-0 border-b border-[#FFF9EF]/30 pb-2 pr-10 text-sm text-[#FFF9EF] placeholder:text-[#FFF9EF]/50 focus:outline-none focus:border-[#FFF9EF]/60 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-2 p-1 hover:opacity-70 transition-opacity"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {emailError && (
                <p className="text-xs text-red-300">{emailError}</p>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8"></div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#FFF9EF]/70">
            © 2026 Guzel Art Studio
          </p>
          <PaymentIcons />
        </div>
      </div>
    </footer>
  )
}
