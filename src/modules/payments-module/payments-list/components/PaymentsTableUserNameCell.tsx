import { FC } from 'react'

import { Row } from '@tanstack/react-table'
import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FaUserSecret } from 'react-icons/fa6'

import { PaymentsItem } from '@/modules/payments-module/payments-list/components/PaymentsTable'
import { UserStatusType } from '@/types'

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
        <div className={clsx('relative object-cover  w-9 h-9 mr-3 shrink-0')}>
          {row.original.urlAvatar ? (
            <Image
              src={row.original.urlAvatar!}
              alt={row.original.userName}
              fill
              className={clsx('border-2 rounded-full', {
                'border-emerald-700': row.original.statusUser === UserStatusType.Active,
                'border-danger-700': row.original.statusUser === UserStatusType.Banned,
              })}
            />
          ) : (
            <div
              className={clsx(
                'h-full flex items-center justify-center bg-white border-2 rounded-full',
                {
                  'border-emerald-700': row.original.statusUser === UserStatusType.Active,
                  'border-danger-700': row.original.statusUser === UserStatusType.Banned,
                }
              )}
            >
              <FaUserSecret size={20} className="text-black" />
            </div>
          )}
        </div>

        <div className="border-b border-current truncate">{row.original.userName}</div>
      </Link>
    </div>
  )
}
