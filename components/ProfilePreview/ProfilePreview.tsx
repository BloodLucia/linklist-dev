'use client'

import { getURL } from '@/utils/helpers/helpers'

export const ProfilePreview: React.FC<{ username?: string }> = ({
  username,
}) => {
  return (
    <div className="scale-75 w-[350px] max-w-[350px] border-[15px] border-[#222] rounded-[40px] overflow-hidden max-h-[723px] h-[723px]">
      <iframe src={`${getURL()}/${username}`} width="100%" height="100%" />
    </div>
  )
}
