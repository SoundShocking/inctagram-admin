import { FC } from 'react'

import { Row } from '@tanstack/react-table'

import { UserForSuperAdminViewModel } from '@/types'

interface Props {
  row: Row<Pick<UserForSuperAdminViewModel, 'userId' | 'userName' | 'createdAt'>>
}

export const UserActions: FC<Props> = ({ row }) => {
  console.log(row)

  return <>row</>
}
