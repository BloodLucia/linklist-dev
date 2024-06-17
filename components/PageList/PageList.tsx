import { Tables } from '@/db_types'
import Image from 'next/image'

export const PageList: React.FC<{ pageList: Tables<'profiles'>[] }> = ({
  pageList,
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      {pageList &&
        pageList.map((page) => {
          return (
            <div key={page.id} className="p-3 border flex gap-x-3 items-center">
              <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
                <Image
                  src={`${page.picture}`}
                  width={45}
                  height={45}
                  alt=""
                  decoding="async"
                  loading="lazy"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1 flex flex-col gap-y-1 text-sm">
                <div>{page.title}</div>
                <div>{page.description}</div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
