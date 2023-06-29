import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { GET_USER_INFO, ViewUserInformationInATab } from '@/modules/users-modules/view-user-info'
import { ArrowBack } from '@/modules/users-modules/view-user-info/icon-components/ArrowBack'
import { Avatar } from '@/ui'

type User = {
  userId: number
  userName: string
  profileLink: string
  createdAt: string
}
interface UserData {
  users: {
    items: User[]
  }
}

export const ViewUserInfo = () => {
  const router = useRouter()
  const id = router.query.id
  const { loading, error, data } = useQuery<UserData>(GET_USER_INFO, {
    variables: { search: id },
  })

  const usersData = data?.users.items || []

  return (
    <div className="flex w-full pl-[240px]">
      <div className="flex flex-col w-max">
        {!loading &&
          usersData.map((user: User, key) => {
            return (
              <>
                <div className="pt-6 leading-6 font-normal text-sm">
                  <Link href={'/'} className="flex">
                    <ArrowBack />
                    <span className="сurosor-pointer pl-2 font-medium">Back to Users List</span>
                  </Link>
                  <div className="pt-6 w-[360px]">
                    <div className="flex">
                      <Avatar src={user.profileLink} alt={'User Photo'} height={60} width={60} />
                      <div className="pl-6 flex flex-col ">
                        <span className="text-xl font-bold leading-9">{user.userName}</span>
                        <Link href={'/'}>
                          <span>Link profile</span>
                        </Link>
                      </div>
                    </div>
                    <div className="flex justify-between pt-6">
                      <div className="flex flex-col w-[172px]">
                        <span className="text-light-900">UserID</span>
                        <span>{user.userId}</span>
                      </div>
                      <div className="flex pl-3 w-3/6 flex-col">
                        <span className="text-light-900">Profile Creation Date</span>
                        <span>{user.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        <div className="pt-7">
          <ViewUserInformationInATab />
        </div>
      </div>
    </div>
  )
}
