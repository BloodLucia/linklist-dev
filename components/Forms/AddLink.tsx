'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { Modal } from '../Modal/Modal'
import { addLink } from '@/utils/supabase/database/profile'
import { Button } from '../Buttons/Button'
import { Input } from '../Inputs/Input'
import { PathnameInput } from '../Inputs/PathnameInput'
import { Plus } from 'lucide-react'

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
        <Button
          className="flex items-center gap-x-1"
          onClick={() => setIsOpenModal(true)}
        >
          <Plus width={20} height={20} />
          添加链接
        </Button>
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
          <Input name="url" placeholder="网址 (eg. https://linklist.one)" required autoComplete="off" />
          <PathnameInput />
          <Button type="submit" loading={isLoading}>
            添加
          </Button>
        </form>
      </Modal>
    </>
  )
}
