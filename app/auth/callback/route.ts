import { getToastRedirect } from '@/utils/helpers/helpers'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the `@supabase/ssr` package. It exchanges an auth code for the user's session.
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(
        getToastRedirect(
          `${requestUrl.origin}/signin`,
          'error',
          "Sorry, we weren't able to log you in. Please try again."
        )
      )
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(
    getToastRedirect(
      `${requestUrl.origin}/dashboard`,
      "status",
      'You are now signed in.'
    )
  )
}
