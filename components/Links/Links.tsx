'use client'

import { Tables } from '@/db_types'
import { useRef, useState } from 'react'
import { Modal } from '../Modal/Modal'
import { usePathname, useRouter } from 'next/navigation'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { deleteLink, updateLink } from '@/utils/supabase/database/profile'
import { Button } from '../Buttons/Button'
import { Input } from '../Inputs/Input'
import { Link, LoaderCircle, Trash2 } from 'lucide-react'

export const Links: React.FC<{ links: Tables<'links'>[] | null }> = ({
  links,
}) => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteing, setIsDeleteing] = useState(false)
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
  const onLinkDelete = async () => {
    if (!selectedLink) return
    const formData = new FormData(formRef.current!)
    setIsDeleteing(true)
    const redirectUrl = await deleteLink(formData)
    setIsDeleteing(false)
    setIsOpenModal(false)
    formRef.current?.reset()
    router.push(redirectUrl)
    router.refresh()
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
                  className="relative w-full rounded bg-white shadow-sm px-6 py-4 cursor-pointer flex justify-between items-center"
                >
                  <div className="grid grid-rows-1 gap-y-1.5">
                    <span className="font-semibold text-base text-[var(--dark-color)]">
                      {link.name}
                    </span>
                    <span className="text-xs text-[var(--grey-color)] grid grid-flow-col items-center gap-x-1 text-ellipsis overflow-hidden break-all">
                      <Link width={16} height={16} />
                      {link.url}
                    </span>
                  </div>
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
          <input type="hidden" name="pathname" defaultValue={usePathname()} />
          <input type="hidden" name="id" defaultValue={selectedLink?.id} />
          <div
            onClick={onLinkDelete}
            className="text-left text-sm text-[var(--danger-color)] cursor-pointer flex justify-start items-center gap-x-1.5"
          >
            {isDeleteing ? (
              <>
                <LoaderCircle className="animate-spin" width={16} height={16} />
                <span>删除中...</span>
              </>
            ) : (
              <>
                <Trash2 width={16} height={16} />
                <span>删除链接</span>
              </>
            )}
          </div>
          <Button type="submit" loading={isLoading}>
            保存
          </Button>
        </form>
      </Modal>
    </>
  )
}
