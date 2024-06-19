'use client'
import { useMobilePreview } from '@/hooks/useMobilePreview'
import { Eye } from 'lucide-react'

export const FloatButton = () => {
  const { setVisible } = useMobilePreview()
  return (
    <div className="fixed bottom-8 right-6 md:hidden">
      <button
        onClick={() => setVisible(true)}
        className="rounded-full w-14 h-14 bg-primary shadow-md flex justify-center items-center"
      >
        <Eye color="#ffffff" />
      </button>
    </div>
  )
}
