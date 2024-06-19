import cn from 'classnames'
import Image from 'next/image'

export const Brand: React.FC<{ center?: boolean }> = ({ center = false }) => {
  return (
    <h1 aria-label="LinkList" className={cn('flex items-center gap-x-2', center && 'justify-center')}>
      <Image
        src="/logo.svg"
        width={32}
        height={32}
        alt="LinkList"
        decoding="async"
        loading="lazy"
      />
      <a href="/" className="text-black font-bold text-xl">
        LinkList
      </a>
    </h1>
  )
}
