'use server'

import { getToastRedirect } from '@/utils/helpers/helpers'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export const signInWithPasswordAndUserName = async (formData: FormData) => {
  const pathname = String(formData.get('pathname')).trim()
  const username = String(formData.get('username')).trim()
  const password = String(formData.get('password')).trim()
  const supabase = createClient()
  const cookieStore = cookies()
  let redirectURL: string
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .maybeSingle()

  if (error) {
    redirectURL = getToastRedirect(pathname, 'error', error.message)
  }

  if (data) {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: data.email,
      password,
    })
    if (error) {
      redirectURL = getToastRedirect(pathname, 'error', error.message)
    } else if (user) {
      cookieStore.set('preferredSignInView', 'password_signin', { path: '/' })
      redirectURL = getToastRedirect('/dashboard', 'status', '登录成功!')
    } else {
      redirectURL = getToastRedirect(pathname, 'error', '服务器内部发生了错误')
    }
  } else {
    redirectURL = getToastRedirect(pathname, 'error', '用户名或密码错误')
  }

  return redirectURL
}
