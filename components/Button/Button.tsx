import { forwardRef, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import cn from 'classnames'
import s from './Button.module.css'
import Spinner from '../Spinner'
import { Loader } from 'lucide-react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'slim' | 'flat'
  level?: 'primary' | 'danger' | 'dashed' | 'gradient'
  active?: boolean
  width?: number
  loading?: boolean
  Component?: React.ComponentType
}
const Button = forwardRef<HTMLButtonElement, Props>((props, buttonRef) => {
  const {
    className,
    level = 'primary',
    variant = 'flat',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props
  const ref = useRef(null)
  const rootClassName = cn(
    s.root,
    s[level],
    {
      [s.slim]: variant === 'slim',
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className
  )
  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={loading}
      style={{ width, ...style }}
      {...rest}
    >
      {/* {children} */}
      {loading ? <Loader className="w-6 h-6 fill-white animate-spin" /> : children}
    </Component>
  )
})

Button.displayName = 'Button'
export default Button
