'use client'

import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { signOut } from '@/utils/supabase/auth-helpers/server'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Brand } from '../Brand/Brand'
import { Button } from '../Buttons/Button'
import { Tables } from '@/db_types'
import { getURL } from '@/utils/helpers/helpers'
import Image from 'next/image'

export const DashboardHeader: React.FC<{ user?: Tables<'users'> | null }> = ({
  user,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  // const {} = useUser()
  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, signOut)
    setIsLoading(false)
  }
  return (
    <header className="h-[60px] w-full md:bg-white/85 max-md:bg-white fixed top-0 left-0 right-0 box-border md:border-b z-10">
      <div className="max-w-6xl flex justify-between items-center mx-auto h-full max-md:w-full max-md:px-6 md:backdrop-blur-2xl">
        <Brand />
        <div className="flex gap-x-3">
          <form onSubmit={handleSubmit} className="max-md:hidden">
            <input type="hidden" name="pathname" value={usePathname()} />
            <Button disabled={isLoading} level="danger" type="submit">
              登出
            </Button>
          </form>
          {/* <div className="flex items-center gap-x-3">
            <div>{`${getURL().replace('http://', '')}/${user?.username}`}</div>
            <div>{user?.username}</div>
            <div>{user?.email}</div>
          </div> */}
          <Menu width={32} height={32} cursor="pointer" className="md:hidden" />
        </div>
      </div>
    </header>
  )
}
