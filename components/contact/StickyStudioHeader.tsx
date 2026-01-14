"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function StickyStudioHeader() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#fdfcf6]/80 border-b border-[#3D5C3D]/5"
        >
            <div className="max-w-[1400px] mx-auto h-20 flex items-center justify-center px-6">
                <Link href="/" className="relative group block">
                    <motion.div
                        whileHover={{ scale: 1.05, opacity: 0.8 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="relative h-10 w-32 md:w-40"
                    >
                        <Image
                            src="/logo1.png"
                            alt="Guzel Studio"
                            fill
                            className="object-contain"
                            priority
                            sizes="(max-width: 768px) 128px, 160px"
                        />
                    </motion.div>
                </Link>
            </div>
        </motion.header>
    )
}
