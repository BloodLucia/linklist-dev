'use client'

import { Tables } from '@/db_types'
import { Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const HeaderSlot: React.FC<{
  user: Tables<'users'>
  pages?: Tables<'profiles'>[] | []
}> = ({ user, pages = [] }) => {
  const path = usePathname()

  const renderComponent = () => {
    if (!path.startsWith('/dashboard')) {
      return (
        <div className="flex gap-x-3">
          <Image
            src={`${pages[0].picture}`}
            alt=""
            width={36}
            height={36}
            className="w-full h-full rounded-full overflow-hidden"
          />
        </div>
      )
    } else {
      return (
        <div className="flex gap-x-4 items-center">
          <Link
            href=""
            className="text-gradient font-semibold text-sm flex justify-center items-center gap-x-1 leading-4"
          >
            <Zap
              width={16}
              height={16}
              className="align-middle"
              fill="url(#paint0_linear_442_1256)"
            />
            Upgrade
          </Link>
          <Link
            href=""
            className="text-[var(--primary-color)] underline"
          >{`https://bio.link/${user.username}`}</Link>
          <div>Share</div>
          <div className="flex gap-x-3 items-center">
            <div className="w-[36px] h-[36px] rounded-full bg-red-400"></div>
          </div>
        </div>
      )
    }
  }

  return renderComponent()
}
