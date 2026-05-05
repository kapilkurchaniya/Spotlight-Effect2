import React from "react"
import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  title: 'Karishma Healthy Kitchen | High-Protein, Low-Gluten Meals in Bhopal',
  description: 'Bhopal\'s premier healthy food delivery service. Fresh, high-protein, fiber-rich, low-gluten meals delivered to your doorstep. Order now for delicious, nutritious food!',
  keywords: 'healthy food delivery Bhopal, high protein meals Bhopal, low gluten food Bhopal, healthy restaurant Bhopal, fitness food delivery',
  generator: 'v0.app',
  openGraph: {
    title: 'Karishma Healthy Kitchen | Healthy Food Delivery Bhopal',
    description: 'Fresh, high-protein, fiber-rich, low-gluten meals delivered in Bhopal. Order now!',
    type: 'website',
    locale: 'en_IN',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Karishma Healthy Kitchen",
              "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bhopal",
                "addressLocality": "Bhopal",
                "postalCode": "462043",
                "addressRegion": "MP",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 23.2599,
                "longitude": 77.4126
              },
              "url": "https://karishmahealthykitchen.com",
              "telephone": "+91-XXXXXXXXXX",
              "servesCuisine": "Healthy, High-Protein, Low-Gluten",
              "priceRange": "₹₹",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
                  "opens": "18:00",
                  "closes": "20:30"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Friday",
                  "opens": "09:00",
                  "closes": "15:30"
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
