"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useCartStore } from "@/store/useCartStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { RadioGroup, RadioCard } from "@/components/ui/radio-group"
import CheckoutOrderSummary from "@/components/CheckoutOrderSummary"
import { CreditCard, Truck, Loader2 } from "lucide-react"

// Pakistani cities
const PAKISTANI_CITIES = [
  "Islamabad",
  "Lahore",
  "Karachi",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Sargodha",
  "Bahawalpur",
  "Sukkur",
  "Larkana",
  "Sheikhupura",
  "Rahim Yar Khan",
  "Jhang",
  "Gujrat",
  "Kasur",
]

// Form validation schema
const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
  city: z.string().min(1, "Please select a city"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  paymentMethod: z.enum(["card", "cod"], {
    required_error: "Please select a payment method",
  }),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const setCheckoutFormData = useCartStore((state) => state.setCheckoutFormData)
  const [isProcessing, setIsProcessing] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "cod",
    },
  })

  const paymentMethod = watch("paymentMethod")

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF9EF] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-[#3D5C3D] mb-4">
            Your cart is empty
          </h1>
          <Link href="/shop">
            <Button className="bg-[#3e523f] text-[#fdfcf6] hover:bg-[#2c3a2d]">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setCheckoutFormData(data)
    router.push("/checkout/confirm")
  }

  return (
    <div className="min-h-screen bg-[#FFF9EF]">


      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Form */}
          <div className="space-y-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Section */}
              <section>
                <h2 className="font-serif text-2xl text-[#3D5C3D] mb-6">
                  Contact
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#3D5C3D] mb-2"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Shipping Address Section */}
              <section>
                <h2 className="font-serif text-2xl text-[#3D5C3D] mb-6">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-[#3D5C3D] mb-2"
                      >
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-[#3D5C3D] mb-2"
                      >
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-[#3D5C3D] mb-2"
                    >
                      Phone <span className="text-gray-500">(Required)</span>
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="03001234567"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-[#3D5C3D] mb-2"
                    >
                      City
                    </label>
                    <Select
                      id="city"
                      {...register("city")}
                    >
                      <option value="">Select a city</option>
                      {PAKISTANI_CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </Select>
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-[#1e1e1e] mb-2"
                    >
                      Address
                    </label>
                    <Textarea
                      id="address"
                      placeholder="House number, street, area..."
                      rows={4}
                      {...register("address")}
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Payment Method Section */}
              <section>
                <h2 className="font-serif text-2xl text-[#3D5C3D] mb-6">
                  Payment Method
                </h2>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) =>
                    setValue("paymentMethod", value as "card" | "cod")
                  }
                >
                  <RadioCard value="card">
                    <div className="flex items-center gap-4">
                      <CreditCard className="w-6 h-6 text-[#3e523f]" />
                      <div>
                        <div className="font-medium text-[#3D5C3D]">
                          Credit/Debit Card
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Visa, Mastercard
                        </div>
                      </div>
                    </div>
                  </RadioCard>
                  <RadioCard value="cod">
                    <div className="flex items-center gap-4">
                      <Truck className="w-6 h-6 text-[#3e523f]" />
                      <div>
                        <div className="font-medium text-[#3D5C3D]">
                          Cash on Delivery
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Pay when you receive
                        </div>
                      </div>
                    </div>
                  </RadioCard>
                </RadioGroup>
                {errors.paymentMethod && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.paymentMethod.message}
                  </p>
                )}
              </section>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#3e523f] text-[#fdfcf6] hover:bg-[#2c3a2d] h-12 text-base font-sans rounded-none"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : paymentMethod === "cod" ? (
                  "Complete Order - Pay on Delivery"
                ) : (
                  "Pay Securely"
                )}
              </Button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-24">
            <CheckoutOrderSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
