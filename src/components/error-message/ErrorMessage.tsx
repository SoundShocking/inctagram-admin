import React, { FC } from 'react'

interface IErrorMessageProps {
  errorMessage?: string
}

export const ErrorMessage: FC<IErrorMessageProps> = ({ errorMessage }) => {
  return <>{errorMessage && <>Error: {errorMessage}</>}</>
}
