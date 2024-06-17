'use client'

import { useChanged } from '@/hooks/use-changed'
import { getURL } from '@/utils/helpers/helpers'
import { stringify } from 'querystring'
import { useEffect, useRef, useState } from 'react'

export const ProfilePreview: React.FC<{ username?: string }> = ({
  username,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [url, setUrl] = useState(`${getURL}/${username}?t=${new Date().getTime()}`)
  const { changed } = useChanged()
  useEffect(() => {
    console.log(changed);
    
  }, [changed])
  return (
    <aside className="bg-white h-screen flex justify-center items-center max-md:hidden">
      <div className="w-[350px] max-w-[350px] border-[15px] border-[#222] rounded-[40px] overflow-hidden max-h-[723px] h-[723px] scale-[0.7]">
        <iframe ref={iframeRef} src={`${getURL()}/${username}`} width="100%" height="100%" />
      </div>
    </aside>
  )
}
