import { FC } from 'react'

import { useRouter } from 'next/router'
import { FaSignOutAlt } from 'react-icons/fa'

import { routes } from '@/routing/router.js'

export const LogoutButton: FC = () => {
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem('authorization')
    router.push(routes.logout)
  }

  return (
    <div>
      <button onClick={handleLogout} className="flex items-center">
        <FaSignOutAlt className="mr-4" />
        <span className={'lg:hidden font-bold'}>Logout</span>
      </button>
    </div>
  )
}
