import { AddHeader } from '@/components/Forms/AddHeader'
import { AddLink } from '@/components/Forms/AddLink'
import { Links } from '@/components/Links/Links'
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
      <Links links={links} />
    </>
  )
}
