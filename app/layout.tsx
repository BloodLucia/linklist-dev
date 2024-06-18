import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { Toaster } from '@/components/Toaster/Toaster'
import './globals.css'

export const metadata: Metadata = {
  title: 'Oh My Link',
  description: 'Oh My Link',
}
export const viewport: Viewport = {
  userScalable: false
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased text-sm font-sans">
        {children}
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  )
}
