import { create } from 'zustand'

type Loading = {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const useLoaing = create<Loading>((set) => ({
  visible: false,
  setVisible(visible) {
    set({ visible })
  },
}))
