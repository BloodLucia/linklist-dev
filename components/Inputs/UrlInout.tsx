import s from './Input.module.css'

interface Props {
  name?: string
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}
export const UrlInput: React.FC<Props> = ({
  name = 'username',
  placeholder = 'username',
  onChange,
}) => {
  return (
    <div className={s['wrapper']}>
      <input
        style={{ paddingLeft: '101px' }}
        name={name}
        required
        placeholder={placeholder}
        onChange={onChange}
        className={s['input']}
        autoComplete="off"
        maxLength={20}
        minLength={4}
      />
      <div className="absolute top-[50%] -translate-y-[50%] left-4 text-[var(--pr-color)]">
        linklist.one/
      </div>
    </div>
  )
}
