"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Globe } from "lucide-react"

export default function GlobalTimeFooter() {
    const [times, setTimes] = useState({
        islamabad: "",
        newYork: "",
        london: ""
    })

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()

            setTimes({
                islamabad: now.toLocaleTimeString("en-US", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit" }),
                newYork: now.toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "2-digit", minute: "2-digit" }),
                london: now.toLocaleTimeString("en-US", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" })
            })
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full border-t border-[#3D5C3D]/10 py-12 mt-20">
            <div className="flex flex-wrap items-center justify-between gap-8 font-mono text-sm uppercase tracking-widest text-[#3D5C3D]/60">

                {/* Islamabad (Main) */}
                <div className="flex items-center gap-3 text-[#3D5C3D]">
                    {/* Rotating Globe Icon */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                        <Globe className="w-4 h-4" />
                    </motion.div>
                    <span className="font-bold">Islamabad {times.islamabad}</span>
                </div>

                {/* Other Cities */}
                <div className="flex items-center gap-8">
                    <span>New York {times.newYork}</span>
                    <span>London {times.london}</span>
                </div>

            </div>
        </div>
    )
}
