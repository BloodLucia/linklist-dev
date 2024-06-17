'use client'

import { useRef } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  isOpen: boolean
  onClose: (isOpen: boolean) => void
}
export const NewModal: React.FC<React.PropsWithChildren<Props>> = ({
  isOpen,
  onClose,
  children,
}) => {
  const ref = useRef<Element | null>(null)
  return (
    isOpen &&
    createPortal(
      <div className="touch-none w-full h-full fixed top-0 left-0 bg-black/80 z-20 overflow-hidden">
        <div>{children}</div>
      </div>,
      document.body
    )
  )
}
