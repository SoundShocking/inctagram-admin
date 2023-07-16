import { Dispatch, FC, SetStateAction, useMemo } from 'react'

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { createColumnHelper } from '@tanstack/table-core'
import dayjs from 'dayjs'
import { t } from 'i18next'

import { PaymentsListViewModel } from '@/types'

type PaymentsItem = Pick<
  PaymentsListViewModel,
  'userName' | 'createdAt' | 'amount' | 'typeSubscription' | 'paymentMethod'
>

const columnHelper = createColumnHelper<PaymentsItem>()

interface Props {
  payments: PaymentsItem[]
  pagesCount: number
  pageIndex: number
  pageSize: number
  setPagination: Dispatch<SetStateAction<PaginationState>>
  sorting: SortingState
  setSorting: Dispatch<SetStateAction<SortingState>>
}

export const PaymentsTable: FC<Props> = ({
  payments,
  pagesCount,
  pageSize,
  pageIndex,
  setPagination,
  sorting,
  setSorting,
}) => {
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const columns = [
    columnHelper.accessor('userName', {
      id: 'username',
      header: 'Username',
      cell: info => info.getValue(),
      enableSorting: true,
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
    columnHelper.accessor('paymentMethod', {
      id: 'paymentMethod',
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
    pageCount: pagesCount,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
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

          <div className="h-2" />
          <div className="pt-2 flex items-center gap-2 text-light-100 font-normal text-sm">
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
            <select
              className={'bg-dark-500 text-light-100 text-sm font-normal'}
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {t('userList.show')} {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  )
}
