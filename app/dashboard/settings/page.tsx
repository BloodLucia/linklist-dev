'use client'

import { Button } from '@/components/Button/Button'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { signOut } from '@/utils/supabase/auth-helpers/server'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, signOut)
    setIsLoading(false)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="pathname" value={usePathname()} />
        <Button
          loading={isLoading}
          level="danger"
          type="submit"
          className="w-full"
        >
          退出登录
        </Button>
      </form>
    </>
  )
}
