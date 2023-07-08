import { Fragment } from 'react'

import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  ArrowBack,
  dateChangesFormat,
  GET_USER_INFO,
  User,
  UserData,
  ViewUserInfoMain,
  ViewUserInformationInTabs,
} from '@/modules/users-modules/view-user-info'
import { SkeletonViewUserInfoMain } from '@/modules/users-modules/view-user-info/skeleton/SkeletonViewUserInfoMain'
import { Avatar, Skeleton } from '@/ui'

export const ViewUserInfo = () => {
  const router = useRouter()
  const { userName } = router.query
  const { loading, error, data } = useQuery<UserData>(GET_USER_INFO, {
    variables: { search: userName },
  })

  const usersData: User[] = data?.users.items || []

  if (error) {
    return <div>Error! {error.message}</div>
  }

  return (
    <div className="flex w-full pl-60">
      <div className="flex flex-col w-max">
        {loading ? <SkeletonViewUserInfoMain /> : <ViewUserInfoMain usersData={usersData} />}
        <div className="pt-7">
          <ViewUserInformationInTabs />
        </div>
      </div>
    </div>
  )
}
