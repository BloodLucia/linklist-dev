'use client'

import { Tables } from '@/db_types'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { addLink } from '@/utils/supabase/database/profile'
import { LoaderCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { Modal } from '../Modal/Modal'
import { useChanged } from '@/hooks/use-changed'
import { AddLink } from '../Forms/AddLink'

export const Links: React.FC<{ links?: Tables<'links'>[] | null }> = ({
  links = [],
}) => {
  // const formRef = useRef<HTMLFormElement>(null)
  // const [isLoading, setIsLoading] = useState(false)
  const [addLinkModalVisible, setAddLinkModalVisible] = useState(false)
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   setIsLoading(true)
  //   await handleRequest(e, addLink)
  //   setIsLoading(false)
  //   setAddLinkModalVisible(false)
  //   formRef.current?.reset()
  // }
  const onModalClose = () => {
    setAddLinkModalVisible(false)
  }
  return (
    <>
      <div className="max-md:px-6">
        <div className="grid grid-flow-col max-md:grid-flow-row gap-y-3 auto-cols-auto gap-x-3 mt-8">
          <button
            className="oml-btn oml-bg rounded"
            onClick={() => setAddLinkModalVisible(true)}
          >
            ADD LINK
          </button>
          <button className="oml-btn oml-bg rounded">ADD EMBED</button>
        </div>
      </div>
      {/* <AddLink
        modalVisible={addLinkModalVisible}
        onModalClose={onModalClose}
      /> */}
    </>
  )
}
