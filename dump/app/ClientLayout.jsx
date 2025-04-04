"use client"

import { Inter } from "next/font/google"
import { useEffect, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className={`${inter.className} min-h-screen bg-background text-foreground`}>{children}</div>
    </ThemeProvider>
  )
}

