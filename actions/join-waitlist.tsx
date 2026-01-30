"use server"

import { Resend } from "resend"
import { WaitlistEmailTemplate } from "@/components/emails/WaitlistEmailTemplate"

// Initialize Resend with API Key
// TODO: Replace with your actual API Key or environment variable
const resend = new Resend("re_dnB4L69u_EKTSaTKwrP3FSVCrBfHpPYVa")

export async function joinWaitlist(email: string) {
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
                date={date}
            />
        )

        // Send email to Admin
        const adminEmail = await resend.emails.send({
            from: "Guzel Art <onboarding@resend.dev>",
            to: "xyzabc07005@gmail.com", // Keeping consistent with place-order.tsx
            subject: `New Waitlist Signup - ${email}`,
            react: emailContent,
        })

        if (adminEmail.error) {
            console.error("Resend Error:", adminEmail.error)
            return { success: false, error: adminEmail.error.message }
        }

        return { success: true }
    } catch (error) {
        console.error("Join Waitlist Error:", error)
        return { success: false, error: "Failed to join waitlist" }
    }
}
