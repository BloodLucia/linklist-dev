'use client'

import { Tables } from '@/db_types'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { createProfileForUser } from '@/utils/supabase/database/profile'
import { Camera } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '../Inputs/Input'
import { Button } from '../Buttons/Button'

export const SetupYourPage = ({ user }: { user: Tables<'users'> }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, createProfileForUser, router)
    setIsLoading(false)
  }
  return (
    <div className="max-md:w-full max-sm:px-6 bg-white md:w-[450px] mx-auto mt-8">
      <form
        className="max-w-full flex flex-col gap-x-6"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-x-6 items-center max-sm:flex-col max-sm:gap-y-6 max-sm:items-stretch">
          <div className="max-sm:mx-auto rounded-full cursor-pointer w-[115px] h-[115px] flex justify-center items-center border-2 border-dashed border-[#6e6d7a] bg-white shrink">
            <Camera color="#6e6d7a" />
          </div>
          <div className="flex flex-col gap-y-4 flex-1 max-sm:items-stretch">
            <Input
              type="text"
              name="title"
              placeholder="你希望你的链接主页叫什么名字?"
              autoComplete="off"
              required
            />
            <Input
              type="text"
              name="description"
              placeholder="介绍一下吧你的链接主页!"
              autoComplete="off"
              required
            />
            <input type="hidden" name="username" value={user.username} />
          </div>
        </div>
        <div className="mt-8 mb-2 ">
          <div className="font-semibold text-base">添加你的第一个链接</div>
          <div className="border px-3 mt-4 flex flex-col">
            <input
              type="text"
              name="linkName"
              placeholder="链接名称 (eg. My Instagram)"
              className="border-b outline-none py-3 w-full text-inherit bg-white"
              required
              autoComplete="off"
            />
            <input
              type="url"
              name="linkURL"
              placeholder="链接URL (eg. https://instagram.com/yourname)"
              className="outline-none py-3 w-full text-inherit bg-white"
              required
              autoComplete="off"
            />
          </div>
        </div>
        <Button type="submit" className="mt-6" disabled={isLoading}>
          立即开始
        </Button>
      </form>
    </div>
  )
}
