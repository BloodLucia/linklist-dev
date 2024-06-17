import { DashboardTabs } from '@/components/Dashboard/DashboardTabs'
import { DashboardHeader } from '@/components/Header/DashboardHeader'
import { ProfilePreview } from '@/components/ProfilePreview/ProfilePreview'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

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
  const dbUser = (
    await supabase
      .from('users')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()
  ).data

  if (dbUser && !dbUser.stepped) {
    return redirect('/setup-your-page')
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <DashboardHeader />
      <div className="md:hidden fixed top-[60px] left-0 w-full max-md:bg-white border-b grid grid-cols-5 items-stretch text-sm box-border h-[50px] text-center">
        <Link
          className="inline-flex justify-center items-center border-b-2 border-b-[var(--primary-color)] text-[var(--primary-color)] box-border"
          href="/dashboard/links"
        >
          Links
        </Link>
        <Link
          className="inline-flex justify-center items-center border-b-2 border-b-transparent box-border"
          href="/dashboard/design"
        >
          Design
        </Link>
        <Link
          className="inline-flex justify-center items-center border-b-2 border-b-transparent box-border"
          href="/dashboard/posts"
        >
          Posts
        </Link>
        <Link
          className="inline-flex justify-center items-center border-b-2 border-b-transparent box-border"
          href="/dashboard/stats"
        >
          Stats
        </Link>
        <Link
          className="inline-flex justify-center items-center border-b-2 border-b-transparent box-border"
          href="/dashboard/settings"
        >
          Settings
        </Link>
      </div>
      <main className="max-md:pt-[110px] pt-[60px] overflow-y-auto">
        <div className="grid grid-cols-2 max-md:grid-cols-1">
          <aside className="max-md:hidden bg-white flex justify-center items-center">
            <ProfilePreview username={dbUser?.username} />
          </aside>
          <div className="px-10 py-12 max-md:w-full max-md:px-6 max-md:py-8">
            <DashboardTabs />
            <div className="py-8">{children}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
