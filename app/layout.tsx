import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JobNova - Find Your Dream Job',
  description: 'Ace your job search with AI-powered mock interviews and personalized job matching',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

