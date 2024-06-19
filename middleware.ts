import { NextResponse, type NextRequest } from 'next/server'
import { createClient, updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // const { supabase, response } = createClient(request)
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()
  // const { data: dbUser } = await supabase
  //   .from('users')
  //   .select('*')
  //   .eq('user_id', user?.id)
  //   .maybeSingle()
  // const isAuthorized = user && dbUser
  // const pathname = request.nextUrl.pathname

  // if (isAuthorized && !dbUser.stepped && pathname !== '/setup-your-page') {
  //   return NextResponse.redirect(new URL('/setup-your-page', request.url))
  // }

  // if (
  //   !isAuthorized &&
  //   pathname.startsWith('/dashboard') &&
  //   !pathname.startsWith('/signin')
  // ) {
  //   console.log('hello~~~')
  //   return NextResponse.redirect(
  //     new URL('/signin/password_signin', request.url)
  //   )
  // }

  return await updateSession(request)
  // return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/dashboard/(.*)',
  ],
}
