import { getLinksForUser } from '@/utils/supabase/database/profile'
import { createClient } from '@/utils/supabase/server'
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'


export default async function Page() {
  const supabase = createClient()
  const [links] = await Promise.all([getLinksForUser(supabase)])

  return (
    <DashboardLayout>
      links
    </DashboardLayout>
  )
}
