import { Database } from '@/db_types'
import { SupabaseClient } from '@supabase/supabase-js'
import { cache } from 'react'

export const getDbUser = cache(async (supabase: SupabaseClient<Database>) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return null
  }
  // query database by username or email
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!data || error) {
    return null
  }

  return data
})
