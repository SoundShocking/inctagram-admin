import React, { useState } from 'react'

import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { ErrorComponent, NotFoundComponent } from '@/components'
import {
  GET_USER_INFO,
  SkeletonViewUserInfoMain,
  UserDataType,
  UserType,
  ViewUserInfoMain,
  ViewUserInformationInTabs,
} from '@/modules/users-modules/view-user-info'

export const ViewUserInfo = () => {
  const [userData, setUserData] = useState<UserType>()
  const router = useRouter()
  const { userId } = router.query
  const { loading, error } = useQuery<UserDataType>(GET_USER_INFO, {
    variables: { userId: Number(userId) },
    onCompleted: (data: UserDataType) => setUserData(data.user),
    onError: error => console.error('error', error),
    fetchPolicy: 'cache-and-network',
  })

  if (error && !loading) {
    return <ErrorComponent error={error} />
  }

  return (
    <div className="flex w-full pl-60 pr-16 pb-10">
      <div className="flex flex-col w-full">
        {/* eslint-disable-next-line no-nested-ternary */}
        {loading ? (
          <SkeletonViewUserInfoMain />
        ) : userData !== undefined ? (
          <ViewUserInfoMain userData={userData} />
        ) : (
          <NotFoundComponent />
        )}
        <div className="pt-7">
          <ViewUserInformationInTabs />
        </div>
      </div>
    </div>
  )
}
