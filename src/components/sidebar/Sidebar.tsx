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
import {useTranslation} from 'react-i18next';

export const Sidebar: FC = () => {
  const { pathname } = useRouter()
  const {t } = useTranslation();


  // CSS Styles
  const className = {
    users: clsx(
      pathname === '/users-list' ? 'text-accent-500' : '',
      'flex gap-[15px] items-center'
    ),
    statistics: clsx(
      pathname === '/statistics' ? 'text-accent-500' : '',
      'flex gap-[15px] items-center mt-14'
    ),
    payments: clsx(
      pathname === '/payments' ? 'text-accent-500' : '',
      'flex gap-[15px] items-center'
    ),
    posts: clsx(pathname === '/posts' ? 'text-accent-500' : '', 'flex gap-[15px] items-center'),

    hidden: 'lg:hidden',
  }

  return (
    <aside className="h-screen sticky top-0 max-w-[320px] w-full border-r-[1px] border-r-bgLogBorder lg:max-w-[50px]">
      <div className="text-light-100 font-medium flex flex-col items-center justify-between py-[72px] h-full">
        <ul className="list-none flex gap-6 flex-col">
          <li>
            <Link href={'/Users'} className={className.users}>
              <Image
                src={pathname === '/' ? users : usersOutline}
                alt={'Users'}
                height={24}
                width={24}
              />
              <span className={className.hidden}> {t('navigation.userList')}</span>
            </Link>
          </li>
          <li>
            <Link href={'/statistics'} className={className.statistics}>
              <Image
                src={pathname === '/statistics' ? statistics : statisticsOutline}
                alt={'statistics'}
                height={24}
                width={24}
              />
              <span className={className.hidden}>{t('navigation.statistics')}</span>
            </Link>
          </li>
          <li className="">
            <Link href={'/payments'} className={className.payments}>
              <Image
                src={pathname === '/payments' ? payments : paymentsOutline}
                alt={'Profile'}
                height={24}
                width={24}
              />
              <span className={className.hidden}>{t('navigation.paymentsList')}</span>
            </Link>
          </li>
          <li className="">
            <Link href={'/posts'} className={className.posts}>
              <Image
                src={pathname === '/posts' ? posts : postsOutline}
                alt={'Statistic'}
                height={24}
                width={24}
              />
              <span className={className.hidden}>
               {t('navigation.postList')}
              </span>
            </Link>
            {/*<div>*/}
            {/*  <div>{t('navigation.statistics')}</div>*/}
            {/*</div>*/}
          </li>
        </ul>
      </div>
    </aside>
  )
}
