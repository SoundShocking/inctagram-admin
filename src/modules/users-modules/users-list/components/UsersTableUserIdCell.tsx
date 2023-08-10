import { FC } from 'react'

import { Row } from '@tanstack/react-table'
import { FaUserCheck, FaUserClock, FaUserLock, FaUserXmark } from 'react-icons/fa6'

import { UsersItem } from '@/modules/users-modules/users-list/components/UsersTable'
import { UserStatusType } from '@/types'

interface UsersTableUserIdCellProps {
  row: Row<UsersItem>
}

interface UserStatusIconProps {
  status: UserStatusType
  size: number
}

const UserStatusIcon: FC<UserStatusIconProps> = ({ status, size }) => {
  switch (status) {
    case UserStatusType.Active:
      return <FaUserCheck size={size} className="text-success-500" />

    case UserStatusType.Banned:
      return <FaUserLock size={size} className="text-danger-500" />

    case UserStatusType.Deleted:
      return <FaUserXmark size={size} />

    case UserStatusType.Pending:
      return <FaUserClock size={size} className="text-warning-500" />

    default:
      return null
  }
}

export const UsersTableUserIdCell: FC<UsersTableUserIdCellProps> = ({ row }) => {
  return (
    <div className="flex items-center">
      <div className="mr-3">
        <UserStatusIcon status={row.original.status} size={24} />
      </div>

      {row.original.userId}
    </div>
  )
}
