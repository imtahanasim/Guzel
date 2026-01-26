
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ContactForm from "@/components/contact/ContactForm"
import LivingCanvas from "@/components/contact/LivingCanvas"
import FAQSection from "@/components/contact/FAQSection"

// Animation Variants for Staggered Entrance
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const canvasVariants = {
    hidden: { x: 50, opacity: 0 },
    show: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            mass: 1,
            damping: 20,
            delay: 0.4
        }
    }
}

export default function ContactPage() {
    // Shared State for Interactivity
    const [isTyping, setIsTyping] = useState(false)

    // Handle Success (passed to form, although visual feedback is inside form now)
    const handleSuccess = () => {
        // Can add page level success logic if needed
    }

    return (
        <div className="min-h-screen bg-[#fdfcf6] text-[#1a1a1a] selection:bg-[#3D5C3D] selection:text-white overflow-hidden relative">

            {/* Global Noise Texture */}
            <div className="fixed inset-0 opacity-40 pointer-events-none z-0 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/felt.png')]"></div>

            <motion.div
                className="relative z-10 pt-32 lg:pt-40"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >

                {/* --- SPLIT SECTION: Form & Canvas --- */}
                <div className="container mx-auto px-6 mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                        {/* LEFT COLUMN: Scrollable Content */}
                        <div className="flex flex-col">
                            {/* Header */}
                            <motion.div className="mb-16" variants={itemVariants}>
                                <h1 className="text-6xl md:text-7xl font-serif text-[#3D5C3D] mb-6 tracking-tight">
                                    Commission <br /> a Piece.
                                </h1>
                                <p className="text-xl md:text-2xl text-[#1a1a1a]/60 font-sans max-w-md leading-relaxed">
                                    Share your vision. We handcraft every frame to honor the story within.
                                </p>
                            </motion.div>

                            {/* Interactive Form */}
                            <motion.div className="mb-12" variants={itemVariants}>
                                <ContactForm
                                    onTypingStart={() => setIsTyping(true)}
                                    onTypingEnd={() => setIsTyping(false)}
                                    onMessageChange={() => { }}
                                    onSuccess={handleSuccess}
                                />
                            </motion.div>
                        </div>


                        {/* RIGHT COLUMN: The Living Canvas */}
                        <div className="hidden lg:block relative pointer-events-none z-20">
                            <div className="sticky top-28 h-auto flex items-start justify-center border-l border-[#3D5C3D]/10 pl-12 -ml-12">
                                <motion.div variants={canvasVariants} className="w-full">
                                    <LivingCanvas isTyping={isTyping} />
                                </motion.div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* --- CENTERED SECTIONS --- */}

                {/* FAQ Section (Centered) */}
                <motion.div
                    variants={itemVariants}
                    className="container mx-auto px-6 max-w-4xl mb-32"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif text-[#3D5C3D] mb-4">Common Questions</h2>
                        <div className="w-16 h-1 bg-[#3D5C3D]/20 mx-auto rounded-full"></div>
                    </div>
                    <FAQSection />
                </motion.div>

            </motion.div>
        </div>
    )
}
