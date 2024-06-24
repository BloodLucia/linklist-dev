import { LoaderCircle } from 'lucide-react'
import s from './Button.module.css'
import cn from 'classnames'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  level?: 'normal' | 'gradient' | 'dashed' | 'danger'
}
export const Button: React.FC<Props> = (props) => {
  const {
    level = 'normal',
    type = 'button',
    disabled = false,
    className,
    children,
    ...rest
  } = props
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(s['root'], s[level], className)}
      {...rest}
    >
      {disabled ? <LoaderCircle className="animate-spin" /> : children}
    </button>
  )
}
