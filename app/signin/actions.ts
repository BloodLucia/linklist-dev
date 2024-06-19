'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { cache } from 'react'

export const signInWithPasswordAndUserName = (formData: FormData) => {
  const pathname = String(formData.get('pathname')).trim()
  const username = String(formData.get('username')).trim()
  const password = String(formData.get('password')).trim()
  const supabase = createClient()
  const cookieStore = cookies()
  let redirectURL: string
}
