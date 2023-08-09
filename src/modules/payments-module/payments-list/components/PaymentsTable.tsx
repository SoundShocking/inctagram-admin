import { Dispatch, FC, SetStateAction } from 'react'

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { createColumnHelper } from '@tanstack/table-core'
import { clsx } from 'clsx'
import dayjs from 'dayjs'

import { PaymentsTableUserNameCell } from './PaymentsTableUserNameCell'

import { useTranslation } from '@/components'
import { TableSortIcon } from '@/components/Tables/table-sort-icon'
import { PaymentListViewModel } from '@/types'

export type PaymentsItem = Pick<
  PaymentListViewModel,
  | 'urlAvatar'
  | 'userName'
  | 'userId'
  | 'createdAt'
  | 'amount'
  | 'typeSubscription'
  | 'paymentTypeText'
>

const columnHelper = createColumnHelper<PaymentsItem>()

interface Props {
  payments: PaymentsItem[]
  sorting: SortingState
  setSorting: Dispatch<SetStateAction<SortingState>>
  loading: boolean
}

export const PaymentsTable: FC<Props> = ({ payments, sorting, setSorting, loading }) => {
  const { t } = useTranslation()

  const columns = [
    columnHelper.accessor('userName', {
      id: 'username',
      header: t.translation.payments.userName,
      cell: info => <PaymentsTableUserNameCell row={info.row} />,
      enableSorting: false,
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: t.translation.payments.dateAdded,
      cell: info => dayjs(info.getValue()).format('DD.MM.YYYY H:mm'),
      enableSorting: true,
    }),
    columnHelper.accessor('amount', {
      id: 'price',
      header: t.translation.payments.amount,
      cell: info => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('typeSubscription', {
      id: 'typeSubscription',
      header: t.translation.payments.subscription,
      cell: info => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor('paymentTypeText', {
      id: 'paymentType',
      header: t.translation.payments.paymentMethod,
      cell: info => info.getValue(),
      enableSorting: true,
    }),
  ]

  const table = useReactTable({
    data: payments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    manualSorting: true,
  })

  return (
    <div className="mt-6 relative">
      {loading && (
        <div
          className="absolute top-0 w-full h-0.5 animate-animateRainbowBorder"
          style={{
            backgroundImage:
              'linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)',
            backgroundSize: '800% 100%',
          }}
        ></div>
      )}
      <table className="w-full grid text-white text-sm">
        <thead
          className={
            'h-12 bg-dark-500 border-2 border-dark-500 border-r-2 font-semibold text-sm grid'
          }
        >
          {table.getHeaderGroups().map((headerGroup, key) => (
            <tr key={key} className="grid grid-cols-[1fr_180px_180px_180px_180px] items-center">
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={clsx('flex items-center justify-center select-none h-full', {
                        'cursor-pointer': header.column.getCanSort(),
                      })}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}

                      <TableSortIcon
                        isCanSort={header.column.getCanSort()}
                        isSorted={header.column.getIsSorted()}
                      />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="grid">
          {table.getRowModel().rows.map(row => {
            return (
              <tr
                className={
                  'border-[1px] border-dark-500 grid grid-cols-[1fr_180px_180px_180px_180px] items-center'
                }
                key={row.id}
              >
                {row.getVisibleCells().map(cell => {
                  return (
                    <td className={'py-3 px-1.5 text-center overflow-hidden'} key={cell.id}>
                      <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
