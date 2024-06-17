import { redirectToPath } from '@/utils/supabase/auth-helpers/server'

export default async function Page() {
  return await redirectToPath('/dashboard/links')
}
