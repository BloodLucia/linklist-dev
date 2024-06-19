'use client'

import { Tables } from '@/db_types'
import s from './Links.module.css'
import { useRef, useState } from 'react'
import { Modal } from '../Modal/Modal'
import { Loader } from '../Loader/Loader'
import { usePathname, useRouter } from 'next/navigation'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { updateLink } from '@/utils/supabase/database/profile'
import { Button } from '../Buttons/Button'
import { Input } from '../Inputs/Input'

export const Links: React.FC<{ links: Tables<'links'>[] | null }> = ({
  links,
}) => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLink, setSelectedLink] = useState<Tables<'links'>>()
  const [isOpenModal, setIsOpenModal] = useState(false)
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
  const handleClick = async () => {
    const formData = new FormData(formRef.current!)
    setIsLoading(true)
  }
  return (
    <>
      <div className="mt-8">
        <div className={s['title']}>LINKS</div>
        <div className={s['root']}>
          {links &&
            links.map((link) => {
              return (
                <div
                  key={link.id}
                  className={s['item']}
                  onClick={() => handleLinkClick(link)}
                >
                  <div className="grid grid-rows-2">
                    <div className={s['name']}>{link.name}</div>
                    <div className={s['url']}>{link.url}</div>
                  </div>
                </div>
              )
            })}
        </div>
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
