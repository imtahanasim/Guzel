"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollText } from "lucide-react"
import { useSearchParams } from "next/navigation"

type TabId = "shipping" | "returns" | "privacy" | "terms"

interface PolicyContent {
    title: string
    content: string
}

const policies: Record<TabId, PolicyContent> = {
    shipping: {
        title: "Shipping & Delivery",
        content: `We ship via trusted couriers from our Islamabad workshop. Please allow 3-5 days for handling archival glass and custom framing orders.

Every piece is packaged with museum-grade protective materials to ensure it arrives in pristine condition. We offer standard and express shipping options calculated at checkout based on your location.

For international orders, please note that customs duties and taxes may apply and are the responsibility of the recipient.`,
    },
    returns: {
        title: "Returns & Exchanges",
        content: `As each piece is custom framed to your specifications, we cannot accept returns unless the item is damaged in transit.

If your order arrives damaged, please photograph the packaging and the artwork immediately and contact us within 24 hours of delivery. We will arrange for a replacement or repair at no additional cost to you.

For standard non-customized items, returns are accepted within 14 days of delivery, provided they are in original condition.`,
    },
    privacy: {
        title: "Privacy Policy",
        content: `Your data is kept within the studio walls. We respect your privacy and are committed to protecting your personal information.

We only collect information necessary to process your order and improve your experience. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.

This policy applies to information collected through our website and studio interactions.`,
    },
    terms: {
        title: "Terms & Conditions",
        content: `By commissioning a frame or purchasing artwork, you agree to these terms. All designs and content on this site are the intellectual property of Guzel.

We reserve the right to modify these terms at any time. Prices and availability of products are subject to change without notice.

We strive to display colors and textures as accurately as possible, but screen variations may occur.`,
    },
}

export default function PolicyPage() {
    const searchParams = useSearchParams()
    const [activeTab, setActiveTab] = useState<TabId>("shipping")

    useEffect(() => {
        const tab = searchParams.get("tab") as TabId
        if (tab && Object.keys(policies).includes(tab)) {
            setActiveTab(tab)
        }
    }, [searchParams])

    return (
        <div className="min-h-screen bg-[#FFF9EF] relative overflow-hidden flex flex-col md:flex-row font-serif text-[#3e523f]">
            {/* Grain Texture Overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    filter: "contrast(120%) brightness(100%)",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Left Column: Sticky Navigation */}
            <nav className="w-full md:w-1/3 lg:w-1/4 p-8 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-[#3e523f]/10 relative z-10 md:h-screen md:sticky md:top-0 flex flex-col justify-center">
                <div className="mb-12 hidden md:block">
                    <h1 className="text-2xl font-bold tracking-widest uppercase">
                        The Ledger
                    </h1>
                    <p className="text-sm text-[#3e523f]/60 mt-2 font-sans tracking-wide">
                        Studio Policies & Protocols
                    </p>
                </div>

                <div className="space-y-2">
                    {(Object.keys(policies) as TabId[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="group relative w-full text-left py-3 px-4 transition-all duration-300 ease-out"
                        >
                            <div className="flex items-center gap-4">
                                {/* Indicator Line */}
                                <motion.div
                                    className={`w-1 h-1 rounded-full bg-[#3A4D39] transition-all duration-300 ${activeTab === tab ? "h-1.5 w-1.5" : "opacity-0"
                                        }`}
                                    layoutId="tabIndicator"
                                />

                                <span
                                    className={`uppercase tracking-widest text-xs md:text-sm transition-all duration-300 ${activeTab === tab
                                        ? "text-[#3A4D39] font-bold translate-x-1"
                                        : "text-stone-400 group-hover:text-[#3e523f]/60"
                                        }`}
                                >
                                    {policies[tab].title}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Right Column: Content Area */}
            <main className="w-full md:w-2/3 lg:w-3/4 min-h-[60vh] md:min-h-screen relative z-10 p-8 md:p-20 flex items-center justify-center">
                <div className="max-w-2xl w-full">
                    {/* Wax Seal Graphic */}
                    <div className="flex justify-center mb-12 opacity-80">
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#3A4D39]/30 flex items-center justify-center">
                            <ScrollText className="w-6 h-6 md:w-8 md:h-8 text-[#3A4D39]" />
                            <div className="absolute inset-0 rounded-full border border-[#3A4D39]/10 scale-125" />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="text-center md:text-left"
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#3A4D39] mb-8 leading-tight">
                                {policies[activeTab].title}
                            </h2>
                            <div className="prose prose-stone prose-lg max-w-none">
                                <p className="font-mono text-stone-600 leading-loose text-sm md:text-base whitespace-pre-line">
                                    {policies[activeTab].content}
                                </p>
                            </div>

                            {/* Decorative Signature Line */}
                            <div className="mt-12 flex items-center justify-center md:justify-start gap-4">
                                <div className="h-px w-16 bg-[#3A4D39]/20" />
                                <span className="font-serif italic text-[#3A4D39]/40 text-sm">Guzel Studio</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}
