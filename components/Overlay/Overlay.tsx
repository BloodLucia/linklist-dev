export const Overlay: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 w-full h-full min-h-dvh bg-black/50 opacity-1 z-20 transition-opacity duration-200">
      {children}
    </div>
  )
}
