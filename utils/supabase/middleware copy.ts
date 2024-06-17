import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { Database } from '@/db_types'
import { getDbUser } from './auth-helpers/queries'

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            // If the cookie is updated, update the cookies for the request and response
            request.cookies.set({
              name,
              value,
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: CookieOptions) {
            // If the cookie is removed, update the cookies for the request and response
            request.cookies.set({
              name,
              value: '',
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value: '',
              ...options,
            })
          },
        },
      }
    )

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    // const pathname = request.nextUrl.pathname
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser()
    // const { data: dbUser } = await supabase
    //   .from('users')
    //   .select('*')
    //   .eq('user_id', user!.id)
    //   .maybeSingle()
    // const isAuthorized = user && dbUser

    // if (!user && !pathname.startsWith('/signin')) {
    //   return NextResponse.redirect(
    //     new URL('/signin/password_signin', request.url)
    //   )
    // }

    // if (isAuthorized && !dbUser.stepped && pathname !== '/setup-your-page') {
    //   return NextResponse.redirect(new URL('/setup-your-page', request.url))
    // }

    // if (isAuthorized && !pathname.startsWith('/dashboard')) {
    //   return NextResponse.redirect(new URL('/dashboard', request.url))
    // }
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const {data: dbUser} = await supabase
      .from('users')
      .select('*')
      .eq('user_id', user!.id)
      .maybeSingle()

    return { user, dbUser, response }
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}
