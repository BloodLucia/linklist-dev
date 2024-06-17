import { Tables } from '@/db_types'
import { getDbUser } from '@/utils/supabase/auth-helpers/queries'
import { createClient } from '@/utils/supabase/server'
import { User } from '@supabase/supabase-js'
import { DashboardHeader } from '../Header/DashboardHeader'

export const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const supabase = createClient()
  const { user }: { user: User } = (await supabase.auth.getUser()).data as {
    user: User
  }
  const dbUser: Tables<'users'> = (await getDbUser(supabase)) as Tables<'users'>
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  const isLoading = !data && !dbUser && error

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] overflow-x-hidden">
      <DashboardHeader />
      {children}
    </div>
  )
}
