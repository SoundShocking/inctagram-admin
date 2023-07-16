import React, { useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useTranslation } from 'react-i18next'
import { FaEllipsis, FaUserSlash, FaBan } from 'react-icons/fa6'

import { PostsItemsType } from '@/modules/posts'
import { BanUserModal } from '@/modules/users-modules/users-list/components/ban/BanUserModal'
import { DeleteModal } from '@/modules/users-modules/users-list/components/delete-modal/DeleteModal'
import { UnbanUserModal } from '@/modules/users-modules/users-list/components/unban/UnbanUserModal'

type TableActionsDropDownType = {
  post: Pick<PostsItemsType, 'userName' | 'status' | 'userId'>
}

export const TableActionsDropDown = ({
  post: { userName, status, userId },
}: TableActionsDropDownType) => {
  const { t } = useTranslation()
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false)
  const [isUnbanUserOpen, setIsUnbanUserOpen] = useState(false)
  const [isBanUserOpen, setIsBanUserOpen] = useState(false)

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
    <>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <button className="flex align-center" aria-label="Customise options">
            <FaEllipsis size={24} color="#fff" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side={'bottom'}
            align={'end'}
            className="bg-dark-500 border border-dark-100 p-3 text-sm"
          >
            <DropdownMenu.Item
              className="flex items-center mb-3 cursor-pointer"
              onSelect={() => onDeleteClick()}
            >
              <FaUserSlash size={24} className="mr-3" />
              {t('userList.deleteUser')}
            </DropdownMenu.Item>

            {status === 'ACTIVE' && (
              <DropdownMenu.Item
                className="flex items-center mb-3 cursor-pointer"
                onSelect={() => onBanClick()}
              >
                <FaBan size={24} className="mr-3" />
                {t('userList.banUser')}
              </DropdownMenu.Item>
            )}

            {status === 'BANNED' && (
              <DropdownMenu.Item
                className="flex items-center mb-3 cursor-pointer"
                onSelect={() => onUnbanClick()}
              >
                <FaBan size={24} className="mr-3" />
                {t('userList.unbanUser')}
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
    </>
  )
}
