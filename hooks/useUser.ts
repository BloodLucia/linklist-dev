import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/db_types'

export const useUser = () =>
  useQuery({
    queryKey: ['useUser'],
    queryFn: async () => {
      const supabase = createClientComponentClient<Database>()
      const authUser = (await supabase.auth.getUser()).data.user
      if (authUser) {
        const dbUser = (
          await supabase
            .from('users')
            .select('*')
            .eq('user_id', authUser.id)
            .maybeSingle()
        ).data

        return dbUser
      }
      return null
    },
  })
