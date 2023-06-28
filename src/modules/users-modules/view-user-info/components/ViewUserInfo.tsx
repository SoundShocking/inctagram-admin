import Link from 'next/link'

import { ArrowBack } from '@/modules/users-modules/view-user-info/icon-components/ArrowBack'
import { Avatar } from '@/ui'

export const ViewUserInfo = () => {
  return (
    <div className="flex w-full pl-[240px] bg-amber-800">
      <div className="flex flex-col w-max bg-red-400">
        <div className="pt-6 leading-6 font-normal text-sm">
          <Link href={'/'} className="flex">
            <ArrowBack />
            <span className="сurosor-pointer pl-2 font-medium">Back to Users List</span>
          </Link>
          <div className="pt-6">
            <div className="flex">
              <Avatar src={''} alt={'photo'} height={60} width={60} />
              <div className="pl-6 flex flex-col ">
                <span className="text-xl font-bold leading-9">Alexander Domanov</span>
                <Link href={'/'}>
                  <span>Link profile</span>
                </Link>
              </div>
            </div>
            <div className="flex justify-between pt-6">
              <div className="flex flex-col">
                <span>UserID</span>
                <span>1234567</span>
              </div>
              <div>
                <span className="flex flex-col">Profile Creation Date</span>
                <span>12.12.12</span>
              </div>
            </div>
          </div>
        </div>
        <div>Photos</div>
      </div>
    </div>
  )
}
