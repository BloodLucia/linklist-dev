import { create } from 'zustand'

type UseMobilePreview = {
  visible: boolean
  setVisible: (visible: boolean) => void
}
export const useMobilePreview = create<UseMobilePreview>((set) => ({
  visible: false,
  setVisible(visible) {
    set({ visible })
  },
}))
