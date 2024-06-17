import cn from 'classnames'

interface Props {
  className?: string
  title?: string
}
export const Card: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  title,
  children,
}) => {
  return (
    <div
      aria-label="Card"
      className={cn('bg-white rounded p-8 max-sm:p-6 w-full shadow-sm', className)}
    >
      {title && <h2 className="mb-8 text-base font-semibold">{title}</h2>}
      {children}
    </div>
  )
}
