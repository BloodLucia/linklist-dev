import { BottomNavLink } from './BottomNavLink'

export const BottomNav: React.FC = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full h-[64px] bg-white/85 grid grid-flow-col items-center grid-cols-4 transition-all duration-150 pb-[env(safe-area-inset-bottom)] border-b-2 border-b-transparent backdrop-blur-xl">
      <BottomNavLink to="/dashboard/links">Links</BottomNavLink>
      <BottomNavLink to="/dashboard/design">Design</BottomNavLink>
      <BottomNavLink to="/dashboard/posts">Posts</BottomNavLink>
      <BottomNavLink to="/dashboard/settings">Settings</BottomNavLink>
    </nav>
  )
}
