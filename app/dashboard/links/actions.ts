import { Database } from '@/db_types'
import type { SupabaseClient, PostgrestError } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'

export const getLinks = cache(async (supabase: SupabaseClient<Database>) => {
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('profile_id', '')
    .order('created_at')

  return data
})
