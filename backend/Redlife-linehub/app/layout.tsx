import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"
import { AuthProvider } from "@/components/auth-context"
import { GelPreloader } from "@/components/gel-preloader"
import { SmoothScroll } from "@/components/smooth-scroll"
import { LoadingBar } from "@/components/loading-bar"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RedLifeline Hub Foundation - Verified Blood Donation Services",
  description:
    "Connect verified blood donors with patients in need. Fast, secure, and trusted blood donation matching platform.",
  keywords: "blood donation, blood bank, donor, recipient, verified, healthcare",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>  
      <body className={`font-sans antialiased`}>  
        <GelPreloader />  
        <SmoothScroll />  
        <LoadingBar />  
        <AuthProvider>  
          <Header />  
          {children}  
          <Footer />  
          <Analytics />  
        </AuthProvider>  
      </body>  
    </html>
  )
}
