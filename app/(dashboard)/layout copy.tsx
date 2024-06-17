import { DashboardSlot } from '@/components/Dashboard/DashboardSlot'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // const supabase = createClient()
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession()
  // if (!session) {
  //   return redirect('/signin')
  // }
  // const dbUser = await getDbUser(supabase)
  return (
    <div className="min-h-screen w-full h-full text-inherit bg-[#f9f9f9] overflow-y-auto">
      <header className="w-full h-[60px] fixed top-0 left-0 right-0 z-10 bg-white border-b border-b-[var(--greybg-color)] box-border">
        <div className="max-w-6xl h-full max-sm:px-6 mx-auto flex justify-between items-center backdrop-blur-2xl">
          <h1>Oh My Link</h1>
          {/* <HeaderSlot user={dbUser} pages={[]} /> */}
        </div>
      </header>
      <div className="mt-[60px] w-full h-full">
        <DashboardSlot>{children}</DashboardSlot>
      </div>
    </div>
  )
}
