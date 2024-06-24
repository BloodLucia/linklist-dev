import s from './Input.module.css'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input: React.FC<Props> = (props) => {
  const { spellCheck = false, autoComplete = 'off', ...rest } = props
  return (
    <div className={s['wrapper']}>
      <input className={s['input']} {...rest} />
    </div>
  )
}
