import Link from "next/link"
import { Mail, MessageCircle } from "lucide-react"

export default function VisitStudioPage() {
    return (
        <div className="bg-[#fdfcf6] min-h-screen py-20 px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-12">

                {/* Header */}
                <div className="space-y-6">
                    <h1 className="font-serif text-4xl md:text-5xl text-[#3D5C3D]">
                        Visit the Studio
                    </h1>
                    <p className="font-sans text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
                        Experience our craftsmanship firsthand. We welcome visitors by appointment to discuss custom projects or view our curated collection.
                    </p>
                </div>

                {/* Divider */}
                <div className="w-24 h-px bg-[#3D5C3D]/20 mx-auto" />

                {/* Contact Options */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* WhatsApp */}
                    <div className="bg-[#FFF9EF] p-8 rounded-lg border border-[#e6e3d5] shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-[#3D5C3D]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MessageCircle className="w-6 h-6 text-[#3D5C3D]" />
                        </div>
                        <h3 className="font-serif text-2xl text-[#3D5C3D] mb-4">WhatsApp Us</h3>
                        <p className="text-gray-600 mb-6 text-sm">
                            Text us to schedule a visit or ask quick questions.
                        </p>
                        <Link
                            href="https://wa.me/923035241515"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 bg-[#3D5C3D] text-[#FFF9EF] text-sm font-bold uppercase tracking-wider rounded hover:bg-[#2A3F2A] transition-colors"
                        >
                            Chat (+92 303 5241515)
                        </Link>
                    </div>

                    {/* Email */}
                    <div className="bg-[#FFF9EF] p-8 rounded-lg border border-[#e6e3d5] shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-[#3D5C3D]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail className="w-6 h-6 text-[#3D5C3D]" />
                        </div>
                        <h3 className="font-serif text-2xl text-[#3D5C3D] mb-4">Email Us</h3>
                        <p className="text-gray-600 mb-6 text-sm">
                            Send us your requirements or request a calendar slot.
                        </p>
                        <Link
                            href="mailto:guzel.printmallislamabad@gmail.com"
                            className="inline-block px-6 py-3 bg-[#3D5C3D] text-[#FFF9EF] text-sm font-bold uppercase tracking-wider rounded hover:bg-[#2A3F2A] transition-colors"
                        >
                            Send Email
                        </Link>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="pt-8 text-sm text-gray-500">
                    <p>Studio Hours: Monday - Saturday, 11:00 AM - 8:00 PM</p>
                    <p>Islamabad, Pakistan</p>
                </div>

            </div>
        </div>
    )
}
