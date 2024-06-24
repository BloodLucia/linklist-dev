import { Overlay } from '../Overlay/Overlay'
import s from './Drawer.module.css'
import cn from 'classnames'

interface Props {
  className?: string
  isOpen: boolean
  // setIsOpen: (isOpen: boolean) => void
  mask?: boolean
}
export const Drawer: React.FC<Props> = (props) => {
  const { className, isOpen = false, mask = true } = props
  return (
    <Overlay>
      <div className='min-h-dvh bg-white w-[300px] fixed top-0 left-0'></div>
    </Overlay>
  )
}
