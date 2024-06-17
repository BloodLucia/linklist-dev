'use client'

import { Plus } from 'lucide-react'
import { Modal } from '../Modal/Modal'
import { useState } from 'react'

export const AddHeader: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <>
      <section className="mt-8">
        <div onClick={() => setModalIsOpen(true)} className="text-[var(--grey-color)] font-semibold cursor-pointer hover:text-[var(--dark-color)] flex items-center gap-x-1">
          <Plus width={14} height={14} />
          Add Header
        </div>
      </section>
      <Modal visible={modalIsOpen} onClose={() => setModalIsOpen(false)} title='Add Header'>

      </Modal>
    </>
  )
}
