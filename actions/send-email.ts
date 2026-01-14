"use server"

import { z } from "zod"

const ContactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    inquiryType: z.string().min(1, "Please select an inquiry type"),
    timeline: z.string().min(1, "Please select a timeline"),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function sendEmail(prevState: any, formData: FormData) {
    // Artificial delay to show off the animation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const validatedFields = ContactSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        inquiryType: formData.get("inquiryType"),
        timeline: formData.get("timeline"),
        message: formData.get("message"),
    })

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Please check your inputs.",
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Here you would implement your actual email provider logic (Resend, SendGrid, etc.)
    // for now, we simulate success.

    console.log("Email Sent:", validatedFields.data)

    return {
        success: true,
        message: "Message sent! We'll be in touch shortly.",
    }
}
