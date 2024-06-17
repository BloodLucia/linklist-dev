import cn from 'classnames'
import s from './Input.module.css'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  iconSlot?: React.ReactNode
}
export const Input: React.FC<Props> = (props) => {
  const { type, className, iconSlot, ...rest } = props
  const rootClassName = cn(
    s.root, 
    className,
    iconSlot ? s.icon : ''
  )
  return (
    <div className={s['wrapper']}>
      {iconSlot}
      <input type={type} className={rootClassName} {...rest} />
    </div>
  )
}
