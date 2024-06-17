'use client'

import { usePathname } from 'next/navigation'
import cn from 'classnames'

export const BottomNavLink: React.FC<
  React.PropsWithChildren<{ to: string }>
> = ({ to, children }) => {
  const pathname = usePathname()
  const isActive = to === pathname
  return (
    <a
      href={to}
      className={cn(
        'text-[var(--dark-color)] text-base text-center box-border border-t-transparent border-t-2 h-[64px] inline-flex justify-center items-center',
        isActive &&
          'text-[var(--primary-color)] border-t-2 border-t-[var(--primary-colo)] '
      )}
    >
      {children}
    </a>
  )
}
