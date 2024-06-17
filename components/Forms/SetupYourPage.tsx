'use client'

import { Tables } from '@/db_types'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { createProfileForUser } from '@/utils/supabase/database/profile'
import { Camera } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const SetupYourPage = ({ user }: { user: Tables<'users'> }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, createProfileForUser, router)
    setIsLoading(false)
  }
  return (
    <div className="bg-white max-sm:w-full sm:w-[480px] sm:p-8 sm:rounded-lg sm:mx-auto sm:shadow-sm max-sm:mt-8">
      <form
        className="max-w-full flex flex-col gap-x-6"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-x-6 items-center max-sm:flex-col max-sm:gap-y-6 max-sm:items-stretch">
          <div className="max-sm:mx-auto rounded-full cursor-pointer w-[115px] h-[115px] flex justify-center items-center border-2 border-dashed border-[#6e6d7a] bg-white shrink">
            <Camera color="#6e6d7a" />
          </div>
          <div className="flex flex-col gap-y-4 flex-1 max-sm:items-stretch">
            <input
              type="text"
              name="title"
              placeholder="Your name"
              className="bl-input"
              autoComplete="off"
              required
            />
            <input
              type="text"
              name="description"
              placeholder="bio"
              className="bl-input"
              autoComplete="off"
              required
            />
            <input type="hidden" name="username" value={user.username} />
          </div>
        </div>
        <div className="mt-8 mb-2 ">
          <div className="font-semibold text-base">Add your first link</div>
          <div className="border px-3 mt-4 flex flex-col">
            <input
              type="text"
              name="linkName"
              placeholder="Link name (eg. My Instagram)"
              className="border-b outline-none py-3 w-full text-inherit"
              required
              autoComplete="off"
            />
            <input
              type="text"
              name="linkURL"
              placeholder="URL (eg. https://instagram.com/yourname)"
              className="outline-none py-3 w-full text-inherit"
              required
              autoComplete="off"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 oml-bg oml-btn h-[40px] rounded text-white leading-7 font-semibold flex-both-center"
        >
          GET STARTED
        </button>
      </form>
    </div>
  )
}
