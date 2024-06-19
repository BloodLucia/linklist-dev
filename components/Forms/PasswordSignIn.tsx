'use client'

import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { signInWithUsernameAndPassword } from '@/utils/supabase/auth-helpers/server'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PasswordInput } from '../Inputs/PasswordInput'
import { Input } from '../Inputs/Input'
import Image from 'next/image'
import { Button } from '../Buttons/Button'

export const PasswordSignIn = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, signInWithUsernameAndPassword, router)
    setIsLoading(false)
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-4 items-stretch bg-white"
    >
      <Image
        src="/logo.svg"
        width={50}
        height={50}
        alt=""
        priority
        className="mx-auto mb-6 cursor-pointer"
      />
      <Input name="username" placeholder="用户名" required autoComplete="off" />
      <PasswordInput />
      <Button type="submit" className="mt-4" disabled={isLoading}>
        登录
      </Button>
    </form>
  )
}
