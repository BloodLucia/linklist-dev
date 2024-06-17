import { UpdateProfile } from '@/components/Forms/UpdateProfile'
import { createClient } from '@/utils/supabase/server'

export default async function Design() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    const { data: dbProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()
    return (
      <div className="flex flex-col gap-y-8 max-sm:py-8">
        <UpdateProfile dbProfile={dbProfile} />
        <div>2</div>
      </div>
    )
  }
}
