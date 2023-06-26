import { FC } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Row } from '@tanstack/react-table'
import { FaEllipsis, FaUserSlash, FaBan } from 'react-icons/fa6'

import { UserForSuperAdminViewModel } from '@/types'

interface Props {
  row: Row<Pick<UserForSuperAdminViewModel, 'userId' | 'userName' | 'createdAt'>>
}

export const TableActionsDropdown: FC<Props> = ({ row }) => {
  return (
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
            onSelect={() => console.log('delete user')}
          >
            <FaUserSlash size={24} className="mr-3" /> Delete User
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="flex items-center mb-3 cursor-pointer"
            onSelect={() => console.log('ban user')}
          >
            <FaBan size={24} className="mr-3" /> Ban in the system
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="flex items-center cursor-pointer"
            onSelect={() => console.log('more')}
          >
            <FaEllipsis size={24} className="mr-3" /> More Information
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
