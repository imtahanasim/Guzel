"use client"

import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { z } from "zod"
import { sendContactMessage } from "@/actions/send-contact-message"
import { ArrowRight, Loader2, ChevronDown } from "lucide-react"

// --- Schema ---
const ContactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    inquiryType: z.string().min(1, "Please select an inquiry type"),
    timeline: z.string().min(1, "Please select a timeline"),
    message: z.string().min(10, "Message must be at least 10 characters")
})

type ContactFormData = z.infer<typeof ContactSchema>

interface ContactFormProps {
    onTypingStart: () => void
    onTypingEnd: () => void
    onMessageChange: (length: number) => void
    onSuccess: () => void
}

export default function ContactForm({ onTypingStart, onTypingEnd, onMessageChange, onSuccess }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [serverError, setServerError] = useState("")

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm<ContactFormData>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            name: "",
            email: "",
            inquiryType: "",
            timeline: "",
            message: ""
        }
    })

    // Watch message for length updates
    const messageValue = watch("message", "")

    // Update parent when message changes
    // We use useEffect or just call it in render? Ideally in an effect to avoid render loop if setting state.
    // Actually, handle in onChange better. But react-hook-form register handles onChange.
    // Let's use an effect on the watched value.
    // OR just wrap the onChange handler.

    // Wrapper for Server Action
    // Wrapper for Server Action
    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true)
        setServerError("")
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => formData.append(key, value))
        try {
            // @ts-ignore
            const result = await sendContactMessage(null, formData)
            if (result.success) onSuccess()
            else setServerError(result.message || "Something went wrong.")
        } catch (e) {
            setServerError("Network error.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">

            {/* NAME & EMAIL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <GalleryInput
                    label="Your Name"
                    id="name"
                    placeholder="e.g. Taha Nasim"
                    error={errors.name?.message}
                    {...register("name")}
                />
                <GalleryInput
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="taha@example.com"
                    error={errors.email?.message}
                    {...register("email")}
                />
            </div>

            {/* INQUIRY TYPE (Custom Select) */}
            <Controller
                control={control}
                name="inquiryType"
                render={({ field }) => (
                    <GallerySelect
                        label="Inquiry Type"
                        options={["Custom Frame", "Corporate Order", "Collaboration", "Other"]}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.inquiryType?.message}
                    />
                )}
            />

            {/* TIMELINE (Custom Select) */}
            <Controller
                control={control}
                name="timeline"
                render={({ field }) => (
                    <GallerySelect
                        label="Timeline"
                        options={["ASAP (Urgent)", "Flexible", "Gift Deadline", "Event Specific"]}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.timeline?.message}
                    />
                )}
            />

            {/* MESSAGE */}
            <div className={`relative group space-y-2 ${errors.message ? "animate-shake" : ""}`}>
                <label
                    className={`block text-xs uppercase tracking-widest font-serif transition-colors duration-300 ${errors.message ? "text-red-500" : "text-[#3D5C3D]/80"}`}
                >
                    Message {errors.message && "*"}
                </label>
                <textarea
                    placeholder="Tell us about your masterpiece..."
                    rows={4}
                    className="w-full bg-transparent border-b border-[#d4d4d4] py-2 font-serif text-xl text-[#1a1a1a] focus:outline-none focus:border-[#3e523f] focus:border-b-2 transition-all resize-none rounded-none placeholder:text-[#1a1a1a]/20"
                    onFocus={onTypingStart}
                    {...register("message", {
                        onChange: (e) => onMessageChange(e.target.value.length),
                        onBlur: onTypingEnd
                    })}
                />
                {errors.message && (
                    <span className="text-red-500 text-xs font-serif absolute -bottom-6 left-0">
                        {errors.message.message}
                    </span>
                )}
            </div>

            {/* Server Error */}
            {serverError && (
                <div className="text-red-500 font-serif text-sm text-center">
                    {serverError}
                </div>
            )}

            {/* Submit Button */}
            <div className="pt-8 w-full">
                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full relative group bg-[#3D5C3D] text-[#fdfcf6] h-16 text-sm font-bold uppercase tracking-[0.2em] transition-all disabled:opacity-50 overflow-hidden"
                >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? "Sending..." : "Send to Studio"}
                        {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                    </span>
                    {/* Liquid Fill */}
                    <div className="absolute inset-0 bg-[#2a402a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                </motion.button>
            </div>

        </form>
    )
}

// --- High-End Gallery Input ---
const GalleryInput = React.forwardRef<HTMLInputElement, any>(({ label, id, error, ...props }, ref) => {
    return (
        <motion.div
            className="w-full relative group space-y-2"
            animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
        >
            <label
                htmlFor={id}
                className={`block text-xs uppercase tracking-widest font-serif transition-colors duration-300 ${error ? "text-red-500" : "text-[#3D5C3D]/80"}`}
            >
                {label} {error && "*"}
            </label>
            <input
                ref={ref}
                id={id}
                className="w-full bg-transparent border-b border-[#d4d4d4] py-2 font-serif text-xl text-[#1a1a1a] focus:outline-none focus:border-[#3e523f] focus:border-b-2 transition-all rounded-none placeholder:text-[#1a1a1a]/20"
                {...props}
            />
            {error && (
                <span className="text-red-500 text-xs font-serif absolute -bottom-6 left-0">
                    {error}
                </span>
            )}
        </motion.div>
    )
})
GalleryInput.displayName = "GalleryInput"

// --- Custom Gallery Select ---
function GallerySelect({ label, options, value, onChange, error }: any) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.div
            className="relative w-full space-y-2"
            animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
        >
            {/* Label */}
            <label className={`block text-xs uppercase tracking-widest font-serif transition-colors duration-300 ${error ? "text-red-500" : "text-[#3D5C3D]/80"}`}>
                {label} {error && "*"}
            </label>

            {/* Trigger */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-transparent border-b ${isOpen ? "border-[#3e523f] border-b-2" : "border-[#d4d4d4]"} py-2 font-serif text-xl text-[#1a1a1a] cursor-pointer flex justify-between items-center transition-all`}
            >
                <span className={value ? "text-[#1a1a1a]" : "text-[#1a1a1a]/20"}>
                    {value || "Select..."}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop to close */}
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

                        {/* Menu */}
                        <motion.ul
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-50 w-full bg-cream shadow-xl mt-2 border border-[#d4d4d4]/20 max-h-60 overflow-y-auto"
                        >
                            {options.map((option: string) => (
                                <li
                                    key={option}
                                    onClick={() => {
                                        onChange(option)
                                        setIsOpen(false)
                                    }}
                                    className="px-6 py-4 font-serif text-lg cursor-pointer hover:bg-[#3e523f] hover:text-white transition-colors"
                                >
                                    {option}
                                </li>
                            ))}
                        </motion.ul>
                    </>
                )}
            </AnimatePresence>
            {error && (
                <span className="text-red-500 text-xs font-serif absolute -bottom-6 left-0">
                    {error}
                </span>
            )}
        </motion.div>
    )
}
