'use server'

import { getToastRedirect, getURL } from '@/utils/helpers/helpers'
import { createClient } from '@/utils/supabase/server'
import { validate } from 'email-validator'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function redirectToPath(path: string) {
  return redirect(path)
}

export const signInWithUsernameAndPassword = async (formData: FormData) => {
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

  // 未能找到数据不会报错
  if (error) {
    redirectURL = getToastRedirect('/signin', 'error', error.message)
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
      redirectURL = getToastRedirect('/signin', 'error', error.message)
    } else if (user) {
      cookieStore.set('preferredSignInView', 'password_signin', { path: '/' })
      redirectURL = getToastRedirect('/', 'status', 'You are now logged')
    } else {
      redirectURL = getToastRedirect(
        '/signin',
        'error',
        'Internal server error'
      )
    }
  } else {
    redirectURL = getToastRedirect(
      '/signin',
      'error',
      'Invalid login credentials'
    )
  }

  return redirectURL
}

export const signInWithPassword = async (formData: FormData) => {
  const cookieStore = cookies()
  const supabase = createClient()
  const email = String(formData.get('email')).trim()
  const password = String(formData.get('password')).trim()
  let redirectPath: string

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirectPath = getToastRedirect('/signin', 'error', error.message)
  } else if (data.user) {
    cookieStore.set('preferredSignInView', 'password_signin', { path: '/' })
    redirectPath = getToastRedirect(
      '/dashboard',
      'status',
      'You are now signed in.'
    )
  } else {
    redirectPath = getToastRedirect(
      '/signin',
      'error',
      'You could not be signed in.'
    )
  }

  return redirectPath
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

export const signOut = async (formData: FormData) => {
  const pathName = String(formData.get('pathName')).trim()
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return getToastRedirect(pathName, 'error', 'You could not be signed out.')
  } else {
    return getToastRedirect('/signin', 'status', 'You are now logged out.')
  }
}
