"use server"

import { Resend } from "resend"
import { WaitlistEmailTemplate } from "@/components/emails/WaitlistEmailTemplate"

// Initialize Resend with API Key
// TODO: Replace with your actual API Key or environment variable
const resend = new Resend("re_YPmUvPSm_GjmfgnWaiJJR1Yj4qyUCn7kZ")

export async function joinWaitlist(email: string, phone?: string) {
    try {
        const date = new Date().toLocaleDateString("en-PK", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })

        // Prepare email content
        const emailContent = (
            <WaitlistEmailTemplate
                email={email}
                phone={phone}
                date={date}
            />
        )

        // Send email to Admin
        const adminEmail = await resend.emails.send({
            from: "Guzel Art <onboarding@resend.dev>",
            to: "guzel.printmallislamabad@gmail.com", // Keeping consistent with place-order.tsx
            subject: `Waitlist Confirmation: ${email}`,
            react: emailContent,
            text: `New waitlist signup confirmed for ${email} ${phone ? `(Phone: ${phone})` : ""} on ${date}.`,
            replyTo: email,
        })

        if (adminEmail.error) {
            console.error("Resend Error:", adminEmail.error)
            return { success: false, error: adminEmail.error.message }
        }

        return { success: true, id: adminEmail.data?.id }
    } catch (error) {
        console.error("Join Waitlist Error:", error)
        return { success: false, error: "Failed to join waitlist" }
    }
}
