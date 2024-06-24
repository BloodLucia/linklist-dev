import { LoaderCircle } from 'lucide-react'
import s from './Button.module.css'
import cn from 'classnames'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  level?: 'normal' | 'gradient' | 'dashed' | 'danger'
  loading?: boolean
}
export const Button: React.FC<Props> = (props) => {
  const {
    level = 'normal',
    type = 'button',
    disabled = false,
    loading = false,
    className,
    children,
    ...rest
  } = props
  const rootClassName = cn(
    s['root'],
    s[level],
    {
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className
  )
  return (
    <button type={type} disabled={loading} className={rootClassName} {...rest}>
      {loading ? <LoaderCircle className="animate-spin" /> : children}
    </button>
  )
}
