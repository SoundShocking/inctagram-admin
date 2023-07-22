import React from 'react'

interface ErrorProps {
  error: {
    message: string
  }
}

export const ErrorComponent: React.FC<ErrorProps> = ({ error }) => {
  return <div className="text-base leading-6 font-normal">Error! {error.message}</div>
}
