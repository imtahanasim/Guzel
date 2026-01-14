import { useScroll, Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useState } from "react"
import { motion } from "framer-motion"
import { useArtInteraction } from "./store"

const styles = [
    { label: "Abstract", offset: 0 },
    { label: "Minimalist", offset: 0.33 },
    { label: "Heritage", offset: 0.66 },
    { label: "Botanical", offset: 1.0 },
]

export default function ArtControlsHUD() {
    const scroll = useScroll()
    const { setActiveFilter, activeFilter } = useArtInteraction()
    const [progress, setProgress] = useState(0)

    useFrame(() => {
        setProgress(scroll.offset)
    })

    const handleStyleClick = (style: typeof styles[0]) => {
        // Toggle filter or set it?
        // Let's set it. If already active, maybe toggle off?
        const isSame = activeFilter === style.label
        setActiveFilter(isSame ? null : style.label)

        // Scroll logic (keep it)
        const offset = style.offset
        const el = scroll.el
        const targetTop = offset * (el.scrollHeight - el.clientHeight)
        el.scrollTo({ top: targetTop, behavior: 'smooth' })
    }

    return (
        <Html fullscreen style={{ pointerEvents: 'none', zIndex: 10 }}>
            <div className="fixed bottom-10 left-0 w-full z-50 flex flex-col items-center pointer-events-auto">
                <div className="relative w-full max-w-2xl px-12">
                    {/* The Line */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-cream/20 -z-10" />

                    {/* The Scrubber Progress */}
                    <motion.div
                        className="absolute top-1/2 left-0 h-[2px] bg-cream shadow-[0_0_10px_cream]"
                        style={{ width: `${progress * 100}%` }}
                    />

                    <div className="flex justify-between w-full">
                        {styles.map((style, i) => {
                            const isActive = Math.abs(progress - style.offset) < 0.15
                            return (
                                <button
                                    key={style.label}
                                    onClick={() => handleStyleClick(style)}
                                    className={`relative group flex flex-col items-center gap-2 transition-all duration-300 ${isActive ? 'text-cream' : 'text-cream/40 hover:text-cream/70'}`}
                                >
                                    <div className={`w-3 h-3 rounded-full border border-current bg-black transition-all duration-300 ${isActive ? 'scale-150 bg-cream border-cream' : ''}`} />
                                    <span className="text-xs font-serif tracking-widest uppercase">{style.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Html>
    )
}
