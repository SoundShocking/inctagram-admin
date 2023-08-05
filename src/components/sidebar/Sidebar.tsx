import { FC, ReactNode } from 'react'

import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FaArrowTrendUp, FaRegCreditCard, FaRegImages, FaUsers } from 'react-icons/fa6'

import { LogoutButton } from '@/modules/login-module/logout'
import { routes } from '@/routing/router'

interface MenuItem {
  url: string
  name: string
  icon: ReactNode
}

export const Sidebar: FC = () => {
  const { pathname } = useRouter()
  const { t } = useTranslation()

  const menu: MenuItem[] = [
    {
      url: routes.users,
      name: t('navigation.userList'),
      icon: <FaUsers />,
    },
    {
      url: routes.statistics,
      name: t('navigation.statistics'),
      icon: <FaArrowTrendUp />,
    },
    {
      url: routes.payments,
      name: t('navigation.paymentsList'),
      icon: <FaRegCreditCard />,
    },
    {
      url: routes.posts,
      name: t('navigation.postList'),
      icon: <FaRegImages />,
    },
  ]

  return (
    <aside className="h-screen sticky top-0 max-w-[320px] w-full border-r-[1px] border-r-bgLogBorder sm:max-w-[50px] md:max-w-[50px]">
      <div className="text-light-100 font-medium flex flex-col items-center justify-between py-[72px] h-full">
        <ul className="list-none flex gap-6 flex-col text-white">
          {menu.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.url}
                className={clsx(
                  'flex items-center  hover:text-accent-500 transition-colors font-bold',
                  {
                    'text-accent-500': pathname === item.url,
                  }
                )}
              >
                <div className="text-2xl leading-none mr-3">{item.icon}</div>

                <div className="md:hidden sm:hidden">{item.name}</div>
              </Link>
            </li>
          ))}
        </ul>
        <LogoutButton />
      </div>
    </aside>
  )
}
