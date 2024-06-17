'use client'

import { useSearchParams, usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Toaster as SonnerToaster, ToasterProps, toast } from 'sonner'

interface Props extends ToasterProps {}
export const Toaster: React.FC<Props> = (props) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const type = searchParams.get('type') as 'status' | 'error'
    const message = searchParams.get('message')
    const clearFn = () => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      const paramsToRemove = ['type', 'message']
      paramsToRemove.forEach((param) => newSearchParams.delete(param))
      const redirectPath = `${pathname}?${newSearchParams.toString()}`
      router.replace(redirectPath, { scroll: false })
    }

    switch (type) {
      case 'error':
        toast.error(message)
        clearFn()
        break
      case 'status':
        toast.success(message)
        clearFn()
        break
    }
  }, [searchParams])

  return (
    <SonnerToaster
      richColors
      position="top-center"
      duration={2500}
      {...props}
    />
  )
}
