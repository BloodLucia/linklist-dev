import { SetupYourPage } from '@/components/Forms/SetupYourPage'
import { getDbUser } from '@/utils/supabase/auth-helpers/queries'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Setup your page',
}
export default async function Page() {
  const supabase = createClient()
  const dbUser = await getDbUser(supabase)
  if (!dbUser) {
    return redirect('/signin/password_signin')
  }
  if (dbUser.stepped) {
    return redirect('/dashboard')
  }
  return (
    <>
      <div className="min-h-screen py-20">
        <div>
          <div className="font-bold text-center text-[var(--dark-color)] leading-7 text-2xl mb-2">
            设置你的页面!
          </div>
          <div className="text-center mt-2 leading-4 font-normal text-sm">
            linklist.one/
            <span className="text-[var(--primary-color)] cursor-pointer hover:underline">
              {dbUser.username}
            </span>
            {'🎉'}
          </div>
        </div>
        <SetupYourPage user={dbUser!} />
      </div>
    </>
  )
}
