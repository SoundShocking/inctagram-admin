import React, { FC } from 'react'

import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import paymentsOutline from '../../assets/icons/payments-outline.svg'
import payments from '../../assets/icons/payments.svg'
import postsOutline from '../../assets/icons/posts-outline.svg'
import posts from '../../assets/icons/posts.svg'
import statisticsOutline from '../../assets/icons/statistics-outline.svg'
import statistics from '../../assets/icons/statistics.svg'
import usersOutline from '../../assets/icons/users-outline.svg'
import users from '../../assets/icons/users.svg'

import { useTranslation } from '@/components'
import { LogoutButton } from '@/modules/login-module/logout'
import { routes } from '@/routing/router.js'

export const Sidebar: FC = () => {
  const { pathname } = useRouter()
  const { t } = useTranslation()

  // CSS Styles
  const className = {
    users: clsx(pathname === routes.users ? 'text-accent-500' : '', 'flex gap-[15px] items-center'),
    statistics: clsx(
      pathname === routes.statistics ? 'text-accent-500' : '',
      'flex gap-[15px] items-center mt-14'
    ),
    payments: clsx(
      pathname === routes.payments ? 'text-accent-500' : '',
      'flex gap-[15px] items-center'
    ),
    posts: clsx(pathname === routes.posts ? 'text-accent-500' : '', 'flex gap-[15px] items-center'),

    hidden: 'md:hidden sm:hidden font-bold',
  }

  return (
    <aside className="h-screen sticky top-0 max-w-[320px] w-full border-r-[1px] border-r-bgLogBorder sm:max-w-[50px] md:max-w-[50px]">
      <div className="text-light-100 font-medium flex flex-col items-center justify-between py-[72px] h-full">
        <ul className="list-none flex gap-6 flex-col">
          <li>
            <Link href={routes.users} className={className.users}>
              <Image
                src={pathname === routes.users ? usersOutline : users}
                alt={'Users'}
                height={24}
                width={24}
              />
              <span className={className.hidden}> {t.translation.navigation.userList}</span>
            </Link>
          </li>
          <li>
            <Link href={routes.statistics} className={className.statistics}>
              <Image
                src={pathname === routes.statistics ? statisticsOutline : statistics}
                alt={'statistics'}
                height={24}
                width={24}
              />
              <span className={className.hidden}>{t.translation.navigation.statistics}</span>
            </Link>
          </li>
          <li className="">
            <Link href={routes.payments} className={className.payments}>
              <Image
                src={pathname === routes.payments ? paymentsOutline : payments}
                alt={'Profile'}
                height={24}
                width={24}
              />
              <span className={className.hidden}>{t.translation.navigation.paymentsList}</span>
            </Link>
          </li>
          <li className="">
            <Link href={routes.posts} className={className.posts}>
              <Image
                src={pathname === routes.posts ? postsOutline : posts}
                alt={'Post list'}
                height={24}
                width={24}
              />
              <span className={className.hidden}>{t.translation.navigation.postList}</span>
            </Link>
          </li>
        </ul>
        <LogoutButton />
      </div>
    </aside>
  )
}
