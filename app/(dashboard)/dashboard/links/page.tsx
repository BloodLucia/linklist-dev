import { getLinksForUser } from '@/utils/supabase/database/profile'
import { createClient } from '@/utils/supabase/server'
import { Links } from '@/components/Links/Links'


export default async function Page() {
  const supabase = createClient()
  const [links] = await Promise.all([getLinksForUser(supabase)])

  return <Links /> 
}
