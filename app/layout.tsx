import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Toaster } from '@/components/Toaster/Toaster'
import './globals.css'

export const metadata: Metadata = {
  title: 'Oh My Link',
  description: 'Oh My Link',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased overflow-y-auto overflow-x-hidden text-sm font-sans">
        {children}
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  )
}
