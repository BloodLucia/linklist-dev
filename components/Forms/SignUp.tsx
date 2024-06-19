'use client'

import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { signUp } from '@/utils/supabase/auth-helpers/server'
import { Eye, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PasswordInput } from '../Inputs/PasswordInput'
import { UrlInput } from '../Inputs/UrlInout'
import { Input } from '../Inputs/Input'

export const SignUp: React.FC = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, signUp, router)
    setIsLoading(false)
  }
  return (
    <form
      onSubmit={handleSubmit}
      action="POST"
      className="flex flex-col gap-y-4 items-stretch bg-white"
    >
      <h2 className="mb-4 font-semibold text-base text-[var(dark-color)] max-md:text-xl max-md:text-center">
        SIGN UP
      </h2>
      <Input
        type="email"
        required
        name="email"
        placeholder="邮箱"
        autoComplete="email"
      />
      <PasswordInput />
      <UrlInput />
      <button
        type="submit"
        disabled={isLoading}
        className="disabled:cursor-not-allowed bg-[var(--pr-color)] h-[40px] font-semibold text-white rounded mt-4 flex justify-center items-center"
      >
        {isLoading ? <LoaderCircle className="animate-spin" /> : 'SIGN UP'}
      </button>
    </form>
  )
}
