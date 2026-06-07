import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/components/language-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Abdulaziz Haroun — Digital Marketer & Copywriter",
  description:
    "Abdulaziz Haroun helps businesses grow through powerful digital strategies — digital marketing, copywriting, email marketing, and affiliate marketing.",
  keywords: [
    "digital marketing",
    "copywriting",
    "email marketing",
    "affiliate marketing",
    "social media marketing",
    "Abdulaziz Haroun",
  ],
  authors: [{ name: "Abdulaziz Haroun" }],
  openGraph: {
    title: "Abdulaziz Haroun — Digital Marketer & Copywriter",
    description: "Helping businesses grow through powerful digital strategies.",
    type: "website",
  },
  generator: "v0.app",
}

export const viewport = {
  themeColor: "#0a0e17",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
