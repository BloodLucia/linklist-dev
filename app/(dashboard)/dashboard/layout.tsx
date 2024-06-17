import { DashboardHeader } from '@/components/Header/DashboardHeader'
import { ProfilePreview } from '@/components/ProfilePreview/ProfilePreview'
import { Tabs } from '@/components/Tabs/Tabs'
import { createClient } from '@/utils/supabase/server'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user!.id)
    .maybeSingle()

  return (
    <div className="w-full min-h-screen bg-[#f9f9f9] overflow-y-auto">
      <DashboardHeader username={data?.username} />
      <div className="max-md:mt-[100px] mt-[60px] w-full">
        <div className="grid grid-flow-col auto-cols-fr">
          <ProfilePreview  username={data?.username}/>
          <div className="md:p-8 h-screen">
            <Tabs />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
