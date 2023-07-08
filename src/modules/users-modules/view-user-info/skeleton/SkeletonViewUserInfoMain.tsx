import Link from 'next/link'

import { ArrowBack } from '@/modules/users-modules/view-user-info'
import { Skeleton } from '@/ui'

export const SkeletonViewUserInfoMain = () => {
  return (
    <>
      <div className="pt-6 leading-6 font-normal text-sm">
        <Link href={'/'} className="flex">
          <ArrowBack />
          <span className="сurosor-pointer pl-2 font-medium">Back to Users List</span>
        </Link>
        <div className="pt-6 w-[360px]">
          <div className="flex">
            <Skeleton classes={'rounded-full w-16 h-16'} />
            <div className="pl-6 flex flex-col ">
              <Skeleton classes="w-36 h-5rounded-full" />
              <Skeleton classes="w-28 h-5 mt-3 rounded-full" />
            </div>
          </div>
          <div className="flex justify-between pt-6">
            <div className="flex flex-col w-[172px]">
              <Skeleton classes="w-28 h-5 rounded-full" />
              <Skeleton classes="w-36 mt-3 h-5 rounded-full" />
            </div>
            <div className="flex pl-3 w-3/6 flex-col">
              <>
                <Skeleton classes="w-36 h-5 rounded-full" />
                <Skeleton classes="w-28 mt-3 h-5 rounded-full" />
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
