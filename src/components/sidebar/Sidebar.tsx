import { FC, ReactNode } from 'react'

import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaArrowTrendUp, FaRegCreditCard, FaRegImages, FaUsers } from 'react-icons/fa6'

import { useTranslation } from '@/components'
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
      name: t.translation.navigation.users,
      icon: <FaUsers />,
    },
    {
      url: routes.statistics,
      name: t.translation.navigation.statistics,
      icon: <FaArrowTrendUp />,
    },
    {
      url: routes.payments,
      name: t.translation.navigation.payments,
      icon: <FaRegCreditCard />,
    },
    {
      url: routes.posts,
      name: t.translation.navigation.posts,
      icon: <FaRegImages />,
    },
  ]

  return (
    <aside className="border-r border-dark-100 pt-16 pr-6">
      <div className="sticky top-0">
        <ul className="list-none flex gap-6 flex-col text-white leading-none">
          {menu.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.url}
                className={clsx(
                  'flex items-center hover:text-accent-500 transition-colors font-bold truncate',
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
          <li className="mt-6 text-danger-500">
            <LogoutButton />
          </li>
        </ul>
      </div>
    </aside>
  )
}
