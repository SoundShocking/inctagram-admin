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
      <button onClick={handleLogout} className="flex items-center">
        <FaSignOutAlt className="mr-4" />
        <span className={'sm:hidden md:hidden  font-bold'}>{t('navigation.logout')}</span>
      </button>
    </div>
  )
}
