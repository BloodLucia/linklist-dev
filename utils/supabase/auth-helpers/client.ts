'use client'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { redirectToPath } from './server'

export const handleRequest = async (
  e: React.FormEvent<HTMLFormElement>,
  requestFunc: (formData: FormData) => Promise<string>,
  router: AppRouterInstance | null = null,
): Promise<void | boolean> => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  const redirectUrl: string = await requestFunc(formData)

  if (router) {
    return router.push(redirectUrl)
  } else {
    return await redirectToPath(redirectUrl)
  }
}
