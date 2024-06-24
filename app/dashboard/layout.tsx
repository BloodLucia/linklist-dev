import type { Viewport } from 'next'
import { DashboardHeader } from '@/components/Header/DashboardHeader'
import { ProfilePreview } from '@/components/ProfilePreview/ProfilePreview'
import { ProfilePreview as MobileProfilePreview } from '@/components/Mobile/ProfilePreview'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getDbUser } from '@/utils/supabase/auth-helpers/queries'
import { Tables } from '@/db_types'
import { DashboardTabs } from '@/components/Layout/DashboardTabs'
import { MobileTopNav } from '@/components/Layout/TopNav'
import { FloatButton } from '@/components/Buttons/FloatButton'

export const viewport: Viewport = {
  userScalable: false,
}
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = createClient()
  let dbUser: Tables<'users'> | null
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return redirect('/signin/password_signin')
  } else {
    dbUser = await getDbUser(supabase)
    if (dbUser && !dbUser.stepped) {
      return redirect('/setup-your-page')
    }
  }

  return (
    <div className="min-h-dvh w-full h-full bg-[#f9f9f9] relative overflow-hidden">
      <DashboardHeader user={dbUser} />
      <MobileTopNav />
      <main className="w-full h-full max-md:pt-[110px] pt-[60px] overflow-y-auto">
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
      {/* <MobileProfilePreview user={dbUser} /> */}
      {/* <FloatButton /> */}
    </div>
  )
}
