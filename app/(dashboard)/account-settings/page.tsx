import { PageList } from '@/components/PageList/PageList'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return redirect('/signin')
  }
  const { data: pages } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
  return (
    <div className="max-sm:py-12 py-24 w-[600px] mx-auto max-sm:w-full max-sm:min-h-screen">
      <div className="mb-6 font-semibold text-2xl leading-6 text-[var(--dark-color)] max-sm:text-center">
        Links
      </div>
      <div className="p-8 rounded shadow-sm bg-white w-full mt-8">
        <div className="text-base font-semibold mb-4 text-[var(--dark-color)]">
          My Pages
        </div>
        <PageList pageList={pages!} />
      </div>
      <div className="p-8 rounded shadow-sm bg-white w-full mt-8">
        <div className="text-base font-semibold mb-4 text-[var(--dark-color)]">
          Current plan
        </div>
        <div>Coming soon...</div>
      </div>
      <div className="p-8 rounded shadow-sm bg-white w-full mt-8">
        <div className="text-base font-semibold mb-4 text-[var(--dark-color)]">
          Account
        </div>
        <div>Coming soon...</div>
      </div>
      <div className="p-8 rounded shadow-sm bg-white w-full mt-8">
        <div className="text-base font-semibold text-[var(--dark-color)]">
          Danger Zone
        </div>
        <div className="mt-4 text-[var(--grey-color)] leading-[17px] text-sm font-normal">
          Deleting your account permanently deletes your page and all your data.
        </div>
        <button className="mt-8 h-[40px] hover:bg-[var(--danger-dark-color)] flex-both-center text-white font-bold text-sm px-12 rounded cursor-pointer bg-[var(--danger-color)]">
          Delete Account
        </button>
      </div>
    </div>
  )
}
