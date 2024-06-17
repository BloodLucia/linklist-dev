import { LoaderCircle } from 'lucide-react'
import cn from 'classnames'

interface Props extends React.SVGAttributes<HTMLOrSVGElement> {
  label?: string
}
export const Loader: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className="flex gap-x-1 items-center">
      <LoaderCircle
        className={cn('animate-spin', className)}
      />
      <div className={className}>{children}</div>
    </div>
  )
}
