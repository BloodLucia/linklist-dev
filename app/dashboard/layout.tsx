import { DashboardTabs } from '@/components/Dashboard/DashboardTabs'
import { DashboardHeader } from '@/components/Header/DashboardHeader'
import { ProfilePreview } from '@/components/ProfilePreview/ProfilePreview'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import type { Viewport } from 'next'
import { TopNav } from '@/components/Mobile/TopNav'

export const viewport: Viewport = {
  userScalable: false,
}
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return redirect('/signin')
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <DashboardHeader />
      <TopNav />
      <main className="max-md:pt-[110px] pt-[60px] overflow-y-auto">
        <div className="grid grid-cols-2 max-md:grid-cols-1">
          <aside className="max-md:hidden bg-white flex justify-center items-center">
            {/* <ProfilePreview username={dbUser?.username} /> */}
          </aside>
          <div className="px-10 py-12 max-md:w-full max-md:px-6 max-md:py-10">
            <DashboardTabs />
            <div className="md:mt-8">{children}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
