'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { signUp } from '@/utils/supabase/auth-helpers/server'
import { PasswordInput } from '../Inputs/PasswordInput'
import { UrlInput } from '../Inputs/UrlInout'
import { Input } from '../Inputs/Input'
import { Button } from '../Buttons/Button'
import { PathnameInput } from '../Inputs/PathnameInput'

export const SignUp: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, signUp, router)
    setIsLoading(false)
  }

  return (
    <>
      {/* <div>已关闭注册</div> */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-4 items-stretch bg-white"
      >
        <Image
          src="/logo.svg"
          width={50}
          height={50}
          alt="LinkList"
          priority
          className="mx-auto mb-6 cursor-pointer"
        />
        <Input
          type="email"
          required
          name="email"
          placeholder="邮箱"
          autoComplete="email"
        />
        <PathnameInput />
        <UrlInput />
        <PasswordInput />
        <Button
          type="submit"
          level="normal"
          loading={isLoading}
          className="mt-4"
        >
          注册
        </Button>
      </form>
    </>
  )
}
