"use client"
import { motion } from "framer-motion"

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[40] bg-[#fdfcf6] flex items-center justify-center">
            {/* Simple visual fallback if standard navigation is slow. 
                 The Template Transition will obscure this anyway, which is desired.
                 This ensures the browser sees 'something' new immediately. 
             */}
        </div>
    )
}
