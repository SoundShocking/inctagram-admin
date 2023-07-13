import React, { useMemo, useState } from 'react'

import { useQuery } from '@apollo/client'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
} from '@tanstack/react-table'

import { capitalizeFirstLetter } from '@/common'
import {
  dateChangesFormat,
  setUserPaymentsDataEffect,
  SkeletonUserPayments,
} from '@/modules/users-modules/view-user-info'
import { GET_USER_PAYMENTS } from '@/modules/users-modules/view-user-info/components/my-payments/queries/viewUserPaymentsQueries'
import {
  ItemsPaymentsType,
  PaymentsUser,
  UserPaymentsType,
} from '@/modules/users-modules/view-user-info/components/my-payments/types/UserPaymentsType'

export const UserPayments = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { loading, data } = useQuery<UserPaymentsType>(GET_USER_PAYMENTS, {
    variables: {
      userId: Number(10),
      pageNumber: pageIndex + 1,
      pageSize: pageSize,
    },
  })
  const paymentsUser: PaymentsUser | undefined = data?.user.paymentsUser
  const pageCount: number | undefined = paymentsUser?.pagesCount
  const [myPaymentsData, setMyPaymentsData] = useState<ItemsPaymentsType[]>([])

  const pagination: { pageIndex: number; pageSize: number } = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  setUserPaymentsDataEffect(paymentsUser, loading, setMyPaymentsData)

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: 'Date of Payment',
        cell: (params: any) =>
          loading ? <SkeletonUserPayments /> : dateChangesFormat(params.getValue()),
        accessorKey: 'dataOfPayment',
      },
      {
        header: 'End date of subscription',
        cell: (params: any) =>
          loading ? <SkeletonUserPayments /> : dateChangesFormat(params.getValue()),
        accessorKey: 'endDateOfSubscription',
      },
      {
        header: 'Price',
        cell: (params: any) => (loading ? <SkeletonUserPayments /> : '$' + params.getValue()),
        accessorKey: 'price',
      },
      {
        header: 'Subscription Type',
        cell: (params: any) =>
          loading ? <SkeletonUserPayments /> : capitalizeFirstLetter(params.getValue()),
        accessorKey: 'type',
      },
      {
        header: 'Payment Type',
        cell: (params: any) =>
          loading ? <SkeletonUserPayments /> : capitalizeFirstLetter(params.getValue()),
        accessorKey: 'paymentType',
      },
    ],
    [loading, data]
  )
  const tableProps = useReactTable({
    data: myPaymentsData,
    columns: columns,
    state: {
      pagination,
    },
    pageCount: pageCount,
    manualSorting: true,
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    getSortedRowModel: getSortedRowModel(),
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
              {tableProps.getHeaderGroups().map((headerGroup, key) => (
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
              {tableProps.getRowModel().rows.map(row => {
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
              onClick={() => tableProps.setPageIndex(0)}
              disabled={!tableProps.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => tableProps.previousPage()}
              disabled={!tableProps.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => tableProps.nextPage()}
              disabled={!tableProps.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => tableProps.setPageIndex(tableProps.getPageCount() - 1)}
              disabled={!tableProps.getCanNextPage()}
            >
              {'>>'}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {tableProps.getState().pagination.pageIndex + 1} of {tableProps.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={tableProps.getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) + 1 : 0

                  tableProps.setPageIndex(page)
                }}
                className="border p-1 rounded w-16 bg-dark-500 text-light-100 text-sm font-normal"
              />
            </span>
            <select
              className={'bg-dark-500 text-light-100 text-sm font-normal'}
              value={tableProps.getState().pagination.pageSize}
              onChange={e => {
                tableProps.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            {loading ? 'Loading...' : null}
          </div>
          <div>{tableProps.getRowModel().rows.length} Rows</div>
        </div>
      </div>
    </>
  )
}
