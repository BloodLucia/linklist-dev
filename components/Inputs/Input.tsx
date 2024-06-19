import s from './Input.module.css'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input: React.FC<Props> = (props) => {
  return (
    <div className={s['wrapper']}>
      <input className={s['input']} {...props} />
    </div>
  )
}