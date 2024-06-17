import cn from 'classnames'
import { usePathname } from 'next/navigation'

export const TabLink: React.FC<{
  href: string
  text: string
  className?: string
}> = ({ href, text, className }) => {
  const pathname = usePathname()
  const _href = `/dashboard/${href}`
  const isActive = _href === pathname
  return (
    <a
      href={_href}
      className={cn(
        'text-base text-[var(--dark-color)] text-center border-b-2 border-b-transparent inline-flex h-[40px] justify-center items-center',
        className,
        isActive &&
          'text-[var(--primary-color)] border-b-2 border-b-[var(--primary-color)] font-semibold'
      )}
    >
      {text}
    </a>
  )
}
