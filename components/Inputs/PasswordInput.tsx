import s from './Input.module.css'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface Props {
  name?: string
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}
export const PasswordInput: React.FC<Props> = ({
  name = 'password',
  placeholder = '密码',
  onChange,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  return (
    <div className={s['wrapper']}>
      <input
        type={passwordVisible ? 'text' : 'password'}
        name={name}
        required
        placeholder={placeholder}
        onChange={onChange}
        className={s['input']}
        autoComplete="off"
      />
      <div
        onClick={() => setPasswordVisible(!passwordVisible)}
        className={s['input-icon']}
      >
        {passwordVisible ? (
          <Eye
            width={22}
            height={22}
            cursor="pointer"
            color="var(--grey-color)"
          />
        ) : (
          <EyeOff
            width={22}
            height={22}
            cursor="pointer"
            color="var(--grey-color)"
          />
        )}
      </div>
    </div>
  )
}
