import React, { FC, useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Row } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FaEllipsis, FaUserLock, FaUserXmark } from 'react-icons/fa6'

import { DeleteModal } from './delete-modal/DeleteModal'
import { UsersItem } from './UsersTable'

import { BanUserModal } from '@/components/ban-unban/ban/BanUserModal'
import { UnbanUserModal } from '@/components/ban-unban/unban/UnbanUserModal'

interface Props {
  row: Row<UsersItem>
  viewInfo?: boolean
}

export const UsersTableUserActions: FC<Props> = ({ row, viewInfo }) => {
  const router = useRouter()
  const handleMenuItemClickMoreInformation = () => {
    router.push(`/users/${row.original.userId}`)
  }

  const { t } = useTranslation()
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false)
  const [isUnbanUserOpen, setIsUnbanUserOpen] = useState(false)
  const [isBanUserOpen, setIsBanUserOpen] = useState(false)

  const userId = row.original.userId
  const userName = row.original.userName
  const userStatus = row.original.status
  const onDeleteClick = () => {
    setIsDeleteUserOpen(true)
  }
  const onBanClick = () => {
    setIsBanUserOpen(true)
  }

  const onUnbanClick = () => {
    setIsUnbanUserOpen(true)
  }

  return (
    <div className="flex">
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild className="flex w-full align-middle">
          <button className="flex align-center" aria-label="Customise options">
            <FaEllipsis size={24} className="text-white hover:text-accent-500 transition-colors" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side={'bottom'}
            align={'end'}
            className="bg-dark-500 border border-dark-100 p-3 text-sm text-white"
          >
            <DropdownMenu.Item
              className="flex items-center mb-3 cursor-pointer hover:text-accent-500 transition-colors"
              onSelect={() => onDeleteClick()}
            >
              <FaUserXmark size={24} className="mr-3" />
              {t('userList.deleteUser')}
            </DropdownMenu.Item>

            {userStatus === 'ACTIVE' && (
              <DropdownMenu.Item
                className="flex items-center mb-3 cursor-pointer hover:text-accent-500 transition-colors"
                onSelect={() => onBanClick()}
              >
                <FaUserLock size={24} className="mr-3" />
                {t('userList.banUser')}
              </DropdownMenu.Item>
            )}

            {userStatus === 'BANNED' && (
              <DropdownMenu.Item
                className="flex items-center mb-3 cursor-pointer hover:text-accent-500 transition-colors"
                onSelect={() => onUnbanClick()}
              >
                <FaUserLock size={24} className="mr-3" />
                {t('userList.unbanUser')}
              </DropdownMenu.Item>
            )}

            {viewInfo && (
              <DropdownMenu.Item
                className="flex items-center cursor-pointer hover:text-accent-500 transition-colors"
                onSelect={() => handleMenuItemClickMoreInformation()}
              >
                <FaEllipsis size={24} className="mr-3" />
                {t('userList.moreInfo')}
              </DropdownMenu.Item>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <BanUserModal
        isBanUserOpen={isBanUserOpen}
        setIsBanUserOpen={setIsBanUserOpen}
        userId={userId}
        userName={userName}
      />
      <UnbanUserModal
        isUnbanUserOpen={isUnbanUserOpen}
        setIsUnbanUserOpen={setIsUnbanUserOpen}
        userName={userName}
        userId={userId}
      />
      <DeleteModal
        isDeleteUserOpen={isDeleteUserOpen}
        setIsDeleteUserOpen={setIsDeleteUserOpen}
        userName={userName}
        userId={userId}
      />
    </div>
  )
}
