'use client'

import { useMobilePreview } from '@/hooks/useMobilePreview'
import { Modal } from '../Modal/Modal'
import { Tables } from '@/db_types'
import { getURL } from '@/utils/helpers/helpers'

export const ProfilePreview = ({ user }: { user: Tables<'users'> | null }) => {
  const { visible, setVisible } = useMobilePreview()
  return (
    <>
      <Modal
        title="预览"
        visible={visible}
        onClose={() => setVisible(false)}
        fullScreen
      >
        <div className="w-full border-[15px] h-[768px] rounded-[40px] border-[#222] flex justify-center items-center">
          <iframe
            src={`${getURL()}/${user?.username}`}
            width="100%"
            height="100%"
          />
        </div>
      </Modal>
    </>
  )
}
