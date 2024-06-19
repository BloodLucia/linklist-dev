import type { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import { Suspense } from 'react'
import { Toaster } from '@/components/Toaster/Toaster'
import cn from 'classnames'
import './globals.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
})

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
      <body className={cn("h-full antialiased text-base text-[var(--dark-color)]", roboto.className)}>
        {children}
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  )
}
