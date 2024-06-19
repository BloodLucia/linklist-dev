'use client'
import { Camera, LoaderCircle, X } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import cn from 'classnames'

interface Props {
  onUpload: (url: string) => void
  onError: (
    error: Partial<{ name: string; status: string; message: string }>
  ) => void
  className?: string
}
export const Uploader: React.FC<Props> = ({ className, onUpload, onError }) => {
  const supabase = createClient()
  const [isUploading, setIsUploading] = useState(false)
  const [_filename, setFilename] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  useEffect(() => {
    const _imageDownloader = async (path: string) => {
      try {
        const { data } = supabase.storage.from('uploads').getPublicUrl(path)
        if (data) {
          onUpload(data.publicUrl)
          setImgUrl(data.publicUrl)
        }
      } catch (error) {
        throw error
      }
    }
    if (_filename) _imageDownloader(_filename)
  }, [supabase, _filename])
  const doUpload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      setIsUploading(true)
      if (!e.target.files || e.target.files.length === 0) return false
      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filename = `${crypto.randomUUID()}-${new Date().getTime()}.${fileExt}`
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(filename, file)
      if (error) onError(error)
      if (data) setFilename(data.path)
    } catch (error) {
    } finally {
      setIsUploading(false)
    }
  }
  return (
    <div
      className={cn(
        'rounded-full hover:bg-[#f8f8f8] bg-white relative flex justify-center items-center w-[115px] h-[115px]',
        className,
        !!imgUrl
          ? 'border-none'
          : 'border-dashed border-2 border-[#6e6d7a] overflow-hidden'
      )}
    >
      {imgUrl === '' ? (
        <>
          <input
            type="file"
            name="file"
            disabled={isUploading}
            onChange={doUpload}
            id="profile-picture-image"
            className="opacity-0 absolute top-0 bottom-0 right-0 left-0 w-full h-full cursor-pointer"
            accept="image/*"
            required
          />
          {isUploading ? (
            <LoaderCircle className="text-primary animate-spin" />
          ) : (
            <Camera color="#6e6d7a" className="cursor-pointer" />
          )}
        </>
      ) : (
        <>
          <img
            src={imgUrl}
            width={115}
            height={115}
            decoding="async"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
          <X onClick={() => setImgUrl('')} className="absolute top-0 right-0 z-20 cursor-pointer bg-black text-white rounded-full" />
        </>
      )}
    </div>
  )
}
