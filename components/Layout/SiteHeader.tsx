import { Brand } from '../Brand/Brand'

export const SiteHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 border-b border-b-[#dee2e6] box-border bg-[#f9f9f9] py-2">
      <div className="xl:max-w-6xl mx-auto px-4 flex justify-between items-center max-md:w-full h-full">
        <Brand />
      </div>
    </header>
  )
}
