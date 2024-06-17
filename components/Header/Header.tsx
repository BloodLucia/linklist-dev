export const Header: React.FC<{
  rightNode: React.ReactNode
}> = ({ rightNode }) => {
  return (
    <header className="w-full h-[60px] fixed top-0 left-0 right-0 bg-white border-b border-b-[var(--greybg-color)] box-border">
      <div className="max-w-6xl h-full max-sm:px-6 mx-auto flex justify-between items-center">
        <h1>Oh My Link</h1>
        {rightNode}
      </div>
    </header>
  )
}
