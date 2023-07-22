import React from 'react'

import { useTranslation } from 'react-i18next'

import { GlobalInput } from '@/ui/inputs/input/Input'
type PropsType = {
  setError: (error: string) => void
  banDetails: string
  setBanDetails: (banDetails: string) => void
  error: string
}
export const DetailsInput = ({ setError, error, setBanDetails }: PropsType) => {
  const { t } = useTranslation()

  const onInputChange = (value: string) => {
    const MAX_LENGTH = 100

    if (value.length < MAX_LENGTH) {
      setError('')
      setBanDetails(value)
    } else {
      setError(`Maximum ${MAX_LENGTH} characters`)
    }
  }

  return (
    <GlobalInput
      className={'my-3 absolute -z-10 text-light-100'}
      type={'text'}
      label={t('userList.ban.reason.add')}
      error={error}
      onChange={event => {
        onInputChange(event.target.value)
      }}
    />
  )
}
