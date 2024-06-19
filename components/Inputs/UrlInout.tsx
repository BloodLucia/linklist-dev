'use client'

import { useDebounce } from '@uidotdev/usehooks'
import cn from 'classnames'

import s from './Input.module.css'
import { useEffect, useState } from 'react'
import { existsByUserName } from '@/app/signin/actions'

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
  const [username, setUsername] = useState('')
  const [isValid, setIsValid] = useState(false)
  const debounceSearcher = useDebounce(username, 300)

  useEffect(() => {
    ;(async () => {
      if (debounceSearcher) {
        setIsValid(await existsByUserName(username))
      } else {
        setIsValid(false)
      }
    })()
  }, [debounceSearcher])
  const className = cn(s['input'], {
    [s['error']]: isValid,
  })
  return (
    <div className={s['wrapper']}>
      <input
        style={{ paddingLeft: '101px' }}
        name={name}
        required
        placeholder={placeholder}
        onChange={(e) => setUsername(e.target.value.trim())}
        className={className}
        autoComplete="off"
        maxLength={20}
        minLength={4}
      />
      <div className="absolute top-[50%] -translate-y-[50%] left-4 text-textDark">
        linklist.one/
      </div>
      {isValid && (
        <div className="text-danger text-xs absolute -bottom-3 leading-none">
          用户名已存在
        </div>
      )}
    </div>
  )
}
