'use client'

import { getURL } from '@/utils/helpers/helpers'

export const ProfilePreview: React.FC<{ username?: string }> = ({
  username,
}) => {
  return (
    <aside className="bg-white h-screen flex justify-center items-center max-md:hidden">
      <div className="w-[350px] max-w-[350px] border-[15px] border-[#222] rounded-[40px] overflow-hidden max-h-[723px] h-[723px] scale-[0.7]">
        <iframe  src={`${getURL()}/${username}`} width="100%" height="100%" />
      </div>
    </aside>
  )
}
