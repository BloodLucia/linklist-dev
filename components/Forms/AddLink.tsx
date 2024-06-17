import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { addLink } from '@/utils/supabase/database/profile'
import { LoaderCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { NewModal } from '../Modal/NewModal'

export const AddLink: React.FC<{
  modalVisible: boolean
  onModalClose: () => void
}> = ({ modalVisible, onModalClose }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, addLink)
    setIsLoading(false)
    // setAddLinkModalVisible(false)
    // formRef.current?.reset()
  }
  return (
    <NewModal isOpen onClose={onModalClose}>
      <form className="pb-8" onSubmit={handleSubmit}>
            <div className="flex flex-col items-stretch gap-y-4">
              <input
                type="text"
                name="name"
                className="bl-input"
                placeholder="title"
                autoComplete="off"
                required
              />
              <input
                type="text"
                name="url"
                className="bl-input"
                placeholder="URL"
                autoComplete="off"
                required
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="disabled:cursor-not-allowed oml-bg oml-btn absolute bottom-0 left-0 right-0 flex justify-center items-center"
            >
              {isLoading ? <LoaderCircle className="animate-spin" /> : 'SAVE'}
            </button>
          </form>
    </NewModal>
  )
}
