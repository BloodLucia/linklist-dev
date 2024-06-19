'use server'

import { getToastRedirect, getURL } from '@/utils/helpers/helpers'
import { createClient } from '@/utils/supabase/server'
import { validate } from 'email-validator'
import { cookies } from 'next/headers'

export const existsByUserName = async (username: string) => {
  const supabase = createClient()
  const data = (
    await supabase.from('profiles').select('*').eq('username', username)
  ).data
  return !!data && data.length > 0
}

export const signUp = async (formData: FormData) => {
  const callbackURL = getURL('/auth/callback')
  const supabase = createClient()
  const email = String(formData.get('email')).trim()
  const password = String(formData.get('password')).trim()
  const username = String(formData.get('username')).trim()
  const pathname = String(formData.get('pathname')).trim()
  let redirectPath: string

  if (!validate(email)) {
    redirectPath = getToastRedirect(
      '/signin/signup',
      'error',
      'Invalid email address.'
    )
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: callbackURL,
    },
  })

  if (error) {
    console.log(error.code)
    redirectPath = getToastRedirect(pathname, 'error', error.message)
  } else if (data.session) {
    // save a user to database
    const { data, error } = await supabase
      .from('users')
      .insert({ username, email })
      .select()
    if (!error && data.length > 0 && data[0].id > 0) {
      redirectPath = getToastRedirect(
        '/setup-your-page',
        'status',
        'You are now signed in.'
      )
    } else if (error) {
      redirectPath = getToastRedirect(pathname, 'error', error?.message)
    } else {
      redirectPath = getToastRedirect(
        pathname,
        'error',
        'Internal Server Error.'
      )
    }
  } else if (
    data.user &&
    data.user.identities &&
    data.user.identities.length == 0
  ) {
    redirectPath = getToastRedirect(
      pathname,
      'error',
      'There is already an account associated with this email address. Try resetting your password.'
    )
  } else if (data.user) {
    redirectPath = getToastRedirect(
      '/dashboard',
      'status',
      'Please check your email for a confirmation link. You may now close this tab.'
    )
  } else {
    redirectPath = getToastRedirect(
      pathname,
      'error',
      'You could not be signed up.'
    )
  }

  return redirectPath
}

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
