'use client'

import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import {
  signInWithPassword,
  signInWithUsernameAndPassword,
} from '@/utils/supabase/auth-helpers/server'
import { Link2, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import Button from '../Button'
import { useRouter } from 'next/navigation'

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
      {/* <h2 className="font-bold text-lg mb-4">
        <div className="flex justify-center items-center gap-1 text-[var(--blue-color)] text-2xl sm:hidden cursor-pointer">
          <Link2 width={42} height={42} />
          Oh My Link
        </div>
        <div className="max-sm:hidden font-bold text-xl">Sign In</div>
      </h2> */}
      <h2 className='mb-4 font-semibold text-base text-[var(dark-color)] max-md:text-xl max-md:text-center'>
        SIGN IN
      </h2>
      {/* <input
        type="email"
        name="email"
        placeholder="邮箱"
        required
        autoComplete="email"
        className="bl-input"
      /> */}
      <input
        type="text"
        name="username"
        placeholder="Username"
        required
        autoComplete="username"
        className="bl-input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        autoComplete="current-password"
        className="bl-input"
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
