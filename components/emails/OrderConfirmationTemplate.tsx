import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components"
import * as React from "react"

interface OrderConfirmationEmailProps {
    orderId: string
    customerName: string
    email: string
    phone: string
    address: string
    city: string
    items: Array<{
        title: string
        quantity: number
        price: number
        frame: string
        mount: string
        size: string
        thumbnail: string
    }>
    total: number
    date: string
    paymentMethod: string
}

export const OrderConfirmationEmail = ({
    orderId,
    customerName,
    email,
    phone,
    address,
    city,
    items,
    total,
    date,
    paymentMethod,
}: OrderConfirmationEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Order Confirmed #{orderId}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header with Logo Area */}
                    <Section style={header}>
                        <Heading style={brand}>GUZEL.</Heading>
                        <Text style={subtitle}>New Order Received</Text>
                    </Section>

                    {/* Intro Note */}
                    <Section style={introSection}>
                        <Text style={introText}>
                            <strong>Admin Notification</strong>
                            <br /><br />
                            A new order has been placed by <strong>{customerName}</strong>.
                            <br />
                            Please review the collection details below for fulfillment.
                        </Text>
                    </Section>

                    <Hr style={divider} />

                    {/* Order Meta */}
                    <Section style={metaGrid}>
                        <Row>
                            <Column>
                                <Text style={label}>ORDER NO.</Text>
                                <Text style={value}>#{orderId}</Text>
                            </Column>
                            <Column style={{ textAlign: "center" }}>
                                <Text style={label}>DATE</Text>
                                <Text style={value}>{date}</Text>
                            </Column>
                            <Column style={{ textAlign: "right" }}>
                                <Text style={label}>PAYMENT</Text>
                                <Text style={value}>
                                    {paymentMethod === "cod" ? "COD" : "Paid"}
                                </Text>
                            </Column>
                        </Row>
                    </Section>

                    <Hr style={divider} />

                    {/* Items List */}
                    <Section style={itemsSection}>
                        <Text style={sectionTitle}>YOUR COLLECTION</Text>
                        {items.map((item, index) => (
                            <Row key={index} style={itemRow}>
                                <Column style={{ width: "80px", paddingRight: "20px" }}>
                                    <Img
                                        src={item.thumbnail}
                                        width="80"
                                        height="80"
                                        alt={item.title}
                                        style={thumbnail}
                                    />
                                </Column>
                                <Column>
                                    <Text style={itemTitle}>{item.title}</Text>
                                    <Text style={itemMeta}>
                                        {item.size} • {item.frame} Frame • {item.mount} Mount
                                    </Text>
                                </Column>
                                <Column style={{ textAlign: "right", verticalAlign: "top" }}>
                                    <Text style={itemPrice}>PKR {(item.price * item.quantity).toLocaleString()}</Text>
                                    <Text style={itemQty}>Qty: {item.quantity}</Text>
                                </Column>
                            </Row>
                        ))}
                    </Section>

                    <Hr style={divider} />

                    {/* Summary */}
                    <Section>
                        <Row>
                            <Column style={{ width: "60%" }}>
                                {/* Shipping Address */}
                                <Text style={label}>SHIPPING TO</Text>
                                <Text style={addressText}>
                                    {address}
                                    <br />
                                    {city}
                                </Text>
                                <Text style={contactText}>
                                    {phone} | {email}
                                </Text>
                            </Column>
                            <Column style={{ width: "40%", paddingLeft: "20px" }}>
                                <Row style={summaryRow}>
                                    <Column><Text style={summaryLabel}>SUBTOTAL</Text></Column>
                                    <Column style={{ textAlign: "right" }}><Text style={summaryValue}>PKR {total.toLocaleString()}</Text></Column>
                                </Row>
                                <Row style={summaryRow}>
                                    <Column><Text style={summaryLabel}>SHIPPING</Text></Column>
                                    <Column style={{ textAlign: "right" }}><Text style={summaryValue}>Free</Text></Column>
                                </Row>
                                <Hr style={dividerThin} />
                                <Row>
                                    <Column><Text style={totalLabel}>TOTAL</Text></Column>
                                    <Column style={{ textAlign: "right" }}><Text style={totalValue}>PKR {total.toLocaleString()}</Text></Column>
                                </Row>
                            </Column>
                        </Row>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            GUZEL ART STUDIO • ISLAMABAD
                            <br />
                            <Link href="https://guzelart.com" style={link}>www.guzelart.com</Link>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

// COLORS
const colors = {
    cream: "#FFF9EF",
    green: "#3D5C3D",
    text: "#1a1a1a",
    muted: "#666666",
    border: "#E6E3D5",
}

// STYLES
const main = {
    backgroundColor: colors.cream,
    fontFamily: '"Times New Roman", Times, serif',
}

const container = {
    margin: "0 auto",
    padding: "40px",
    maxWidth: "600px",
    backgroundColor: colors.cream,
}

const header = {
    textAlign: "center" as const,
    marginBottom: "40px",
}

const brand = {
    fontSize: "36px",
    color: colors.green,
    letterSpacing: "4px",
    fontWeight: "600",
    margin: "0 0 8px",
}

const subtitle = {
    fontSize: "12px",
    color: colors.green,
    letterSpacing: "3px",
    textTransform: "uppercase" as const,
    opacity: 0.8,
    margin: "0",
    fontFamily: '"Helvetica Neue", sans-serif',
}

const introSection = {
    marginBottom: "32px",
    textAlign: "center" as const,
}

const introText = {
    fontSize: "16px",
    lineHeight: "1.8",
    color: colors.text,
    fontFamily: '"Helvetica Neue", sans-serif',
}

const divider = {
    borderTop: `1px solid ${colors.green}`,
    opacity: 0.2,
    margin: "32px 0",
}

const dividerThin = {
    borderTop: `1px solid ${colors.green}`,
    opacity: 0.2,
    margin: "12px 0",
}

const metaGrid = {
    marginBottom: "0",
}

const label = {
    fontSize: "10px",
    color: colors.green,
    letterSpacing: "1.5px",
    fontWeight: "bold",
    marginBottom: "6px",
    fontFamily: '"Helvetica Neue", sans-serif',
}

const value = {
    fontSize: "14px",
    color: colors.text,
    fontWeight: "500",
    fontFamily: '"Helvetica Neue", sans-serif',
}

const itemsSection = {
    marginBottom: "20px",
}

const sectionTitle = {
    fontSize: "18px",
    color: colors.green,
    fontFamily: '"Times New Roman", Times, serif',
    fontStyle: "italic",
    marginBottom: "24px",
    textAlign: "center" as const,
}

const itemRow = {
    marginBottom: "24px",
}

const thumbnail = {
    borderRadius: "2px",
    objectFit: "cover" as const,
    border: `1px solid ${colors.green}20`,
}

const itemTitle = {
    fontSize: "16px",
    color: colors.green,
    fontFamily: '"Times New Roman", Times, serif',
    fontWeight: "bold",
    margin: "0 0 4px",
}

const itemMeta = {
    fontSize: "12px",
    color: colors.muted,
    fontFamily: '"Helvetica Neue", sans-serif',
    lineHeight: "1.5",
    margin: "0",
}

const itemPrice = {
    fontSize: "14px",
    color: colors.text,
    fontFamily: '"Helvetica Neue", sans-serif',
    fontWeight: "bold",
    margin: "0 0 4px",
}

const itemQty = {
    fontSize: "12px",
    color: colors.muted,
    fontFamily: '"Helvetica Neue", sans-serif',
    margin: "0",
}

const summaryRow = {
    marginBottom: "8px",
}

const summaryLabel = {
    fontSize: "10px",
    color: colors.muted,
    letterSpacing: "1px",
    fontFamily: '"Helvetica Neue", sans-serif',
}

const summaryValue = {
    fontSize: "14px",
    color: colors.text,
    fontFamily: '"Helvetica Neue", sans-serif',
}

const totalLabel = {
    fontSize: "12px",
    color: colors.green,
    letterSpacing: "1px",
    fontWeight: "bold",
    fontFamily: '"Helvetica Neue", sans-serif',
}

const totalValue = {
    fontSize: "18px",
    color: colors.green,
    fontWeight: "bold",
    fontFamily: '"Times New Roman", Times, serif',
}

const addressText = {
    fontSize: "14px",
    color: colors.text,
    lineHeight: "1.5",
    fontFamily: '"Helvetica Neue", sans-serif',
    marginBottom: "8px",
}

const contactText = {
    fontSize: "12px",
    color: colors.muted,
    fontFamily: '"Helvetica Neue", sans-serif',
}

const footer = {
    textAlign: "center" as const,
    marginTop: "60px",
}

const footerText = {
    fontSize: "10px",
    color: colors.green,
    letterSpacing: "2px",
    lineHeight: "1.8",
    fontFamily: '"Helvetica Neue", sans-serif',
    opacity: 0.6,
}

const link = {
    color: colors.green,
    textDecoration: "none",
}
