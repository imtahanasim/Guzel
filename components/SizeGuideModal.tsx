"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Ruler } from "lucide-react"
import Image from "next/image"

interface SizeGuideModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
    if (!isOpen) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        {/* Modal Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#fdfcf6] w-full max-w-2xl rounded-xl shadow-2xl border border-[#3D5C3D]/10 overflow-hidden relative"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-[#3D5C3D]/10 bg-[#FFF9EF]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#3D5C3D]/10 flex items-center justify-center text-[#3D5C3D]">
                                        <Ruler className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="font-serif text-2xl text-[#1e1e1e]">Size Guide</h2>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest">Find your perfect fit</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8 space-y-8">
                                {/* Visual Comparison */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Small */}
                                    <div className="space-y-4 text-center group">
                                        <div className="relative aspect-[3/4] bg-[#e5e0d8] rounded-lg border-4 border-white shadow-md mx-auto w-32 flex items-center justify-center overflow-hidden">
                                            <Image
                                                src="/product-pictures/photo-1568945721269-c998c4cbb043.avif"
                                                alt="Small Size"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute -bottom-6 w-full text-center z-10">
                                                <span className="bg-[#3D5C3D] text-white text-[10px] font-bold px-2 py-1 rounded-full">Small</span>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <h3 className="font-serif text-lg text-[#1e1e1e]">12" x 16"</h3>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                                Perfect for hallways, small nooks, or gallery wall additions.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Medium */}
                                    <div className="space-y-4 text-center group">
                                        <div className="relative aspect-[3/4] bg-[#e5e0d8] rounded-lg border-4 border-white shadow-lg mx-auto w-40 flex items-center justify-center overflow-hidden">
                                            <Image
                                                src="/product-pictures/photo-1725711028446-055093f4c658.avif"
                                                alt="Medium Size"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute -bottom-6 w-full text-center z-10">
                                                <span className="bg-[#3D5C3D] text-white text-[10px] font-bold px-2 py-1 rounded-full">Medium</span>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <h3 className="font-serif text-lg text-[#1e1e1e]">18" x 24"</h3>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                                Our most popular size. Ideal for bedrooms and home offices.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Large */}
                                    <div className="space-y-4 text-center group">
                                        <div className="relative aspect-[3/4] bg-[#e5e0d8] rounded-lg border-4 border-white shadow-xl mx-auto w-48 flex items-center justify-center overflow-hidden">
                                            <Image
                                                src="/product-pictures/premium_photo-1667239474298-844804eca38f.avif"
                                                alt="Large Size"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute -bottom-6 w-full text-center z-10">
                                                <span className="bg-[#3D5C3D] text-white text-[10px] font-bold px-2 py-1 rounded-full">Large</span>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <h3 className="font-serif text-lg text-[#1e1e1e]">24" x 36"</h3>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                                A statement piece. Best suited for living rooms and above sofas.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Comparison Table */}
                                <div className="bg-[#FFF9EF] rounded-lg p-6 border border-[#3D5C3D]/10">
                                    <h4 className="font-serif text-[#3D5C3D] mb-4 text-sm font-bold uppercase tracking-widest">Dimension Details</h4>
                                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                                        <div>
                                            <span className="block font-bold text-[#1e1e1e]">12 x 16"</span>
                                            <span className="text-xs text-gray-500">30 x 40 cm</span>
                                        </div>
                                        <div>
                                            <span className="block font-bold text-[#1e1e1e]">18 x 24"</span>
                                            <span className="text-xs text-gray-500">45 x 60 cm</span>
                                        </div>
                                        <div>
                                            <span className="block font-bold text-[#1e1e1e]">24 x 36"</span>
                                            <span className="text-xs text-gray-500">60 x 91 cm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
