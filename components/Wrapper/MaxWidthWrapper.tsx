import cn from 'classnames'

export const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'max-w-6xl mx-auto max-sm:px-6 max-sm:w-full max-sm:bg-white min-h-screen overflow-y-auto',
        className
      )}
    >
      {children}
    </div>
  )
}
