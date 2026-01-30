"use server"

import { Resend } from "resend"
import { z } from "zod"
import { ContactEmailTemplate } from "@/components/emails/ContactEmailTemplate"

// Initialize Resend with API Key
// TODO: Replace with your actual API Key or environment variable
const resend = new Resend("re_YPmUvPSm_GjmfgnWaiJJR1Yj4qyUCn7kZ")

interface ContactFormState {
    success: boolean
    message: string
}

const ContactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    inquiryType: z.string().min(1, "Please select an inquiry type"),
    timeline: z.string().min(1, "Please select a timeline"),
    message: z.string().min(10, "Message must be at least 10 characters")
})

export async function sendContactMessage(prevState: any, formData: FormData): Promise<ContactFormState> {
    try {
        const rawData = {
            name: formData.get("name")?.toString() || "",
            email: formData.get("email")?.toString() || "",
            inquiryType: formData.get("inquiryType")?.toString() || "",
            timeline: formData.get("timeline")?.toString() || "",
            message: formData.get("message")?.toString() || "",
        }

        const validation = ContactSchema.safeParse(rawData)

        if (!validation.success) {
            return {
                success: false,
                message: validation.error.errors[0].message
            }
        }

        const { name, email, inquiryType, timeline, message } = validation.data

        const date = new Date().toLocaleDateString("en-PK", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })

        // Prepare email content
        const emailContent = (
            <ContactEmailTemplate
                name={name}
                email={email}
                inquiryType={inquiryType}
                timeline={timeline}
                message={message}
                date={date}
            />
        )

        // Send email to Admin
        const adminEmail = await resend.emails.send({
            from: "Guzel Art <onboarding@resend.dev>",
            to: "guzel.printmallislamabad@gmail.com", // Keeping consistent with logic
            subject: `New Inquiry from ${name} - ${inquiryType}`,
            react: emailContent,
            replyTo: email, // Allow replying directly to sender
        })

        if (adminEmail.error) {
            console.error("Resend Error:", adminEmail.error)
            return { success: false, message: adminEmail.error.message }
        }

        return { success: true, message: "Message sent successfully!" }
    } catch (error) {
        console.error("Send Contact Message Error:", error)
        return { success: false, message: "Failed to send message." }
    }
}
