"use server"

import { Resend } from "resend"
import { OrderConfirmationEmail } from "@/components/emails/OrderConfirmationTemplate"
import { CheckoutFormData } from "@/store/useCartStore"
import { CartItem } from "@/store/useCartStore"

// Initialize Resend with API Key
// TODO: Replace with your actual API Key
const resend = new Resend("re_YPmUvPSm_GjmfgnWaiJJR1Yj4qyUCn7kZ") // 🔴 REPLACE THIS WITH YOUR ACTUAL API KEY

interface PlaceOrderParams {
    items: CartItem[]
    details: CheckoutFormData
    total: number
}

export async function placeOrder({ items, details, total }: PlaceOrderParams) {
    try {
        const orderId = Math.random().toString(36).substring(7).toUpperCase()
        const date = new Date().toLocaleDateString("en-PK", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })

        const checkoutItems = items.map(item => ({
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            frame: item.frame,
            size: item.size,
            mount: item.mount,
            thumbnail: item.thumbnail
        }))

        // Prepare email content
        const emailContent = (
            <OrderConfirmationEmail
                orderId={orderId}
                customerName={`${details.firstName} ${details.lastName}`}
                email={details.email}
                phone={details.phone}
                address={details.address}
                city={details.city}
                items={checkoutItems}
                total={total}
                date={date}
                paymentMethod={details.paymentMethod}
            />
        )

        // Send email to Admin
        const adminEmail = await resend.emails.send({
            from: "Guzel Art <onboarding@resend.dev>",
            to: "guzel.printmallislamabad@gmail.com", // 🔴 Testing only: Must match your Resend account email
            subject: `New Order #${orderId} - ${details.firstName} ${details.lastName}`,
            react: emailContent,
        })

        if (adminEmail.error) {
            console.error("Resend Error:", adminEmail.error)
            return { success: false, error: adminEmail.error.message }
        }

        // Optionally send to customer as well
        // await resend.emails.send({ ... })

        return { success: true, orderId }
    } catch (error) {
        console.error("Place Order Error:", error)
        return { success: false, error: "Failed to place order" }
    }
}
