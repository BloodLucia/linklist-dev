'use client'

import { Tables } from '@/db_types'
import { Card } from '../Card/Card'
import { LoaderCircle, X } from 'lucide-react'
import { useState } from 'react'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { updateProfile } from '@/utils/supabase/database/profile'

export const UpdateProfile: React.FC<{
  dbProfile: Tables<'profiles'> | null
}> = ({ dbProfile }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [saveButtonIsVisible, setSaveButtonIsVisible] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value1 = e.target.value.trim()
    const value2 = e.target.defaultValue.trim()
    setSaveButtonIsVisible(value1 !== value2)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, updateProfile)
    setIsLoading(false)
  }
  return (
    <Card title="profile">
      {/* <LoaderCircle className="animate-spin" /> */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-6 items-stretch"
      >
        <div className="mx-auto w-[115px] h-[115px] rounded-full relative">
          {/* <Image
            src={`${dbProfile?.picture}`}
            alt=""
            width={115}
            height={115}
            decoding="async"
            loading="lazy"
            className="mx-auto w-[115px] h-[115px] rounded-full"
          /> */}
          <div className="cursor-pointer absolute top-0 right-0 rounded-full w-4 h-4 bg-[var(--dark-color)] box-border flex justify-center items-center">
            <X color="#ffffff" width={24} height={24} />
          </div>
        </div>
        <input
          name="title"
          type="text"
          className="bl-input"
          defaultValue={dbProfile?.title}
          onChange={handleChange}
        />

        <input
          name="description"
          type="text"
          className="bl-input"
          defaultValue={dbProfile?.description}
          onChange={handleChange}
        />

        {saveButtonIsVisible && (
          <button
            disabled={isLoading}
            type="submit"
            className="oml-bg oml-btn text-white rounded text-base flex justify-center items-center mt-8"
          >
            Save
          </button>
        )}
      </form>
    </Card>
  )
}
