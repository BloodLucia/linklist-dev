import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { Toaster } from '@/components/Toaster/Toaster'
import cn from 'classnames'
import './globals.css'

export const metadata: Metadata = {
  title: 'LinkList',
  description: 'LinkList · Launch your site in seconds',
}
export const viewport: Viewport = {
  userScalable: false,
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("h-full antialiased font-sans text-[var(--dark-color)]")}>
        {children}
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  )
}
