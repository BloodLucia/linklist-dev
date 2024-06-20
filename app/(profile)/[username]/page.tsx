import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import { Quicksand } from 'next/font/google'
import cn from 'classnames'
import {
  getLinksByUserName,
  getProfileByUserName,
} from '@/utils/supabase/database/profile'
import type { Metadata, ResolvingMetadata } from 'next'

const quicksand = Quicksand({ weight: 'variable', subsets: ['latin'] })

type Props = {
  params: { username: string }
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { username } = params
  const supabase = createClient()
  const dbProfile = await getProfileByUserName(username, supabase)

  return {
    title: dbProfile?.title,
    description: dbProfile?.description,
  }
}

export default async function ProfilePage({
  params,
}: {
  params: { username: string }
}) {
  const supabase = createClient()
  const [profile, links] = await Promise.all([
    getProfileByUserName(params.username, supabase),
    getLinksByUserName(params.username, supabase),
  ])

  if (!profile) {
    return <div>not found</div>
  }
  return (
    <div
      className={cn(
        'flex justify-center min-h-screen overflow-y-auto w-full select-none',
        quicksand.className
      )}
    >
      <div className="w-[680px] max-sm:w-full max-sm:px-6 py-24">
        <Image
          src={`${profile?.picture}`}
          width={96}
          height={96}
          alt=""
          decoding="async"
          loading="lazy"
          className="mx-auto rounded-full overflow-hidden cursor-pointer w-[115px] h-[115px]"
        />
        <h1 className="text-black text-lg font-bold text-center mt-4">
          {profile?.title}
        </h1>
        <h2 className="text-center text-base font-normal leaidng-[22px] mt-3 transform-none">
          {profile?.description}
        </h2>
        <div className="mt-8 flex flex-col gap-y-3">
          {links &&
            links.map((link) => {
              return (
                <div
                  key={link.id}
                  className="relative rounded shadow-[4px_4px_0_#222222] transition-all duration-[0.14s] ease-out delay-0 box-border cursor-pointer hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                >
                  <div className="border-2 border-black bg-white rounded box-border h-full w-full absolute left-0 top-0 -z-10"></div>
                  <a
                    href={link?.url}
                    className="text-base font-normal text-black rounded min-h-[60px] box-border p-[10px] overflow-hidden decoration-none flex justify-center items-center"
                  >
                    {link?.name}
                  </a>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
