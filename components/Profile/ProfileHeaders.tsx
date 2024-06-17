'use client'

import { Tables } from '@/db_types'
import { Modal } from '../Modal/Modal'
import { Input } from '../Input/Input'
import { useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { updateHeader } from '@/utils/supabase/database/profile'
import { Loader } from '../Loader/Loader'

export const ProfileHeaders: React.FC<{
  headers?: Tables<'headers'>[] | null
}> = ({ headers }) => {
  const router = useRouter()
  const [disableSave, setDisableSave] = useState(true)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectHeader, setSelectHeader] = useState<Tables<'headers'>>()
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)
  const handleHeaderClick = (header: Tables<'headers'>) => {
    setModalIsOpen(true)
    setSelectHeader(header)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, updateHeader, router)
    setIsLoading(false)
    setModalIsOpen(false)
    formRef.current?.reset()
  }
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = selectHeader![e.target.name as keyof typeof selectHeader]
    setDisableSave(e.target.value === value)
  }

  return (
    <>
      <div className="grid grid-row-1 gap-y-4 mt-6">
        {headers &&
          headers.map((header) => {
            return (
              <div
                key={header.id}
                onClick={() => handleHeaderClick(header)}
                className="w-full rounded bg-white shadow-sm px-6 py-5 relative cursor-pointer flex justify-center items-center"
              >
                {header.title}
              </div>
            )
          })}
      </div>
      <Modal
        title="Edit Header"
        visible={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-stretch w-full gap-y-4"
        >
          <Input
            placeholder="title"
            name="title"
            required
            autoComplete="off"
            onChange={handleChange}
            defaultValue={selectHeader?.title}
          />
          <input type="hidden" name="id" defaultValue={selectHeader?.id} />
          <input type="hidden" name="pathname" defaultValue={usePathname()} />
          <button
            disabled={disableSave || isLoading}
            className="disabled:opacity-50 disabled:cursor-not-allowed oml-bg oml-btn rounded flex justify-center items-center text-white mt-4"
          >
            {isLoading ? <Loader color='#ffffff' /> : 'SAVE'}
          </button>
        </form>
      </Modal>
    </>
  )
}
