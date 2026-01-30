import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components"
import * as React from "react"

interface WaitlistEmailProps {
    email: string
    date: string
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000"

export const WaitlistEmailTemplate = ({
    email,
    date,
}: WaitlistEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>A new art lover has joined the waitlist.</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Heading style={headerTitle}>Guzel Art</Heading>
                        <Text style={headerSubtitle}>New Waitlist Join</Text>
                    </Section>

                    <Section style={content}>
                        <Text style={text}>
                            A new user has joined the waitlist for the digital experience.
                        </Text>

                        <Section style={infoBox}>
                            <Text style={label}>Email Address</Text>
                            <Text style={value}>{email}</Text>

                            <Text style={label}>Joined Date</Text>
                            <Text style={value}>{date}</Text>
                        </Section>
                    </Section>

                    <Section style={footer}>
                        <Text style={footerText}>
                            This is an automated notification from Guzel Art.
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

const content = {
    marginBottom: "32px",
}

const text = {
    color: "#333",
    fontSize: "16px",
    lineHeight: "26px",
    marginBottom: "24px",
}

const infoBox = {
    backgroundColor: "#f8f9fa",
    padding: "24px",
    borderRadius: "8px",
}

const label = {
    color: "#8898aa",
    fontSize: "12px",
    textTransform: "uppercase" as const,
    fontWeight: "bold",
    marginBottom: "8px",
}

const value = {
    color: "#333333",
    fontSize: "16px",
    marginBottom: "16px",
    fontFamily: "monospace",
}

const footer = {
    marginTop: "48px",
    textAlign: "center" as const,
}

const footerText = {
    color: "#999999",
    fontSize: "12px",
}
