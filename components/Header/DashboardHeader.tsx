'use client'

import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { signOut } from '@/utils/supabase/auth-helpers/server'
import { usePathname } from 'next/navigation'
import Button from '../Button'
import { getURL } from '@/utils/helpers/helpers'

export const DashboardHeader: React.FC<{ username?: string }> = ({
  username,
}) => {

  const getProfileUrl = () => {
    const siteURL = getURL()
    if (siteURL.startsWith("http://")) {
      return `${siteURL.replace("http://", "")}/${username}`
    } else if (siteURL.startsWith("https://")) {
      return `${siteURL.replace("https://", "")}/${username}`
    }
  }
  

  return (
    <header className="box-border w-full h-[60px] fixed top-0 left-0 z-10 border-b border-b-[var(--btngrey-color)] bg-white">
      <div className="max-w-6xl h-full mx-auto max-md:px-6 flex justify-between items-center">
        <a href="/" className="text-xl font-bold font-sans">
          OH MY LINK
        </a>
        <div className='flex items-center gap-x-4'>
          <a className='text-sm max-md:hidden  underline text-[var(--blue-color)]' href={getProfileUrl()} target="_blank">{getProfileUrl()}</a>
          <form onSubmit={(e) => handleRequest(e, signOut)}>
            <input type="hidden" name="pathname" value={usePathname()} />
            <Button level="danger">Sign Out</Button>
          </form>
        </div>
      </div>
    </header>
  )
}
