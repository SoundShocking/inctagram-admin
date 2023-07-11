import React from 'react'

import { SkeletonPost } from '@/modules/users-modules/view-user-info'

export const usedToDrawArraysOfSkeletons = (value: number) => {
  return [...Array(value).keys()].map(i => {
    return <SkeletonPost key={i} />
  })
}
