'use client'

import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { signInWithPassword } from '@/utils/supabase/auth-helpers/server'
import { Link2 } from 'lucide-react'
import { useState } from 'react'
import Button from '../Button'

export const PasswordSignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, signInWithPassword)
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
      <input
        type="password"
        name="password"
        placeholder="密码"
        required
        autoComplete="current-password"
        className="bl-input"
      />
      <Button type="submit" loading={isLoading}>
        登录
      </Button>
    </form>
  )
}
