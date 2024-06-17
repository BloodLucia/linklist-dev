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
        'text-[var(--dark-color)] text-base text-center box-border border-b-transparent border-b-2 h-[64px] inline-flex justify-center items-center',
        isActive && 'text-[var(--primary-color)] border-b-2 border-b-[var(--primary-colo)] bg-slate-100/50'
      )}
    >
      {children}
    </a>
  )
}
