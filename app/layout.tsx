import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: 'Guzel - Art & Framing',
  description: 'Experience the art of Guzel',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}
