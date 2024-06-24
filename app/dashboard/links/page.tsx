import { AddLink } from '@/components/Forms/AddLink'
import { Links } from '@/components/Links/Links'
import { getLinksForUser } from '@/utils/supabase/database/profile'
import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = createClient()
  const [links] = await Promise.all([getLinksForUser(supabase)])

  return (
    <>
      <AddLink />
      <Links links={links} />
    </>
  )
}
