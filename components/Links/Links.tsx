'use client'

import { Tables } from '@/db_types'
import { useRef, useState } from 'react'
import { Modal } from '../Modal/Modal'
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

  return (
    <>
      <div className="mt-8">
        <div className="text-lg text-textDark font-bold mb-4 tracking-[1px]">
          链接列表
        </div>

        <ol className="grid grid-cols-1 gap-y-4">
          {links &&
            links.map((link) => {
              return (
                <li
                  key={link.id}
                  onClick={() => handleLinkClick(link)}
                  className="relative w-full rounded bg-white shadow-sm px-6 py-4 cursor-pointer flex justify-between items-center text-sm"
                >
                  {link.name}
                </li>
              )
            })}
        </ol>
      </div>
      <Modal
        title="编辑链接"
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
            spellCheck={false}
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
