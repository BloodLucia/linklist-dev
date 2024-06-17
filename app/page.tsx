import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Oh My Link',
  description: 'Oh My Link',
}
export default async function Home() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return redirect('/signin')
  } else {
    return redirect('/dashboard')
  }
}
