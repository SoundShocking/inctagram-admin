import React, { useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useTranslation } from 'react-i18next'
import { FaEllipsis, FaBan } from 'react-icons/fa6'

import { PostsItemsType } from '@/modules/posts'
import { BanUserModal } from '@/modules/users-modules/users-list/components/ban/BanUserModal'
import { UnbanUserModal } from '@/modules/users-modules/users-list/components/unban/UnbanUserModal'

type TableActionsDropDownType = {
  post: Pick<PostsItemsType, 'userName' | 'status' | 'userId'>
}

export const PostsActionsDropDown = ({
  post: { userName, status, userId },
}: TableActionsDropDownType) => {
  const { t } = useTranslation()
  const [isUnbanUserOpen, setIsUnBanPostOpen] = useState(false)
  const [isBanUserOpen, setIsBanPostOpen] = useState(false)

  const onBanClick = () => {
    setIsBanPostOpen(true)
  }

  const onUnbanClick = () => {
    setIsBanPostOpen(true)
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
        setIsBanUserOpen={setIsBanPostOpen}
        userId={userId}
        userName={userName}
      />
      <UnbanUserModal
        isUnbanUserOpen={isUnbanUserOpen}
        setIsUnbanUserOpen={setIsUnBanPostOpen}
        userName={userName}
        userId={userId}
      />
    </>
  )
}
