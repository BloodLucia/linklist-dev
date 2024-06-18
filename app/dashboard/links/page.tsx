import { AddHeader } from '@/components/Forms/AddHeader'
import { AddLink } from '@/components/Forms/AddLink'
import { ProfileHeaders } from '@/components/Profile/ProfileHeaders'
import {
  getHeadersForUser,
  getLinksForUser,
} from '@/utils/supabase/database/profile'
import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = createClient()
  const [links, headers] = await Promise.all([
    getLinksForUser(supabase),
    getHeadersForUser(supabase),
  ])

  return (
    <>
      <AddLink />
      <AddHeader />
      <ProfileHeaders headers={headers} />
      <div className="mt-8">
        <div className="text-sm font-bold mb-4 tracking-[1px] text-[var(--grey-color)]">
          LINKS
        </div>
        <div className="grid grid-row-1 gap-y-4 mt-6">
          {links &&
            links.map((link) => {
              return (
                <div
                  key={link.id}
                  className="w-full rounded bg-white shadow-sm px-6 py-5 relative cursor-pointer flex justify-between items-center text-sm"
                >
                  <div className="grid grid-rows-2">
                    <div className="font-bold text-[var(--dark-color)]">
                      {link.name}
                    </div>
                    <div className="text-[var(--dark-color)] font-normal overflow-hidden text-ellipsis break-words cursor-pointer">
                      {link.url}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
