import { SaveProfile } from '@/components/Forms/SaveProfile'
import { Tables } from '@/db_types'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Design() {
  const supabase = createClient()
  const user = (await supabase.auth.getUser()).data.user
  let profile: Tables<'profiles'>
  if (!user) {
    return redirect('/signin/password_signin')
  } else {
    const { data }: { data: Tables<'profiles'> } = (await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()) as { data: Tables<'profiles'> }

    profile = data
  }

  // const profile = await getCurre
  return (
    <div className="grid gap-y-4">
      <div>正在开发中...</div>
      {/* <SaveProfile profile={profile} /> */}
    </div>
  )
}
