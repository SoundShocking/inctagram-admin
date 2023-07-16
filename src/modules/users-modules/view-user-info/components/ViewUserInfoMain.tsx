import Link from 'next/link'

import { dateChangesFormat } from '@/common'
import { ArrowBack } from '@/modules/users-modules/view-user-info/custom/utils/ArrowBack'
import { Avatar } from '@/ui'

export const ViewUserInfoMain = ({ userData }: any) => {
  const { createdAt, profileLink, userName, userId } = userData

  return (
    <>
      <div className="pt-6 leading-6 font-normal text-sm">
        <Link href={'/'} className="flex">
          <ArrowBack />
          <span className="сurosor-pointer pl-2 font-medium">Back to Users List</span>
        </Link>
        <div className="pt-6 w-[360px]">
          <div className="flex">
            <Avatar src={profileLink} alt={'User Photo'} height={60} width={60} />
            <div className="pl-6 flex flex-col ">
              <span className="text-xl font-bold leading-9">{userName}</span>
              <Link href={'/'}>
                <span>Link profile</span>
              </Link>
            </div>
          </div>
          <div className="flex justify-between pt-6">
            <div className="flex flex-col w-[172px]">
              <span className="text-light-900">UserID</span>
              <span>{userId}</span>
            </div>
            <div className="flex pl-3 w-3/6 flex-col">
              <span className="text-light-900">Profile Creation Date</span>
              <span>{dateChangesFormat(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
