"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/store/useCartStore"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { placeOrder } from "@/actions/place-order"

export default function ConfirmOrderPage() {
    const router = useRouter()
    const { items, checkoutFormData, getSubtotal, clearCart } = useCartStore()
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Redirect if no data
    useEffect(() => {
        if (items.length === 0 || !checkoutFormData) {
            router.push("/checkout")
        }
    }, [items, checkoutFormData, router])

    if (!checkoutFormData) return null

    const subtotal = getSubtotal()
    const shipping = 250 // Hardcoded for now, should match previous logic if any
    const total = subtotal + shipping

    const handleConfirmOrder = async () => {
        setIsProcessing(true)
        setError(null)

        try {
            const result = await placeOrder({
                items,
                details: checkoutFormData,
                total,
            })

            if (result.success) {
                // clearCart() - Removed to prevented race condition. Cart is cleared on success page.
                router.push("/checkout/success")
            } else {
                setError(result.error || "Something went wrong")
            }
        } catch (err) {
            setError("Failed to place order")
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#FFF9EF] py-12 px-4">
            <div className="container mx-auto max-w-3xl">
                <Link
                    href="/checkout"
                    className="inline-flex items-center text-[#3D5C3D] hover:underline mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Checkout
                </Link>

                <div className="bg-white p-8 rounded-lg shadow-sm border border-[#e6ebf1]">
                    <h1 className="font-serif text-3xl text-[#3D5C3D] mb-8 text-center">
                        Review Your Order
                    </h1>

                    {/* Customer Details */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h2 className="font-serif text-xl text-[#3D5C3D] mb-4 border-b pb-2">
                                Shipping Information
                            </h2>
                            <div className="space-y-2 text-gray-600">
                                <p className="font-medium text-gray-900">
                                    {checkoutFormData.firstName} {checkoutFormData.lastName}
                                </p>
                                <p>{checkoutFormData.address}</p>
                                <p>{checkoutFormData.city}</p>
                                <p>{checkoutFormData.phone}</p>
                                <p>{checkoutFormData.email}</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl text-[#3D5C3D] mb-4 border-b pb-2">
                                Payment Method
                            </h2>
                            <p className="text-gray-600">
                                {checkoutFormData.paymentMethod === "cod"
                                    ? "Cash on Delivery"
                                    : "Credit/Debit Card"}
                            </p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-8">
                        <h2 className="font-serif text-xl text-[#3D5C3D] mb-4 border-b pb-2">
                            Order Items
                        </h2>
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div
                                    key={`${item.id}-${item.frame}-${item.size}`}
                                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-[#3D5C3D]">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {item.size} / {item.frame}
                                            </p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="text-right font-medium text-[#3D5C3D]">
                                        PKR {(item.price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total */}
                    <div className="bg-[#f9fafb] p-6 rounded-lg mb-8">
                        <div className="flex justify-between mb-2 text-gray-600">
                            <span>Subtotal</span>
                            <span>PKR {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-4 text-gray-600">
                            <span>Shipping</span>
                            <span>PKR {shipping.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-[#3D5C3D] pt-4 border-t border-gray-200">
                            <span>Total</span>
                            <span>PKR {total.toLocaleString()}</span>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <Button
                        onClick={handleConfirmOrder}
                        disabled={isProcessing}
                        className="w-full bg-[#3e523f] text-[#fdfcf6] hover:bg-[#2c3a2d] h-14 text-lg font-sans"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Processing Order...
                            </>
                        ) : (
                            "Confirm & Place Order"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
