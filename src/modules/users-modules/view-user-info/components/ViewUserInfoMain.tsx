import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { dateChangesFormat } from '@/common'
import { ArrowBack, UserType } from '@/modules/users-modules/view-user-info'
import { Placeholder } from '@/ui'

export const ViewUserInfoMain = ({ userData }: { userData: UserType }) => {
  const { createdAt, profileLink, userName, userId } = userData
  const { t } = useTranslation()

  return (
    <>
      <div className="pt-6 leading-6 font-normal text-sm">
        <Link href={'/'} className="flex">
          <ArrowBack />
          <span className="сurosor-pointer hover:text-accent-500 transition-colors outline-none pl-2 font-medium">
            {t('userInfo.userInfoMain.backUsersList')}
          </span>
        </Link>
        <div className="pt-6 w-[360px]">
          <div className="flex w-full h-14">
            <Placeholder
              src={profileLink}
              alt={'User Photo'}
              className="rounded-full"
              height={60}
              width={60}
            />
            <div className="pl-6 flex flex-col ">
              <span className="text-xl font-bold leading-9">{userName}</span>
              <Link href={'/'}>
                <span className="hover:text-accent-500 transition-colors outline-none">
                  {t('userInfo.userInfoMain.linkProfile')}
                </span>
              </Link>
            </div>
          </div>
          <div className="flex justify-between pt-6">
            <div className="flex flex-col w-[172px]">
              <span className="text-light-900">{t('userInfo.userInfoMain.userID')}</span>
              <span>{userId}</span>
            </div>
            <div className="flex pl-3 w-3/6 flex-col">
              <span className="text-light-900">
                {t('userInfo.userInfoMain.profileCreationDate')}
              </span>
              <span>{dateChangesFormat(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
