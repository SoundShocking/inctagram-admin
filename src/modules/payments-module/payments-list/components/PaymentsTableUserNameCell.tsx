import { FC } from 'react'

import { Row } from '@tanstack/react-table'
import Image from 'next/image'
import Link from 'next/link'
import { FaUserSecret } from 'react-icons/fa6'

import { PaymentsItem } from '@/modules/payments-module/payments-list/components/PaymentsTable'

interface Props {
  row: Row<PaymentsItem>
}

export const PaymentsTableUserNameCell: FC<Props> = ({ row }) => {
  return (
    <div className="text-left">
      <Link
        href={`/users/${row.original.userId}`}
        className="inline-flex items-center text-left hover:text-accent-500 transition-colors"
      >
        <div className="relative object-cover rounded-full overflow-hidden w-9 h-9 mr-3">
          {row.original.urlAvatar ? (
            <Image src={row.original.urlAvatar!} alt={row.original.userName} fill />
          ) : (
            <div className="h-full flex items-center justify-center bg-white">
              <FaUserSecret size={24} color="#000" />
            </div>
          )}
        </div>

        <div className="underline underline-offset-4">{row.original.userName}</div>
      </Link>
    </div>
  )
}
