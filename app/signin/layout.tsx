'use client'
import { Link } from 'lucide-react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-[#f9f9f9] flex justify-center items-center">
      {/* <header className="fixed top-0 left-0 right-0 border-b border-b-[#f3f3f4] bg-white h-[60px] w-full max-sm:hidden">
        <div className=" max-w-6xl mx-auto flex justify-between items-center h-full max-sm:px-6 max-sm:w-full">
          <h1>
            <a
              href="/"
              className="inline-flex items-center gap-1 text-lg font-semibold text-[var(--primary-color)]"
            >
              <Link color="currentColor" />
              Oh My Link
            </a>
          </h1>
          <div className="flex max-sm:hidden">
            <a href="/signin">Login</a>
          </div>
        </div>
      </header> */}
      <div className="max-sm:w-full max-sm:min-h-screen max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:bg-white max-sm:px-6">
        <div className="max-sm:w-full max-sm:p-0 w-[400px] rounded bg-white p-8 mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
