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
      return <FaUserCheck size={size} color="#14CC70" />

    case UserStatusType.Banned:
      return <FaUserLock size={size} color="#CC1439" />

    case UserStatusType.Deleted:
      return <FaUserXmark size={size} />

    case UserStatusType.Pending:
      return <FaUserClock size={size} color="#D99000" />

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
