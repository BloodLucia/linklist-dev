'use client'

import { Tables } from '@/db_types'
import { Button } from '../Button/Button'
import { Input } from '../Inputs/Input'
import { useState } from 'react'
import { updateProfile } from '@/utils/supabase/database/profile'
import { useRouter } from 'next/navigation'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'

export const SaveProfile: React.FC<{ profile: Tables<'profiles'> }> = ({
  profile,
}) => {
  const router = useRouter()
  const [saveButtonIsVisible, setSaveButtonIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, updateProfile, router)
    setIsLoading(false)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value1 = e.target.value.trim()
    const value2 = e.target.defaultValue.trim()
    setSaveButtonIsVisible(value1 !== value2)
  }
  return (
    <div className="w-full bg-white p-6 shadow-sm">
      <form
        className="w-full flex flex-col items-stretch gap-y-4"
        onSubmit={handleSubmit}
      >
        <div className="rounded-full hover:bg-[#f8f8f8] bg-white relative flex justify-center items-center w-[115px] h-[115px] border-dashed border-2 border-[#6e6d7a] overflow-hidden mx-auto mb-4">
          <input
            type="file"
            name="file"
            className="opacity-0 absolute top-0 bottom-0 right-0 left-0 w-full h-full cursor-pointer"
            defaultValue={profile.picture!}
            required
          />
        </div>
        <Input
          placeholder="页面标题"
          required
          defaultValue={profile.title}
          onChange={handleChange}
        />
        <Input
          placeholder="页面描述"
          required
          defaultValue={profile.description}
          onChange={handleChange}
        />
        <Button
          type="submit"
          disabled={saveButtonIsVisible}
          loading={isLoading}
          className="mt-3"
        >
          保存
        </Button>
      </form>
    </div>
  )
}
