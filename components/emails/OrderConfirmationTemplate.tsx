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
        size: string
    }>
    total: number
    date: string
    paymentMethod: string
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000"

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
            <Preview>New Order #{orderId} from {customerName}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Heading style={headerTitle}>Guzel Art</Heading>
                        <Text style={headerSubtitle}>Order Confirmation</Text>
                    </Section>

                    <Section style={orderInfo}>
                        <Row>
                            <Column>
                                <Text style={label}>Order ID</Text>
                                <Text style={value}>#{orderId}</Text>
                            </Column>
                            <Column>
                                <Text style={label}>Date</Text>
                                <Text style={value}>{date}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Hr style={divider} />

                    <Section style={section}>
                        <Heading as="h2" style={sectionTitle}>
                            Customer Details
                        </Heading>
                        <Row>
                            <Column>
                                <Text style={label}>Name</Text>
                                <Text style={value}>{customerName}</Text>
                                <Text style={label}>Email</Text>
                                <Text style={value}>{email}</Text>
                                <Text style={label}>Phone</Text>
                                <Text style={value}>{phone}</Text>
                            </Column>
                            <Column>
                                <Text style={label}>Shipping Address</Text>
                                <Text style={value}>
                                    {address}
                                    <br />
                                    {city}
                                </Text>
                                <Text style={label}>Payment Method</Text>
                                <Text style={value}>
                                    {paymentMethod === "cod" ? "Cash on Delivery" : "Card"}
                                </Text>
                            </Column>
                        </Row>
                    </Section>

                    <Hr style={divider} />

                    <Section style={section}>
                        <Heading as="h2" style={sectionTitle}>
                            Order Items
                        </Heading>
                        {items.map((item, index) => (
                            <Row key={index} style={itemRow}>
                                <Column style={{ width: "60%" }}>
                                    <Text style={itemTitle}>{item.title}</Text>
                                    <Text style={itemMeta}>
                                        {item.size} | {item.frame} Frame
                                    </Text>
                                </Column>
                                <Column style={{ width: "20%", textAlign: "right" }}>
                                    <Text style={itemMeta}>x{item.quantity}</Text>
                                </Column>
                                <Column style={{ width: "20%", textAlign: "right" }}>
                                    <Text style={itemPrice}>
                                        PKR {(item.price * item.quantity).toLocaleString()}
                                    </Text>
                                </Column>
                            </Row>
                        ))}
                    </Section>

                    <Hr style={divider} />

                    <Section style={totalSection}>
                        <Row>
                            <Column style={{ width: "80%", textAlign: "right" }}>
                                <Text style={totalLabel}>Total Amount:</Text>
                            </Column>
                            <Column style={{ width: "20%", textAlign: "right" }}>
                                <Text style={totalValue}>PKR {total.toLocaleString()}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={footer}>
                        <Text style={footerText}>
                            This is an automated message from Guzel Art Order System.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "40px 20px",
    marginBottom: "64px",
    maxWidth: "600px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
}

const header = {
    textAlign: "center" as const,
    marginBottom: "32px",
}

const headerTitle = {
    color: "#3e523f",
    fontSize: "32px",
    fontFamily: "serif",
    fontWeight: "bold",
    margin: "0 0 8px",
}

const headerSubtitle = {
    color: "#666666",
    fontSize: "16px",
    margin: "0",
}

const section = {
    marginBottom: "32px",
}

const sectionTitle = {
    color: "#333333",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "16px",
    borderBottom: "2px solid #3e523f",
    paddingBottom: "8px",
    display: "inline-block",
}

const orderInfo = {
    marginBottom: "24px",
}

const label = {
    color: "#8898aa",
    fontSize: "12px",
    textTransform: "uppercase" as const,
    fontWeight: "bold",
    marginBottom: "4px",
}

const value = {
    color: "#333333",
    fontSize: "14px",
    marginBottom: "16px",
    lineHeight: "1.4",
}

const itemRow = {
    marginBottom: "16px",
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: "16px",
}

const itemTitle = {
    color: "#333333",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0 0 4px",
}

const itemMeta = {
    color: "#666666",
    fontSize: "12px",
    margin: "0",
}

const itemPrice = {
    color: "#333333",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0",
}

const divider = {
    borderTop: "1px solid #e6ebf1",
    margin: "32px 0",
}

const totalSection = {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "4px",
}

const totalLabel = {
    color: "#666666",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0",
}

const totalValue = {
    color: "#3e523f",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0",
}

const footer = {
    marginTop: "48px",
    textAlign: "center" as const,
}

const footerText = {
    color: "#999999",
    fontSize: "12px",
}
