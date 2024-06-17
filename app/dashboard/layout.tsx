import { DashboardHeader } from '@/components/Header/DashboardHeader'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return redirect('/signin')
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] overflow-x-hidden">
      <DashboardHeader />
      {children}
    </div>
  )
}
