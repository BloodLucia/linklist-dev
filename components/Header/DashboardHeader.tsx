'use client'

import { useLoaing } from '@/hooks/use-loading'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { signOut } from '@/utils/supabase/auth-helpers/server'
import { usePathname } from 'next/navigation'
import { Loader } from '../Loader/Loader'

export const DashboardHeader: React.FC<{ username?: string }> = ({
  username,
}) => {
  const { visible: isLoading, setVisible: setIsLoading } = useLoaing()
  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, signOut)
    setIsLoading(false)
  }
  return (
    <header className="h-[60px] w-full bg-white fixed top-0 left-0 right-0 box-border md:border-b">
      <div className="max-w-6xl flex justify-between items-center mx-auto h-full max-md:w-full max-md:px-6">
        <a href="/" className="font-semibold text-xl" aria-label="Logo">
          Oh My Link
        </a>
        <div className="flex gap-x-3">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="pathname" value={usePathname()} />
            <button
              disabled={isLoading}
              type="submit"
              className="hover:bg-[var(--danger-dark-color)] px-4 h-[40px] rounded bg-[var(--danger-color)] flex justify-center items-center text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? <Loader className='text-white'>Loading...</Loader> : 'Sign Out'}
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
