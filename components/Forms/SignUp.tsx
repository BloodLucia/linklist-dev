'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { signUp } from '@/utils/supabase/auth-helpers/server'
import { PasswordInput } from '../Inputs/PasswordInput'
import { UrlInput } from '../Inputs/UrlInout'
import { Input } from '../Inputs/Input'

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
        <UrlInput />
        <PasswordInput />
        <button
          type="submit"
          disabled={isLoading}
          className="disabled:cursor-not-allowed bg-[var(--pr-color)] h-[40px] font-semibold text-white rounded mt-4 flex justify-center items-center"
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : '注册'}
        </button>
      </form>
    </>
  )
}
