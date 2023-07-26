import { Dispatch, FC, SetStateAction } from 'react'

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { createColumnHelper } from '@tanstack/table-core'
import dayjs from 'dayjs'

import { PaymentsTableUserNameCell } from '@/modules/payments-module/payments-list/components/PaymentsTableUserNameCell'
import { PaymentsListViewModel } from '@/types'

export type PaymentsItem = Pick<
  PaymentsListViewModel,
  'urlAvatar' | 'userName' | 'userId' | 'createdAt' | 'amount' | 'typeSubscription' | 'paymentType'
>

const columnHelper = createColumnHelper<PaymentsItem>()

interface Props {
  payments: PaymentsItem[]
  sorting: SortingState
  setSorting: Dispatch<SetStateAction<SortingState>>
}

export const PaymentsTable: FC<Props> = ({ payments, sorting, setSorting }) => {
  const columns = [
    columnHelper.accessor('userName', {
      id: 'username',
      header: 'Username',
      cell: info => <PaymentsTableUserNameCell row={info.row} />,
      enableSorting: false,
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: 'Date added',
      cell: info => dayjs(info.getValue()).format('DD.MM.YYYY'),
      enableSorting: true,
    }),
    columnHelper.accessor('amount', {
      id: 'price',
      header: 'Amount, $',
      cell: info => `${info.getValue()}$`,
      enableSorting: true,
    }),
    columnHelper.accessor('typeSubscription', {
      id: 'typeSubscription',
      header: 'Subscription',
      cell: info => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor('paymentType', {
      id: 'paymentType',
      header: 'Payment Method',
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
    <>
      <div className=" text-accent-500 p-2 block max-w-full ">
        <div className={`max-w-[972px]`}>
          <table>
            <thead
              className={
                'h-12 bg-dark-500 border-2 border-dark-500 border-r-2 text-light-100 font-semibold text-sm'
              }
            >
              {table.getHeaderGroups().map((headerGroup, key) => (
                <tr key={key}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map(row => {
                return (
                  <tr
                    className={'border-[1px] border-dark-500 text-light-100 font-normal text-sm'}
                    key={row.id}
                  >
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td
                          className={'pb-3 pt-3 text-center'}
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                        >
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
      </div>
    </>
  )
}
