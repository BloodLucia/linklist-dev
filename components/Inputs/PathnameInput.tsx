'use client'
import { usePathname } from 'next/navigation'

export const PathnameInput = () => {
  return (
    <input
      type="hidden"
      name="pathname"
      defaultValue={usePathname()}
      autoComplete="off"
      spellCheck={false}
      required={false}
    />
  )
}
