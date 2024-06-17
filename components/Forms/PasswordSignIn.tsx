'use client'

import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import {
  signInWithUsernameAndPassword,
} from '@/utils/supabase/auth-helpers/server'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '../Input/Input'

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
      action="POST"
      className="flex flex-col gap-y-4 items-stretch bg-white"
    >
      <h2 className="mb-4 font-semibold text-base text-[var(dark-color)] max-md:text-xl max-md:text-center">
        SIGN IN
      </h2>
      <Input
        type="text"
        name="username"
        placeholder="Username"
        autoComplete="username"
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="disabled:cursor-not-allowed oml-bg oml-btn text-white rounded mt-4 flex justify-center items-center"
      >
        {isLoading ? <LoaderCircle className="animate-spin" /> : 'SIGN IN'}
      </button>
    </form>
  )
}
