import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { MoneyMapProvider } from "@/context/money-map-context"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MoneyMap - Financial Dashboard",
  description: "Track your income, expenses, and investments",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('unhandledrejection', (event) => {
                if (event.reason && typeof event.reason === 'string' && event.reason.includes('MetaMask')) {
                  event.preventDefault();
                }
              });
            `,
          }}
        />
        <MoneyMapProvider>{children}</MoneyMapProvider>
        <Analytics />
      </body>
    </html>
  )
}
