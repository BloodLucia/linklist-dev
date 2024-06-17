'use client'

import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { signUp } from '@/utils/supabase/auth-helpers/server'
import { Link2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const SignUp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
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
      <h2 className="font-bold text-lg mb-4">
        <div className="flex justify-center items-center gap-1 text-[var(--blue-color)] text-2xl sm:hidden cursor-pointer">
          <Link2 width={42} height={42} />
          Oh My Link
        </div>
        <div className="max-sm:hidden font-bold text-xl">登录</div>
      </h2>
      <input
        type="text"
        name="email"
        placeholder="邮箱"
        required
        autoComplete="email"
        className="bl-input"
      />
      <div className="relative">
        <div className="absolute text-sm text-[var(--dark-color)] top-[25%] left-4 font-normal">
          oml.lol/
        </div>
        <input
          name="username"
          type="text"
          required
          placeholder="username"
          className="bl-input preffix-label"
          maxLength={20}
        />
      </div>
      <input
        type="password"
        name="password"
        placeholder="密码"
        required
        autoComplete="current-password"
        className="bl-input"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded mt-3 h-[40px] px-3 bg-[var(--primary-color)] text-white text-base font-semibold flex justify-center items-center w-full"
      >
        {isLoading ? '加载中...' : '注册'}
      </button>
    </form>
  )
}
