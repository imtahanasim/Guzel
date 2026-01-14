"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"

const FAQS = [
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to selected countries including the UK, USA, and UAE. International shipping typically takes 7-14 business days via DHL Express."
    },
    {
        question: "What is your typical turnaround time?",
        answer: "For custom framing orders within Pakistan, our standard turnaround is 5-7 business days. Complex museum-grade projects may take up to 14 days."
    },
    {
        question: "How do I measure my art correctly?",
        answer: "Measure the exact width and height of the visible image area. Do not include any borders you want to hide. If you want a mat board (mount), giving us the exact image size is best."
    },
    {
        question: "Do you offer corporate framing services?",
        answer: "Absolutely. We specialize in B2B projects for hotels, offices, and galleries. Please select 'Corporate Order' in the contact form for a dedicated consultation."
    }
]

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <div className="w-full py-20">
            <h3 className="text-3xl font-serif text-[#3D5C3D] mb-12">Common Questions.</h3>

            <div className="space-y-0">
                {FAQS.map((faq, index) => (
                    <FAQItem
                        key={index}
                        faq={faq}
                        isOpen={openIndex === index}
                        onToggle={() => setOpenIndex(prev => prev === index ? null : index)}
                    />
                ))}
                {/* Final Border */}
                <div className="border-b border-[#3D5C3D]/10"></div>
            </div>
        </div>
    )
}

function FAQItem({ faq, isOpen, onToggle }: { faq: any, isOpen: boolean, onToggle: () => void }) {
    return (
        <div className="border-t border-[#3D5C3D]/10">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-6 group hover:bg-[#3D5C3D]/5 transition-colors px-2 -mx-2 rounded-sm"
            >
                <span className="text-lg font-medium text-[#1a1a1a]">{faq.question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#3D5C3D] opacity-60 group-hover:opacity-100"
                >
                    <Plus className="w-6 h-6" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 text-[#1a1a1a]/70 leading-relaxed max-w-2xl px-2">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
