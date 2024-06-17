'use client'

import { Plus } from 'lucide-react'
import { Modal } from '../Modal/Modal'
import { useRef, useState } from 'react'
import { Input } from '../Input/Input'
import { usePathname, useRouter } from 'next/navigation'
import Button from '../Button'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { createHeader } from '@/utils/supabase/database/profile'

export const AddHeader: React.FC = () => {
  const router = useRouter()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)
  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, createHeader, router)
    setIsLoading(false)
    setModalIsOpen(false)
    formRef.current?.reset()
  }
  return (
    <>
      <section className="mt-8">
        <div
          onClick={() => setModalIsOpen(true)}
          className="text-[var(--grey-color)] font-semibold cursor-pointer hover:text-[var(--dark-color)] flex items-center gap-x-1"
        >
          <Plus width={14} height={14} />
          Add Header
        </div>
      </section>
      <Modal
        visible={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        title="Add Header"        
      >
        <form
          className="flex flex-col w-full items-stretch pb-8 z-20"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <Input placeholder="title" name="title" required autoComplete="off" />
          <Input type="hidden" name="pathname" value={usePathname()} />
          <Button disabled={isLoading} className="disabled:cursor-not-allowed absolute bottom-0 left-0 right-0 w-full oml-btn oml-bg text-white flex justify-center items-center">
            {isLoading ? 'SAVING...' : 'SAVE'}
          </Button>
        </form>
      </Modal>
    </>
  )
}
