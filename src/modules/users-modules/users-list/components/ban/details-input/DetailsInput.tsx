import React from 'react'

import { GlobalInput } from '@/ui/inputs/input/Input'
type PropsType = {
  setError: (error: string) => void
  banDetails: string
  setBanDetails: (banDetails: string) => void
  error: string
}
export const DetailsInput = ({ setError, error, setBanDetails, banDetails }: PropsType) => {
  const onInputChange = (value: string) => {
    const MAX_LENGTH = 100

    if (value.length < MAX_LENGTH) {
      setError('')
      setBanDetails(banDetails)
    } else {
      setError(`Maximum ${MAX_LENGTH} characters`)
    }
  }

  return (
    <GlobalInput
      className={'my-3 text-light-100'}
      type={'text'}
      label={'Add your reason'}
      error={error}
      onChange={event => {
        onInputChange(event.target.value)
      }}
    />
  )
}
