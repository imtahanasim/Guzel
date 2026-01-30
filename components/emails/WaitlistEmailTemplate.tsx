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
} from "@react-email/components"
import * as React from "react"

interface WaitlistEmailProps {
    email: string
    date: string
}

export const WaitlistEmailTemplate = ({
    email,
    date,
}: WaitlistEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>You are on the list.</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Heading style={brand}>GUZEL.</Heading>
                        <Text style={subtitle}>THE EXCLUSIVE LIST</Text>
                    </Section>

                    <Hr style={divider} />

                    {/* Content */}
                    <Section style={content}>
                        <Text style={bodyText}>
                            <strong>Official Confirmation</strong>
                            <br /><br />
                            This digital token confirms that a new member has joined the private waitlist.
                        </Text>

                        <Section style={card}>
                            <Text style={label}>MEMBER STATUS</Text>
                            <Text style={status}>ACTIVE & VERIFIED</Text>

                            <Hr style={dividerThin} />

                            <Text style={label}>REGISTERED EMAIL</Text>
                            <Text style={value}>{email}</Text>

                            <Text style={label}>DATE OF ENTRY</Text>
                            <Text style={value}>{date}</Text>
                        </Section>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            GUZEL ART STUDIO • ISLAMABAD
                            <br />
                            Privileged Access
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
    margin: "40px auto",
    padding: "40px",
    maxWidth: "500px",
    backgroundColor: colors.cream,
    border: `1px solid ${colors.green}`,
}

const header = {
    textAlign: "center" as const,
    marginBottom: "32px",
}

const brand = {
    fontSize: "32px",
    color: colors.green,
    letterSpacing: "4px",
    fontWeight: "600",
    margin: "0 0 8px",
}

const subtitle = {
    fontSize: "10px",
    color: colors.green,
    letterSpacing: "4px",
    textTransform: "uppercase" as const,
    opacity: 0.8,
}

const divider = {
    borderTop: `1px solid ${colors.green}`,
    opacity: 0.2,
    margin: "32px 0",
}

const dividerThin = {
    borderTop: `1px dashed ${colors.green}`,
    opacity: 0.3,
    margin: "16px 0",
}

const content = {
    textAlign: "center" as const,
}

const bodyText = {
    fontSize: "14px",
    lineHeight: "1.6",
    color: colors.text,
    fontFamily: '"Helvetica Neue", sans-serif',
    marginBottom: "32px",
}

const card = {
    backgroundColor: "#fff",
    padding: "24px",
    border: `1px solid ${colors.border}`,
    textAlign: "left" as const,
}

const label = {
    fontSize: "10px",
    color: colors.muted,
    letterSpacing: "1px",
    fontWeight: "bold",
    marginBottom: "4px",
    fontFamily: '"Helvetica Neue", sans-serif',
    textTransform: "uppercase" as const,
    marginTop: "12px",
}

const status = {
    fontSize: "14px",
    color: colors.green,
    fontWeight: "bold",
    letterSpacing: "1px",
    fontFamily: '"Helvetica Neue", sans-serif',
    margin: "0",
}

const value = {
    fontSize: "14px",
    color: colors.text,
    fontFamily: '"Helvetica Neue", sans-serif',
    margin: "0",
}

const footer = {
    textAlign: "center" as const,
    marginTop: "40px",
}

const footerText = {
    fontSize: "10px",
    color: colors.green,
    letterSpacing: "2px",
    lineHeight: "1.8",
    fontFamily: '"Helvetica Neue", sans-serif',
    opacity: 0.6,
}
