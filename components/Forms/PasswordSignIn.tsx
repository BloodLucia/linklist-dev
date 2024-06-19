'use client'

import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { signInWithUsernameAndPassword } from '@/utils/supabase/auth-helpers/server'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PasswordInput } from '../Inputs/PasswordInput'
import { Input } from '../Inputs/Input'

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
      <h2 className="mb-4 font-semibold text-base text-[var(dark-color)] max-md:text-xl max-md:text-center">
        SIGN IN
      </h2>
      <Input name="username" placeholder="用户名" required autoComplete="off" />
      <PasswordInput />
      <button
        type="submit"
        disabled={isLoading}
        className="disabled:cursor-not-allowed rounded-full bg-[#B996F7] text-white h-[40px] font-semibold mt-4 flex justify-center items-center"
      >
        {isLoading ? (
          <LoaderCircle className="animate-spin text-gray-400" />
        ) : (
          '登录'
        )}
      </button>
    </form>
  )
}
