import { PasswordSignIn } from '@/components/Forms/PasswordSignIn'
import { SignUp } from '@/components/Forms/SignUp'
import {
  getAuthTypes,
  getDefaultSignInView,
  getRedirectMethod,
  getViewTypes,
} from '@/utils/supabase/auth-helpers/settings'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id  
  const metaMap: Record<string, Metadata> = {
    'password_signin': {
      title: 'Sign In · Oh My Link',
      description: 'Sign In · Oh My Link',
    },
    'signup': {
      title: 'Sign Up · Oh My Link',
      description: 'Sign Up · Oh My Link',
    },
  }

  return {
    title: metaMap[id].title,
    description: metaMap[id].description,
  }
}

export default async function SignIn({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { disable_button: boolean }
}) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes()
  const viewTypes = getViewTypes()
  const redirectMethod = getRedirectMethod()
  // Declare 'viewProp' and initialize with the default value
  let viewProp: string

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof params.id === 'string' && viewTypes.includes(params.id)) {
    viewProp = params.id
  } else {
    const preferredSignInView =
      cookies().get('preferredSignInView')?.value || null
    viewProp = getDefaultSignInView(preferredSignInView)
    return redirect(`/signin/${viewProp}`)
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user && viewProp !== 'update_password') {
    return redirect('/dashboard/links')
  } else if (!user && viewProp === 'update_password') {
    return redirect('/signin')
  }

  return (
    <>
      {viewProp === 'password_signin' && <PasswordSignIn />}
      {viewProp === 'signup' && <SignUp />}

      <div className="px-8 text-center text-xs text-[var(--grey-color)] mt-5">
        {viewProp === 'password_signin' ? (
          <>
            Don&apos;t have an account?{' '}
            <a
              href="/signin/signup"
              className="cursor-pointer underline text-[#B996F7]"
            >
              Sign up
            </a>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <a
              href="/signin/password_signin"
              className="cursor-pointer underline text-[#B996F7]"
            >
              Sign in
            </a>
          </>
        )}
      </div>
    </>
  )
}
