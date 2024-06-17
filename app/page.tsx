import { redirectToPath } from '@/utils/supabase/auth-helpers/server'

export const metadata = {
  title: 'Oh My Link',
  description: 'Oh My Link',
}
export default async function Home() {
  return await redirectToPath('/dashboard/links')
}
