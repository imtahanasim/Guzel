"use client"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { X } from "lucide-react"

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    menuItems: { label: string; href: string }[]
    onSearch: () => void
    onCart: () => void
    cartCount: number
}

export default function MobileMenu({ isOpen, onClose, menuItems, onSearch, onCart, cartCount }: MobileMenuProps) {

    // Animation Variants
    const menuVariants = {
        initial: { x: "100%" },
        animate: {
            x: "0%",
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }
        },
        exit: {
            x: "100%",
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    const containerVariants = {
        initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
        animate: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants = {
        initial: { opacity: 0, x: -20 },
        animate: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop (Optional darken) */}
                    {/* <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden"
                        onClick={onClose}
                    /> */}

                    <motion.div
                        className="fixed inset-0 z-50 flex flex-col h-full w-full bg-[#fdfcf6] lg:hidden"
                        variants={menuVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {/* --- 1. DRAWER HEADER --- */}
                        <div className="flex justify-between items-center px-6 py-6 border-b border-[#3D5C3D]/10 shrink-0 h-20">
                            <Link href="/" onClick={onClose} className="relative w-32 h-12">
                                <Image
                                    src="/logo.png"
                                    alt="Guzel"
                                    fill
                                    className="object-contain object-left"
                                />
                            </Link>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center text-[#3D5C3D] hover:rotate-90 transition-transform duration-300"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        {/* --- 2. NAVIGATION LINKS --- */}
                        <motion.div
                            className="flex-1 flex flex-col py-4 overflow-y-auto"
                            variants={containerVariants}
                            initial="initial"
                            animate="animate"
                        >
                            {menuItems.map((item) => (
                                <motion.div key={item.label} variants={itemVariants}>
                                    <Link
                                        href={item.href}
                                        onClick={onClose}
                                        className="block w-full px-8 py-5 border-b border-[#3D5C3D]/10 font-sans text-xl uppercase tracking-[0.2em] text-[#3D5C3D] hover:bg-[#3D5C3D]/5 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* --- HEADER OPTIONS (Search, Shop, Cart) --- */}

                            {/* Search */}
                            <motion.div variants={itemVariants}>
                                <button
                                    onClick={() => { onClose(); onSearch(); }}
                                    className="block w-full px-8 py-5 border-b border-[#3D5C3D]/10 font-sans text-xl uppercase tracking-[0.2em] text-[#3D5C3D] hover:bg-[#3D5C3D]/5 transition-colors text-left"
                                >
                                    Search
                                </button>
                            </motion.div>



                            {/* Bag */}
                            <motion.div variants={itemVariants}>
                                <button
                                    onClick={() => { onClose(); onCart(); }}
                                    className="block w-full px-8 py-5 border-b border-[#3D5C3D]/10 font-sans text-xl uppercase tracking-[0.2em] text-[#3D5C3D] hover:bg-[#3D5C3D]/5 transition-colors text-left"
                                >
                                    Bag {cartCount > 0 && <span className="text-sm align-top font-bold ml-2">({cartCount})</span>}
                                </button>
                            </motion.div>

                        </motion.div>

                        {/* --- 3. UTILITY FOOTER --- */}
                        <div className="shrink-0 px-8 py-8 bg-[#fdfcf6] border-t border-[#3D5C3D]/10">
                            {/* Row B: Socials */}
                            <div className="flex gap-4">
                                {["IG", "FB"].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="w-10 h-10 rounded-full border border-[#3D5C3D]/20 flex items-center justify-center text-xs font-medium text-[#3D5C3D] hover:bg-[#3D5C3D] hover:text-[#FFF9EF] transition-colors"
                                    >
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
