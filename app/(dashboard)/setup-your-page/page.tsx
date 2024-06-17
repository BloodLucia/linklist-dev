import { SetupYourPage } from '@/components/Forms/SetupYourPage'
import { getDbUser } from '@/utils/supabase/auth-helpers/queries'
import { createClient } from '@/utils/supabase/server'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Setup your page',
}
export default async function Page() {
  const supabase = createClient()
  const dbUser = await getDbUser(supabase)
  if (!dbUser) {
    return redirect('/signin')
  }
  return (
    <>
      <div className="mb-6 max-w-full max-sm:pt-8 sm:pt-24">
        <div className="font-bold text-center text-[var(--dark-color)] leading-7 text-2xl">
          Setup your page
        </div>
        <div className="text-center mt-2 leading-4 font-normal text-sm">
          Let's setup bio.link/
          <span className="text-[var(--primary-color)] cursor-pointer hover:underline">
            {dbUser.username}
          </span>{' '}
          🎉
        </div>
      </div>
      <SetupYourPage user={dbUser} />
    </>
  )
}
