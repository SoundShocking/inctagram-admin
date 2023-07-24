import React from 'react'

export const NotFoundComponent = ({ message }: { message: string }) => {
  return (
    <div className="text-base w-full text-light-100 flex justify-center leading-6 font-normal ">
      <span>{message}</span>
    </div>
  )
}
