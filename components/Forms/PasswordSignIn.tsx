'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { PasswordInput } from '../Inputs/PasswordInput'
import { Input } from '../Inputs/Input'
import { Button } from '../Button/Button'
import { signInWithPasswordAndUserName } from '@/app/signin/actions'
import { PathnameInput } from '../Inputs/PathnameInput'

export const PasswordSignIn = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, signInWithPasswordAndUserName, router)
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
      <PathnameInput />
      <PasswordInput />
      <Button type="submit" className="mt-4" loading={isLoading}>
        登录
      </Button>
    </form>
  )
}
