'use client'

import { Database, Tables } from '@/db_types'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { createProfileForUser } from '@/utils/supabase/database/profile'
import { Camera, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Input } from '../Inputs/Input'
import { Button } from '../Buttons/Button'
import { createClient } from '@/utils/supabase/client'

export const SetupYourPage = ({
  user,
  onUpload,
}: {
  user: Tables<'users'>
  onUpload?: (url: string) => void
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [profileUrl, setProfileUrl] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')
  const supabase = createClient()
  const storage = supabase.storage
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, createProfileForUser, router)
    setIsLoading(false)
  }
  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const {data} = storage.from('uploads').getPublicUrl(path)
        console.log(data);
        
        // if (error) {
        //   console.log(error)
        // }
        // const url = URL.createObjectURL(data!)
        // console.log(url)
        setPictureUrl(data.publicUrl)
      } catch (error) {
        console.log(error)
      }
    }
    if (profileUrl) {
      console.log(profileUrl)

      downloadImage(profileUrl)
    }
  }, [supabase, profileUrl])

  const uploadImage: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      setIsUploading(true)
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }
      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${
        user.id
      }-${crypto.randomUUID()}-${new Date().getTime()}.${fileExt}`
      const { data, error } = await storage
        .from('uploads')
        .upload(filePath, file)
      if (error) {
        throw error
      }
      console.log(data.path)
      // onUpload!(filePath)
      setProfileUrl(data.path)
    } catch (error) {
      console.log(error)
    } finally {
      setIsUploading(false)
    }
  }
  return (
    <div className="max-md:w-full max-md:px-6 bg-white md:w-[450px] mx-auto mt-8">
      <form
        className="max-w-full flex flex-col gap-x-6"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-x-6 items-center max-sm:flex-col max-sm:gap-y-6 max-sm:items-stretch">
          <div className="relative overflow-hidden hover:bg-[#f8f8f8] max-sm:mx-auto rounded-full cursor-pointer w-[115px] h-[115px] flex justify-center items-center border-2 border-dashed border-[#6e6d7a] bg-white shrink">
            {isUploading ? (
              <LoaderCircle className="text-primary animate-spin" />
            ) : (
              <Camera color="#6e6d7a" />
            )}
          {pictureUrl && <img src={pictureUrl} className='w-full h-full absolute object-center' alt=""  />}
            <input
              disabled={isLoading}
              type="file"
              name="file"
              id="profile-picture-image"
              className="opacity-0 absolute top-0 bottom-0 right-0 left-0 w-full h-full cursor-pointer"
              accept="image/*"
              required
              onChange={uploadImage}              
            />
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
