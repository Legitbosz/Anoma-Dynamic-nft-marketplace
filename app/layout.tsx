import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Anoma Dynamic NFT Marketplace",
  description: "Dynamic NFT marketplace with intent matching for complex multi-party trades",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} ${manrope.variable} relative`}>
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-15"
          style={{
            backgroundImage: "url(/anoma-logo-bg.jpg)",
            backgroundSize: "400px 400px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative z-10">
          <Suspense fallback={null}>{children}</Suspense>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
