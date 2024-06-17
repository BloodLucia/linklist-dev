import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getDefaultSignInView } from '@/utils/supabase/auth-helpers/settings'

export default function SignIn() {
  const preferredSignInView =
    cookies().get('preferredSignInView')?.value || null
  const defaultView = getDefaultSignInView(preferredSignInView)

  return redirect(`/signin/${defaultView}`)
}
