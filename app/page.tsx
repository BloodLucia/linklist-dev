import { SiteContent } from '@/components/Layout/SiteContent'
import { SiteHeader } from '@/components/Layout/SiteHeader'
import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      <SiteHeader logged={!!user} />
      <SiteContent logged={!!user} />
    </div>
  )
}
