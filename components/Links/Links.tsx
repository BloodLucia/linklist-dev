'use client'

import { Tables } from '@/db_types'
import s from './Links.module.css'
import { useRef, useState } from 'react'
import { Modal } from '../Modal/Modal'
import { usePathname, useRouter } from 'next/navigation'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { updateLink } from '@/utils/supabase/database/profile'
import { Button } from '../Buttons/Button'
import { Input } from '../Inputs/Input'
import { Ellipsis, Link } from 'lucide-react'
import { Reorder } from 'framer-motion'

export const Links: React.FC<{ links: Tables<'links'>[] | null }> = ({
  links,
}) => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLink, setSelectedLink] = useState<Tables<'links'>>()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [_links, setLinks] = useState<Tables<'links'>[]>(links!)
  const [items, setItems] = useState([0, 1, 2, 3])
  const handleLinkClick = (link: Tables<'links'>) => {
    setSelectedLink(link)
    setIsOpenModal(true)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, updateLink, router)
    setIsLoading(false)
    setIsOpenModal(false)
    formRef.current?.reset()
  }
  return (
    <>
      <div className="mt-8">
        <div className="text-lg text-textDark font-bold mb-4 tracking-[1px]">
          链接列表
        </div>

        <Reorder.Group<Tables<'links'>>
          as="ol"
          axis="y"
          values={_links}
          onReorder={setLinks}
          className="grid grid-cols-1 gap-y-4"
        >
          {_links.map((item) => (
            <Reorder.Item
              as="li"
              key={item.id}
              value={item}
              className="relative w-full rounded bg-white shadow-md px-6 py-4 cursor-pointer flex justify-between items-center text-sm"
            >
              <div className="grid grid-rows-2">
                <div className={s['name']}>{item.name}</div>
                <div className={s['url']}>
                  <Link width={12} height={12} />
                  {item.url}
                </div>
              </div>
              <div>
                <Ellipsis width={26} height={26} />
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {/* <ol className={s['root']}>
          {_links &&
            _links.map((link) => {
              return (
                <li
                  key={link.id}
                  className="relative w-full rounded bg-white shadow-md px-6 py-4 cursor-pointer flex justify-between items-center text-sm"
                  // onClick={() => handleLinkClick(link)}
                >
                  <div className="grid grid-rows-2">
                    <div className={s['name']}>{link.name}</div>
                    <div className={s['url']}>
                      <Link width={12} height={12} />
                      {link.url}
                    </div>
                  </div>
                  <div>
                    <Ellipsis width={26} height={26} />
                  </div>
                  <div className='absolute top-[100%] right-0 px-4 py-10 bg-black'></div>
                </li>
              )
            })}
        </ol> */}
      </div>
      <Modal
        title="Edit Link"
        visible={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="flex flex-col gap-y-4 items-stretch"
        >
          <Input
            type="text"
            name="name"
            placeholder="Title"
            defaultValue={selectedLink?.name}
            required
            autoCapitalize="off"
            autoComplete="off"
          />
          <Input
            type="url"
            name="url"
            placeholder="URL"
            defaultValue={selectedLink?.url}
            required
            autoCapitalize="off"
            autoComplete="off"
          />
          <Input type="hidden" name="pathname" defaultValue={usePathname()} />
          <Input type="hidden" name="id" defaultValue={selectedLink?.id} />
          <Button type="submit" disabled={isLoading}>
            保存
          </Button>
        </form>
      </Modal>
    </>
  )
}
