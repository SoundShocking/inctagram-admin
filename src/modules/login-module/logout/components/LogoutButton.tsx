import { FC } from 'react'

import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FaSignOutAlt } from 'react-icons/fa'

import { routes } from '@/routing/router'

export const LogoutButton: FC = () => {
  const router = useRouter()
  const handleLogout = () => {
    Cookies.remove('authToken')
    router.push(routes.logout)
  }
  const { t } = useTranslation()

  return (
    <div>
      <button
        onClick={handleLogout}
        className="flex items-center hover:text-accent-500 transition-colors font-bold"
      >
        <div className="text-2xl leading-none mr-3">
          <FaSignOutAlt />
        </div>

        <div className="md:hidden sm:hidden">{t('navigation.logout')}</div>
      </button>
    </div>
  )
}
