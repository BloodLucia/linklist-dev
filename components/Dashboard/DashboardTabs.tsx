'use client'

import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TabLink: React.FC<React.PropsWithChildren<{ href: string }>> = ({
  href,
  children,
}) => {
  const pathname = usePathname()
  const isActive = href === pathname
  return (
    <Link
      href={href}
      className={cn(
        'py-3 border-b-2 border-b-[var(--greybg-color)] text-center text-[var(--dark-color)]',
        isActive &&
          'border-b-[var(--primary-color)] text-[var(--primary-color)]'
      )}
    >
      {children}
    </Link>
  )
}

export const DashboardTabs: React.FC = () => {
  const _href = (href: string) => `/dashboard/${href}`  
  return (
    <div className="w-full  grid grid-cols-5 items-center box-border max-md:hidden">
      <TabLink href={_href('links')}>Links</TabLink>
      <TabLink href={_href('design')}>Design</TabLink>
      <TabLink href={_href('posts')}>Posts</TabLink>
      <TabLink href={_href('stats')}>Stats</TabLink>
      <TabLink href={_href('settings')}>Settings</TabLink>
    </div>
  )
}
