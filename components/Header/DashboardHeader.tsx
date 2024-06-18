'use client'

import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { signOut } from '@/utils/supabase/auth-helpers/server'
import { usePathname } from 'next/navigation'
import { Loader } from '../Loader/Loader'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export const DashboardHeader: React.FC<{ username?: string }> = ({
  username,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, signOut)
    setIsLoading(false)
  }
  return (
    <header className="h-[60px] w-full md:bg-white/85 max-md:bg-white fixed top-0 left-0 right-0 box-border md:border-b z-10">
      <div className="max-w-6xl flex justify-between items-center mx-auto h-full max-md:w-full max-md:px-6 md:backdrop-blur-2xl">
        <a href="/" className="font-semibold text-xl" aria-label="Logo">
          LinkList
        </a>
        <div className="flex gap-x-3">
          <form onSubmit={handleSubmit} className="max-md:hidden">
            <input type="hidden" name="pathname" value={usePathname()} />
            <button
              disabled={isLoading}
              type="submit"
              className="hover:bg-[var(--danger-dark-color)] px-4 h-[40px] rounded bg-[var(--danger-color)] flex justify-center items-center text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <Loader className="text-white">Loading...</Loader>
              ) : (
                'Sign Out'
              )}
            </button>
          </form>
          <Menu width={32} height={32} cursor="pointer" className="md:hidden" />
        </div>
      </div>
    </header>
  )
}
