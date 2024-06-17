'use client'

import { usePathname } from 'next/navigation'
import { MaxWidthWrapper } from '../Wrapper/MaxWidthWrapper'

export const DashboardSlot = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith('/dashboard')

  const renderComponent = () => {
    if (isDashboard) {
      return <>{children}</>
    } else {
      return <MaxWidthWrapper>{children}</MaxWidthWrapper>
    }
  }

  return renderComponent()
}
