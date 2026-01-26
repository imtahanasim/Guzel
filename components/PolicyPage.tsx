"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollText } from "lucide-react"
import { useSearchParams } from "next/navigation"

type TabId = "shipping" | "returns" | "privacy" | "terms"

interface PolicyContent {
    title: string
    content: string | React.ReactNode
}

const policies: Record<TabId, PolicyContent> = {
    shipping: {
        title: "Shipping & Delivery",
        content: (
            <div className="space-y-8 font-sans">
                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">CURBSIDE DELIVERY</h4>
                    <p>Guzel offers curbside delivery only and does not take responsibility for unpacking, installing, or fixing frames within your home or office. Guzel is also not responsible for the disposal of any packaging material or debris resulting from unpacking.</p>
                    <p className="mt-4">If you require help with frame placement, please inform Guzel at the time of order placement. Additional labour can be arranged at an extra charge, applicable only within Islamabad and Rawalpindi, in addition to the standard delivery cost mentioned for your product.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">INCORRECT DELIVERY ADDRESS</h4>
                    <p>Customers are solely responsible for providing accurate and complete delivery address details. Guzel will not be held liable for any delivery delays, product misplacement, or incorrect deliveries resulting from inaccurate, incomplete, or false address information provided by the customer.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">DELIVERY DATES</h4>
                    <p>Most orders placed through our website are completed within 8–12 weeks, unless otherwise stated on the respective product page. All furniture is thoroughly inspected prior to shipping, staging, and release. Shipping methods and providers are carefully selected to ensure the best possible service and experience.</p>
                    <p className="mt-4">The “ship-out” times listed on product pages are realistic estimates based on product type, size, weight, and packaging requirements. Delivery times may vary depending on courier availability and logistical resources, and certain delivery services may not be available in all areas.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">DAMAGED DELIVERY</h4>
                    <p>If your shipment arrives with visible damage, please make a note and take a photo of it in the presence of the delivery driver, then inform us immediately. In case an item is damaged, contact our customer service team for assistance and next steps.</p>
                    <p className="mt-4 italic">Please ensure you verify the product dimensions listed under Product Information on our website before placing your order.</p>
                </section>

                <section className="pt-4 border-t border-[#3A4D39]/10">
                    <p>Once a frame has been delivered, no returns or exchanges are accepted. However, if a delivered item has a defect, our Customer Service team will assist with repairs or replacement. Customers may not request returns or exchanges due to a change of mind after delivery.</p>
                </section>
            </div>
        ),
    },
    returns: {
        title: "Refund Policy",
        content: (
            <div className="space-y-8 font-sans">
                <section>
                    <p className="font-bold text-lg text-[#3A4D39]">Guzel does not accept returns.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">Damages and Issues</h4>
                    <p>Please inspect your order upon delivery and contact us immediately if your item is defective, damaged, or incorrect. This allows us to assess the issue and resolve it promptly.</p>
                    <p className="mt-4">However, items are not eligible for return or exchange if damages are reported after delivery has been completed and inspected. In cases where an exchange is approved, the customer is responsible for the cost of returning the original product.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">Exceptions / Non-returnable Items</h4>
                    <p>Certain products are non-returnable, including custom orders or personalized items. We also do not accept returns if the customer finds that the product dimensions do not suit their space.</p>
                    <p className="mt-4">It is the customer’s responsibility to review and confirm the exact dimensions of a product before placing an order. All dimensions are provided in the Product Information section on our website.</p>
                    <p className="mt-4 italic text-[#3A4D39]/80 underline decoration-[#3A4D39]/20">Please note that sale items and gift cards are non-returnable and non-refundable.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">Exchanges</h4>
                    <p>Guzel does not offer exchanges on any items. For further assistance, please contact our customer support team.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">Refunds</h4>
                    <p>Once we receive and inspect your claim, we will notify you regarding approval. If your claim is approved, our customer support team will contact you to discuss the next steps.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">Cancellation Policy</h4>
                    <p>Once an item has been shipped, it cannot be cancelled. Custom and special order items may only be cancelled within 24 hours of placing the order. After this period, cancellations for such orders are not possible.</p>
                </section>
            </div>
        ),
    },
    privacy: {
        title: "Privacy Policy",
        content: (
            <div className="space-y-8 font-sans">
                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">OUR COMMITMENT</h4>
                    <p>Your data is kept within the studio walls. We respect your privacy and are committed to protecting your personal information.</p>
                </section>

                <section>
                    <h4 className="text-xl font-bold text-[#3A4D39] mb-4">DATA COLLECTION</h4>
                    <p>We only collect information necessary to process your order and improve your experience. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>
                </section>

                <section className="pt-8 border-t border-[#3A4D39]/10">
                    <p className="italic text-[#3A4D39]/70">This policy applies to information collected through our website and studio interactions.</p>
                </section>
            </div>
        ),
    },
    terms: {
        title: "Terms of Service",
        content: (
            <div className="space-y-8 font-sans">
                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">OVERVIEW</h4>
                    <p>This website is operated by Guzel by Printmall Islamabad. Throughout the site, the terms “we,” “us,” and “our” refer to Guzel. Guzel provides this website, along with all its information, tools, and services, to you—the user—on the condition that you accept all the terms, conditions, policies, and notices stated here.</p>
                    <p className="mt-4">By accessing our website and/or purchasing from us, you engage in our “Service” and agree to be bound by the following Terms of Service (“Terms”). These Terms also include any additional terms, conditions, or policies referenced here or available by hyperlink. They apply to all users of the website, including, but not limited to, browsers, vendors, customers, merchants, and content contributors.</p>
                    <p className="mt-4">Please read these Terms of Service carefully before using our website. By accessing or using any part of the site, you agree to these Terms. If you do not agree to all of the terms and conditions, you may not access the site or use any of our services. If these Terms are considered an offer, acceptance is strictly limited to these Terms.</p>
                    <p className="mt-4">Any new features or tools added to the current store are also subject to these Terms. You can view the most recent version of the Terms of Service at any time on this page. We reserve the right to update, change, or replace any part of these Terms by posting updates or changes on our website. It is your responsibility to check this page regularly for updates. Continued use of or access to the website following any changes constitutes your acceptance of those changes.</p>
                    <p className="mt-4 italic">Our store is hosted by Shopify Inc., which provides us with the e-commerce platform that enables us to sell our products and services to you.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 1 – ONLINE STORE TERMS</h4>
                    <p>By agreeing to these Terms, you confirm that you are at least the age of majority in your state or province of residence, or that you are the age of majority and have given us permission to allow your minor dependents to use this site.</p>
                    <p className="mt-4">You may not use our products for any unlawful or unauthorized purpose, nor may you, while using the Service, violate any laws in your jurisdiction (including, but not limited to, copyright laws).</p>
                    <p className="mt-4 text-red-700/80">You must not transmit any worms, viruses, or code of a destructive nature. Any breach or violation of these Terms will result in immediate termination of your Services.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 2 – GENERAL CONDITIONS</h4>
                    <p>We reserve the right to refuse service to anyone, at any time, for any reason.</p>
                    <p className="mt-4">You understand that your content (excluding credit card information) may be transferred unencrypted and may involve:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>(a) transmission across multiple networks, and</li>
                        <li>(b) adjustments to meet technical requirements of connecting devices or networks.</li>
                    </ul>
                    <p className="mt-2 font-semibold">Credit card information is always encrypted during transfer.</p>
                    <p className="mt-4">You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service or access to it, including any contact through the website, without our express written permission.</p>
                    <p className="mt-4 text-xs italic text-[#3A4D39]/60">Section headings in this agreement are included for convenience only and do not limit or affect these Terms.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 3 – ACCURACY, COMPLETENESS, AND TIMELINESS OF INFORMATION</h4>
                    <p>We are not responsible if information on this site is inaccurate, incomplete, or outdated. The material provided is for general information only and should not be relied upon as the sole basis for making decisions without consulting primary, more accurate or timely sources. Any reliance on the material here is at your own risk.</p>
                    <p className="mt-4 underline decoration-[#3A4D39]/10">This site may include historical information, which is not current and is provided for reference only. We reserve the right to modify the contents of this site at any time but are not obligated to update any information. You agree that monitoring changes to our site is your responsibility.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 4 – MODIFICATIONS TO THE SERVICE AND PRICES</h4>
                    <p>Prices for our products are subject to change without notice.</p>
                    <p className="mt-4">We reserve the right to modify or discontinue the Service (or any part of it) at any time, without notice. We are not liable to you or any third party for any modifications, price changes, suspensions, or discontinuation of the Service.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 5 – PRODUCTS OR SERVICES</h4>
                    <p>Some products or services may be available exclusively online through our website. These items may have limited quantities and are subject to return or exchange only under our Return Policy.</p>
                    <p className="mt-4 italic">We make every effort to display product colors and images accurately. However, we cannot guarantee that your device’s display of colors will be exact.</p>
                    <p className="mt-4">We reserve the right—but are not obligated—to limit sales of our products or services to any person, region, or jurisdiction, and may exercise this right case by case. We may also limit the quantities of any products or services offered.</p>
                    <p className="mt-4">All product descriptions and pricing are subject to change without notice, at our sole discretion. We reserve the right to discontinue any product at any time. Any offer made on this site for a product or service is void where prohibited.</p>
                    <p className="mt-4">We do not guarantee that the quality of any product, service, or information will meet your expectations, nor that any errors in the Service will be corrected.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 6 – ACCURACY OF BILLING AND ACCOUNT INFORMATION</h4>
                    <p>We reserve the right to refuse any order you place with us. We may limit or cancel quantities purchased per person, per household, or per order—this may include orders placed under the same customer account, credit card, or billing/shipping address.</p>
                    <p className="mt-4 italic text-[#3A4D39]/70">If we make changes to or cancel an order, we may attempt to notify you via the contact information provided at the time of order (email, billing address, or phone number). We reserve the right to prohibit orders that, in our judgment, appear to be placed by dealers, resellers, or distributors.</p>
                    <p className="mt-4">You agree to provide accurate, current, and complete purchase and account information for all transactions. You agree to promptly update account details, including email and payment information, to ensure successful transactions and communication.</p>
                    <p className="mt-4 font-bold border-l-2 border-[#3A4D39]/20 pl-4">For more details, please review our Returns Policy.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 7 – OPTIONAL TOOLS</h4>
                    <p>We may provide access to third-party tools that we neither monitor nor control. You acknowledge and agree that such tools are provided “as is” and “as available,” without any warranties, representations, or conditions of any kind. We assume no liability related to your use of optional third-party tools.</p>
                    <p className="mt-4">Your use of such tools is entirely at your own risk and discretion, and you should ensure that you understand and agree with the terms provided by the relevant third-party provider(s).</p>
                    <p className="mt-4">We may also introduce new features or services on our website in the future; such additions will also be subject to these Terms.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 8 – THIRD-PARTY LINKS</h4>
                    <p>Some content, products, and services available through our Service may include third-party materials.</p>
                    <p className="mt-4">Links on this site may direct you to third-party websites not affiliated with us. We are not responsible for examining or evaluating such content or accuracy and will not be liable for any materials, products, or services of third parties.</p>
                    <p className="mt-4 underline decoration-[#3A4D39]/20">We are not responsible for any damages or losses related to the purchase or use of goods or services through third-party websites. Please review third-party policies and terms carefully before engaging in any transactions. Any complaints or issues regarding third-party products should be directed to them directly.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 9 – USER COMMENTS, FEEDBACK, AND OTHER SUBMISSIONS</h4>
                    <p>If you send us submissions (e.g., contest entries, creative ideas, proposals, or feedback), whether requested or unsolicited, you agree that we may edit, copy, publish, distribute, translate, and use them in any medium, at any time, without restriction.</p>
                    <p className="mt-4 bg-[#3A4D39]/5 p-4 rounded-sm">We have no obligation to (1) keep comments confidential, (2) compensate for comments, or (3) respond to any comments.</p>
                    <p className="mt-4">We may, but are not required to, monitor, edit, or remove content we deem unlawful, offensive, defamatory, obscene, or otherwise objectionable, or that violates any party’s rights or these Terms.</p>
                    <p className="mt-4">You agree that your comments will not violate any rights of third parties, including intellectual property, privacy, or personality rights. Your comments must not contain unlawful, abusive, or obscene material, nor any malware or code that could affect the Service or related websites.</p>
                    <p className="mt-4">You may not use false information or impersonate another person. You are solely responsible for your comments and their accuracy. We take no responsibility and assume no liability for any user or third-party comments.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 10 – PERSONAL INFORMATION</h4>
                    <p>Your submission of personal information through the store is governed by our Privacy Policy.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 11 – ERRORS, INACCURACIES, AND OMISSIONS</h4>
                    <p>Occasionally, there may be typographical errors, inaccuracies, or omissions on our site or within the Service, related to product descriptions, pricing, promotions, offers, shipping charges, or availability.</p>
                    <p className="mt-4 italic">We reserve the right to correct such errors and to update or cancel orders if any information is inaccurate—without prior notice, including after an order has been submitted.</p>
                    <p className="mt-4">We are under no obligation to update or amend information except as required by law. No update or refresh date should be interpreted as confirming that all information has been modified or updated.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 12 – PROHIBITED USES</h4>
                    <p className="mb-4 text-stone-700 font-medium">You are prohibited from using the site or its content for:</p>
                    <ol className="list-decimal ml-6 space-y-2 text-red-900/80">
                        <li>(a) unlawful purposes;</li>
                        <li>(b) soliciting others to commit unlawful acts;</li>
                        <li>(c) violating any laws or regulations;</li>
                        <li>(d) infringing intellectual property rights;</li>
                        <li>(e) harassment, discrimination, or harm;</li>
                        <li>(f) submitting false or misleading information;</li>
                        <li>(g) transmitting viruses or malicious code;</li>
                        <li>(h) collecting personal information of others;</li>
                        <li>(i) spamming, phishing, or scraping;</li>
                        <li>(j) obscene or immoral activities; or</li>
                        <li>(k) interfering with security features of the site or related platforms.</li>
                    </ol>
                    <p className="mt-4 font-semibold text-red-900">We reserve the right to terminate your access for violating these prohibitions.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 13 – DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</h4>
                    <p>We do not guarantee that the Service will be uninterrupted, secure, or error-free. We do not warrant that results obtained from the Service will be accurate or reliable. You acknowledge that we may suspend or cancel the Service at any time without notice.</p>
                    <p className="mt-4 italic border-l-2 border-stone-200 pl-4 py-2 bg-stone-50/50">You use the Service at your own risk. The Service and all products provided through it are offered “as is” and “as available,” without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, durability, title, or non-infringement.</p>
                    <p className="mt-4 font-bold text-[#3A4D39]">In no case shall Guzel or its affiliates, employees, agents, contractors, or suppliers be liable for any direct or indirect damages, including lost profits, savings, data, or any similar losses, arising from your use of the Service or any product. Where certain jurisdictions do not allow such exclusions, our liability shall be limited to the extent permitted by law.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 14 – INDEMNIFICATION</h4>
                    <p>You agree to indemnify, defend, and hold harmless Guzel and its affiliates, officers, agents, contractors, suppliers, and employees from any claims or demands, including legal fees, arising from your breach of these Terms or violation of any law or third-party rights.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 15 – SEVERABILITY</h4>
                    <p>If any part of these Terms is found to be unlawful, void, or unenforceable, that provision shall still be enforceable to the fullest extent permitted by law, and the unenforceable portion shall be deemed severed. This shall not affect the validity of remaining provisions.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 16 – TERMINATION</h4>
                    <p>All obligations and liabilities incurred before termination will survive the end of this agreement. These Terms remain effective unless terminated by either you or us. You may terminate them by notifying us or ceasing to use our site.</p>
                    <p className="mt-4">If we determine that you have violated any part of these Terms, we may terminate this agreement immediately without notice, and you will remain liable for all amounts due up to the date of termination. We may also deny you access to our Services.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 17 – ENTIRE AGREEMENT</h4>
                    <p>Failure by us to enforce any right or provision does not constitute a waiver of that right. These Terms, along with any policies posted on this site, represent the full agreement between you and us and supersede any prior agreements or communications.</p>
                    <p className="mt-4 italic">Any ambiguity in interpreting these Terms shall not be construed against the drafting party.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 18 – GOVERNING LAW</h4>
                    <p>These Terms of Service and any agreements for Services are governed by and interpreted in accordance with the laws of <span className="font-bold underline decoration-[#3A4D39]/30 text-xl">Pakistan</span>.</p>
                </section>

                <section>
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 19 – CHANGES TO TERMS OF SERVICE</h4>
                    <p>You may review the latest version of these Terms at any time on this page. We reserve the right to update or change any part of these Terms by posting revisions on our website. It is your responsibility to check for updates periodically. Continued use of our website or Services after changes are posted constitutes acceptance of the revised Terms.</p>
                </section>

                <section className="pt-8 border-t border-[#3A4D39]/10">
                    <h4 className="text-xl md:text-2xl font-bold text-[#3A4D39] mb-4">SECTION 20 – CONTACT INFORMATION</h4>
                    <p>Questions regarding these Terms of Service should be sent to:</p>
                    <p className="mt-4 text-2xl font-serif text-[#3A4D39] tracking-tight selection:bg-[#3A4D39] selection:text-white">guzel.printmallislamabad@gmail.com</p>
                </section>
            </div>
        ),
    },
}

export default function PolicyPage() {
    const searchParams = useSearchParams()
    const [activeTab, setActiveTab] = useState<TabId>("shipping")

    useEffect(() => {
        const tab = searchParams.get("tab") as TabId
        if (tab && Object.keys(policies).includes(tab)) {
            setActiveTab(tab)
        }
    }, [searchParams])

    return (
        <div className="min-h-screen bg-[#FFF9EF] relative overflow-hidden flex flex-col md:flex-row font-serif text-[#3e523f]">
            {/* Grain Texture Overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    filter: "contrast(120%) brightness(100%)",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Left Column: Sticky Navigation */}
            <nav className="w-full md:w-1/3 lg:w-1/4 p-8 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-[#3e523f]/10 relative z-10 md:h-screen md:sticky md:top-0 flex flex-col justify-center">
                <div className="mb-12 hidden md:block">
                    <h1 className="text-2xl font-bold tracking-widest uppercase">
                        The Ledger
                    </h1>
                    <p className="text-sm text-[#3e523f]/60 mt-2 font-sans tracking-wide">
                        Studio Policies & Protocols
                    </p>
                </div>

                <div className="space-y-2">
                    {(Object.keys(policies) as TabId[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="group relative w-full text-left py-3 px-4 transition-all duration-300 ease-out"
                        >
                            <div className="flex items-center gap-4">
                                {/* Indicator Line */}
                                <motion.div
                                    className={`w-1 h-1 rounded-full bg-[#3A4D39] transition-all duration-300 ${activeTab === tab ? "h-1.5 w-1.5" : "opacity-0"
                                        }`}
                                    layoutId="tabIndicator"
                                />

                                <span
                                    className={`uppercase tracking-widest text-xs md:text-sm transition-all duration-300 ${activeTab === tab
                                        ? "text-[#3A4D39] font-bold translate-x-1"
                                        : "text-stone-400 group-hover:text-[#3e523f]/60"
                                        }`}
                                >
                                    {policies[tab].title}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Right Column: Content Area */}
            <main className="w-full md:w-2/3 lg:w-3/4 min-h-[60vh] md:min-h-screen relative z-10 p-8 md:p-20 flex items-center justify-center">
                <div className="max-w-2xl w-full">
                    {/* Wax Seal Graphic */}
                    <div className="flex justify-center mb-12 opacity-80">
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#3A4D39]/30 flex items-center justify-center">
                            <ScrollText className="w-6 h-6 md:w-8 md:h-8 text-[#3A4D39]" />
                            <div className="absolute inset-0 rounded-full border border-[#3A4D39]/10 scale-125" />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="text-center md:text-left"
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#3A4D39] mb-8 leading-tight">
                                {policies[activeTab].title}
                            </h2>
                            <div className="prose prose-stone prose-lg max-w-none">
                                {typeof policies[activeTab].content === "string" ? (
                                    <p className="font-mono text-stone-600 leading-loose text-sm md:text-base whitespace-pre-line">
                                        {policies[activeTab].content as string}
                                    </p>
                                ) : (
                                    <div className="text-stone-600 leading-relaxed text-sm md:text-base">
                                        {policies[activeTab].content}
                                    </div>
                                )}
                            </div>

                            {/* Decorative Signature Line */}
                            <div className="mt-12 flex items-center justify-center md:justify-start gap-4">
                                <div className="h-px w-16 bg-[#3A4D39]/20" />
                                <span className="font-serif italic text-[#3A4D39]/40 text-sm">Guzel Studio</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}
