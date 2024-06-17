'use client'

import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { signUp } from '@/utils/supabase/auth-helpers/server'
import { Eye, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '../Input/Input'

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
        name="email"
        placeholder="Email"
        required
        autoComplete="email"
      />
      <Input
        name="username"
        type="text"
        required
        placeholder="username"
        maxLength={20}
        iconSlot={
          <div className="absolute text-sm text-[var(--dark-color)] top-[25%] left-4 font-normal">
            oml.lol/
          </div>
        }
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        required
        iconSlot={<Eye width={20} height={20} className=' cursor-pointer absolute right-4 top-[50%] -translate-y-[50%]' />}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="disabled:cursor-not-allowed oml-bg oml-btn text-white rounded mt-4 flex justify-center items-center"
      >
        {isLoading ? <LoaderCircle className="animate-spin" /> : 'SIGN UP'}
      </button>
    </form>
  )
}
