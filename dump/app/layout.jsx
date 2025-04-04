import "./globals.css"

export const metadata = {
  title: "EduLearn - E-Learning Platform",
  description: "A comprehensive e-learning platform for colleges",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  )
}



import './globals.css'