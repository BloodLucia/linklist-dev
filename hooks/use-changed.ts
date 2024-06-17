import { create } from 'zustand'

type UseChanged = {
  changed: boolean
  setChanged: (value: boolean) => void
}

export const useChanged = create<UseChanged>((set) => ({
  changed: false,
  setChanged(value: boolean) {
    set({ changed: value })
  },
}))
