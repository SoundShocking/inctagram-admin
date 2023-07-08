import { FC, useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Row } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FaEllipsis, FaUserSlash, FaBan } from 'react-icons/fa6'

import { BanUserModal } from '@/modules/users-modules/users-list/components/ban/BanUserModal'
import { DeleteModal } from '@/modules/users-modules/users-list/components/delete-modal/DeleteModal'
import { UserForSuperAdminViewModel } from '@/types'

interface Props {
  row: Row<Pick<UserForSuperAdminViewModel, 'userId' | 'userName' | 'createdAt'>>
}

export const TableActionsDropdown: ({ row }: { row: any }) => void = ({ row }) => {
  const router = useRouter()
  const handleMenuItemClickMoreInformation = () => {
    router.push(`/users-list/${row.original.userName}`)
  }

  const { t } = useTranslation()
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false)
  const [isBanUserOpen, setIsBanUserOpen] = useState(false)

  const userId = row.getVisibleCells()[0].getValue() as number
  const userName = row.getVisibleCells()[1].getValue() as string

  const onDeleteClick = () => {
    setIsDeleteUserOpen(true)
  }
  const onBanClick = () => {
    setIsBanUserOpen(true)
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
            <DropdownMenu.Item
              className="flex items-center mb-3 cursor-pointer"
              onSelect={() => onBanClick()}
            >
              <FaBan size={24} className="mr-3" />
              {t('userList.banUser')}
            </DropdownMenu.Item>

            <DropdownMenu.Item
              className="flex items-center cursor-pointer"
              onSelect={() => handleMenuItemClickMoreInformation()}
            >
              <FaEllipsis size={24} className="mr-3" />
              {t('userList.moreInfo')}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <BanUserModal
        isBanUserOpen={isBanUserOpen}
        setIsBanUserOpen={setIsBanUserOpen}
        defaultText={''}
        userId={userId}
        userName={userName}
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
