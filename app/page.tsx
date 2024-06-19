import { SiteContent } from '@/components/Layout/SiteContent'
import { SiteHeader } from '@/components/Layout/SiteHeader'

export default function Home() {
  return (
    <div className='bg-[rgb(250,250,250)] min-h-screen'>
      <SiteHeader />
      <SiteContent />
    </div>
  )
}
