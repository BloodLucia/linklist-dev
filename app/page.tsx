import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Oh My Link',
  description: 'Oh My Link',
}
export default function Home() {
  return redirect('/dashboard')
}
