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
            <Preview>Correspondence from {name}</Preview>
            <Body style={main}>
                <Container style={paper}>
                    {/* Header */}
                    <Section style={header}>
                        <Text style={stamp}>RECEIVED</Text>
                        <Heading style={letterhead}>GUZEL ART STUDIO</Heading>
                        <Text style={address}>
                            Islamabad, Pakistan
                            <br />
                            Est. 2026
                        </Text>
                    </Section>

                    <Hr style={divider} />

                    {/* Meta Data */}
                    <Section style={metaSection}>
                        <Row>
                            <Column>
                                <Text style={label}>FROM:</Text>
                                <Text style={typewritten}>{name} &lt;{email}&gt;</Text>
                            </Column>
                            <Column style={{ textAlign: "right" }}>
                                <Text style={label}>DATE:</Text>
                                <Text style={typewritten}>{date}</Text>
                            </Column>
                        </Row>
                        <Row style={{ marginTop: "12px" }}>
                            <Column>
                                <Text style={label}>SUBJECT / RE:</Text>
                                <Text style={typewritten}>{inquiryType} ({timeline})</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Hr style={dividerThin} />

                    {/* Message Body */}
                    <Section style={bodyContent}>
                        <Text style={bodyText}>{message}</Text>
                    </Section>

                    <Hr style={dividerDouble} />

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            END OF TRANSMISSION
                            <br />
                            Please reply directly to the sender to initiate a conversation.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

// STYLES
const main = {
    backgroundColor: "#e4e4e4", // Desk background
    fontFamily: '"Courier New", Courier, monospace', // Typewriter font
    padding: "40px 0",
}

const paper = {
    backgroundColor: "#fffdf7", // Aged paper off-white
    margin: "0 auto",
    padding: "40px 50px",
    maxWidth: "580px",
    borderRadius: "2px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    border: "1px solid #d4d4d4",
}

const header = {
    marginBottom: "24px",
    position: "relative" as const,
}

const stamp = {
    position: "absolute" as const,
    top: "0",
    right: "0",
    border: "2px solid #d00",
    color: "#d00",
    padding: "4px 8px",
    fontSize: "10px",
    fontWeight: "bold",
    transform: "rotate(-10deg)",
    opacity: "0.8",
}

const letterhead = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#1a1a1a",
    margin: "0",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
}

const address = {
    fontSize: "10px",
    color: "#666",
    marginTop: "4px",
    lineHeight: "1.4",
}

const divider = {
    borderTop: "2px solid #1a1a1a",
    margin: "24px 0",
}

const dividerThin = {
    borderTop: "1px dashed #999",
    margin: "24px 0",
}

const dividerDouble = {
    borderTop: "3px double #1a1a1a",
    margin: "40px 0 20px",
}

const metaSection = {
    marginBottom: "24px",
}

const label = {
    fontSize: "10px",
    color: "#999",
    fontWeight: "bold",
    marginBottom: "4px",
}

const typewritten = {
    fontSize: "14px",
    color: "#1a1a1a",
    margin: "0",
}

const bodyContent = {
    marginTop: "32px",
    marginBottom: "32px",
}

const bodyText = {
    fontSize: "14px",
    lineHeight: "1.8",
    color: "#1a1a1a",
    whiteSpace: "pre-wrap" as const,
    textAlign: "justify" as const,
}

const footer = {
    textAlign: "center" as const,
}

const footerText = {
    fontSize: "10px",
    color: "#888",
    fontStyle: "italic",
}
