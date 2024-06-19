import Image from 'next/image'
import Link from 'next/link'
import { Calistoga } from 'next/font/google'

const font = Calistoga({ weight: '400', subsets: ['latin'] })

export const SiteHeader: React.FC<{ logged?: boolean }> = ({
  logged = false,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 border-b border-b-[#dee2e6] box-border bg-[#f9f9f9] py-2">
      <div className="xl:max-w-6xl mx-auto px-4 flex justify-between items-center max-md:w-full h-full">
        <Link
          href="/"
          className={`inline-flex gap-x-3 items-center text-xl ${font.className}`}
        >
          <Image
            className="align-middle"
            src="/logo.svg"
            width={32}
            height={32}
            alt="LinkList"
            decoding="auto"
            loading="eager"
          />
          LinkList
        </Link>
      </div>
    </header>
  )
}
