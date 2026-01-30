import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Hr,
    Row,
    Column,
} from "@react-email/components"
import * as React from "react"

interface ContactEmailProps {
    name: string
    email: string
    inquiryType: string
    timeline: string
    message: string
    date: string
}

export const ContactEmailTemplate = ({
    name,
    email,
    inquiryType,
    timeline,
    message,
    date,
}: ContactEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>New inquiry from {name}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Heading style={headerTitle}>Guzel Art</Heading>
                        <Text style={headerSubtitle}>New Contact Inquiry</Text>
                    </Section>

                    <Section style={content}>
                        <Row style={row}>
                            <Column>
                                <Text style={label}>Name</Text>
                                <Text style={value}>{name}</Text>
                            </Column>
                        </Row>
                        <Row style={row}>
                            <Column>
                                <Text style={label}>Email</Text>
                                <Text style={value}>{email}</Text>
                            </Column>
                        </Row>
                        <Row style={row}>
                            <Column>
                                <Text style={label}>Inquiry Type</Text>
                                <Text style={value}>{inquiryType}</Text>
                            </Column>
                            <Column>
                                <Text style={label}>Timeline</Text>
                                <Text style={value}>{timeline}</Text>
                            </Column>
                        </Row>

                        <Hr style={divider} />

                        <Text style={label}>Message</Text>
                        <Text style={messageText}>{message}</Text>

                        <Hr style={divider} />

                        <Text style={label}>Date Received</Text>
                        <Text style={value}>{date}</Text>
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

const row = {
    marginBottom: "16px",
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
    fontSize: "16px",
    marginBottom: "8px",
    fontWeight: "bold",
}

const messageText = {
    color: "#333333",
    fontSize: "16px",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap" as const,
    backgroundColor: "#f9f9f9",
    padding: "16px",
    borderRadius: "4px",
}

const divider = {
    borderTop: "1px solid #e6ebf1",
    margin: "24px 0",
}

const footer = {
    marginTop: "48px",
    textAlign: "center" as const,
}

const footerText = {
    color: "#999999",
    fontSize: "12px",
}
