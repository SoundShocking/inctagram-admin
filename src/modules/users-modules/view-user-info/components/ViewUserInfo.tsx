import { useState } from 'react'

import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import {
  GET_USER_INFO,
  SkeletonViewUserInfoMain,
  UserData,
  ViewUserInfoMain,
  ViewUserInformationInTabs,
} from '@/modules/users-modules/view-user-info'
import { DateCalendar } from '@/ui'

export const ViewUserInfo = () => {
  const router = useRouter()
  const { userId } = router.query
  const { loading, error, data } = useQuery<UserData>(GET_USER_INFO, {
    variables: { userId: Number(userId) },
  })

  const userData = data?.user

  if (error) {
    return <div>Error! {error.message}</div>
  }

  return (
    <div className="flex w-full pl-60">
      <div className="flex flex-col w-max">
        {loading ? <SkeletonViewUserInfoMain /> : <ViewUserInfoMain userData={userData} />}
        <div className="pt-7">
          <ViewUserInformationInTabs />
        </div>
      </div>
    </div>
  )
}
