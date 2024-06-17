import { AddHeader } from '@/components/Forms/AddHeader'
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

  console.log(headers)

  return (
    <>
      <div className="grid grid-flow-col gap-x-2 ">
        <button className="oml-bg oml-btn text-white rounded flex justify-center items-center">
          ADD LINK
        </button>
        <button className="bg-[--primary-color] text-white rounded flex justify-center items-center font-semibold">
          ADD EMBED
        </button>
      </div>
      <AddHeader />
      <ProfileHeaders headers={headers} />
    </>
  )
}
