'use client'
import { TabLink } from './TabLink'

export const Tabs = () => {
  return (
    <div className="max-md:fixed top-[60px] left-0 h-[40px] grid grid-flow-col auto-cols-auto items-center box-border max-md:w-full border-b border-b-[var(--btngrey-color)] max-md:bg-white">
      <TabLink href="links" text="Links" />
      <TabLink href="design" text="Design" />
      <TabLink href="posts" text="Posts" />
      <TabLink href="settings" text="Settings" />
    </div>
  )
}
