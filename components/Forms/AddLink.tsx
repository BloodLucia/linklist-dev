'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Modal } from '../Modal/Modal'
import { useRef, useState } from 'react'
import { addLink } from '@/utils/supabase/database/profile'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { Button } from '../Buttons/Button'
import { Input } from '../Inputs/Input'

export const AddLink: React.FC = () => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement | null>(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, addLink, router)
    setIsLoading(false)
    setIsOpenModal(false)
    formRef.current?.reset()
  }

  return (
    <>
      <div className="grid grid-flow-col gap-x-2 ">
        <Button onClick={() => setIsOpenModal(true)}>添加链接</Button>
      </div>
      <Modal
        title="添加链接"
        visible={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          action="POST"
          className="flex flex-col items-stretch gap-y-4"
        >
          <Input name="name" placeholder="标题" required autoComplete="off" />
          <Input name="url" placeholder="URL" required autoComplete="off" />
          <input
            type="hidden"
            name="pathname"
            placeholder="URL"
            defaultValue={usePathname()}
          />
          <Button type="submit" loading={isLoading}>
            保存
          </Button>
        </form>
      </Modal>
    </>
  )
}
