import { FC } from 'react'

import { Row } from '@tanstack/react-table'
import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FaUserSecret } from 'react-icons/fa6'

import { PaymentsItem } from '@/modules/payments-module/payments-list/components/PaymentsTable'
import { StatusSubscriptionType } from '@/types'

interface Props {
  row: Row<PaymentsItem>
}

export const PaymentsTableUserNameCell: FC<Props> = ({ row }) => {
  return (
    <div className="flex">
      <Link
        href={`/users/${row.original.userId}`}
        className="inline-flex items-center hover:text-accent-500 transition-colors max-w-full"
      >
        <div
          className={clsx(
            'relative object-cover rounded-full overflow-hidden w-9 h-9 mr-3 shrink-0 border-2',
            { 'border-success-500': row.original.status === StatusSubscriptionType.Active }
          )}
        >
          {row.original.urlAvatar ? (
            <Image src={row.original.urlAvatar!} alt={row.original.userName} fill />
          ) : (
            <div className="h-full flex items-center justify-center bg-white">
              <FaUserSecret size={24} className="text-white" />
            </div>
          )}
        </div>

        <div className="border-b border-current truncate">{row.original.userName}</div>
      </Link>
    </div>
  )
}
