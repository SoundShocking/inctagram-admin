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
  ViewUserInformationInATab,
} from '@/modules/users-modules/view-user-info'
import { Avatar, Skeleton } from '@/ui'

export const ViewUserInfo = () => {
  const router = useRouter()
  const { userName } = router.query
  const { loading, error, data } = useQuery<UserData>(GET_USER_INFO, {
    variables: { search: userName },
  })

  const usersData: User[] | [] = data?.users.items || []

  if (error) {
    return <div>Error! {error.message}</div>
  }

  return (
    <div className="flex w-full pl-60">
      <div className="flex flex-col w-max">
        {usersData.map(({ userId, profileLink, userName, createdAt }: User) => {
          return (
            <Fragment key={userId}>
              <div className="pt-6 leading-6 font-normal text-sm">
                <Link href={'/'} className="flex">
                  <ArrowBack />
                  <span className="сurosor-pointer pl-2 font-medium">Back to Users List</span>
                </Link>
                <div className="pt-6 w-[360px]">
                  <div className="flex">
                    {loading ? (
                      <Skeleton classes={'rounded-full w-16 h-16'} />
                    ) : (
                      <Avatar src={profileLink} alt={'User Photo'} height={60} width={60} />
                    )}

                    <div className="pl-6 flex flex-col ">
                      {loading ? (
                        <>
                          <Skeleton classes="w-36 h-5rounded-full" />
                          <Skeleton classes="w-28 h-5 mt-3 rounded-full" />
                        </>
                      ) : (
                        <>
                          <span className="text-xl font-bold leading-9">{userName}</span>
                          <Link href={'/'}>
                            <span>Link profile</span>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between pt-6">
                    <div className="flex flex-col w-[172px]">
                      {loading ? (
                        <>
                          <Skeleton classes="w-28 h-5 rounded-full" />
                          <Skeleton classes="w-36 mt-3 h-5 rounded-full" />
                        </>
                      ) : (
                        <>
                          <span className="text-light-900">UserID</span>
                          <span>{userId}</span>
                        </>
                      )}
                    </div>
                    <div className="flex pl-3 w-3/6 flex-col">
                      {loading ? (
                        <>
                          <Skeleton classes="w-36 h-5 rounded-full" />
                          <Skeleton classes="w-28 mt-3 h-5 rounded-full" />
                        </>
                      ) : (
                        <>
                          <span className="text-light-900">Profile Creation Date</span>
                          <span>{dateChangesFormat(createdAt)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )
        })}
        <div className="pt-7">
          <ViewUserInformationInATab />
        </div>
      </div>
    </div>
  )
}
