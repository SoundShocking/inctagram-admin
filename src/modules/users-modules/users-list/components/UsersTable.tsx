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
import Link from 'next/link'

import { UsersTableUserActions } from './UsersTableUserActions'
import { UsersTableUserIdCell } from './UsersTableUserIdCell'

import { useTranslation } from '@/components'
import { TableSortIcon } from '@/components/Tables/table-sort-icon'
import { UserForSuperAdminViewModel } from '@/types'

export type UsersItem = Pick<
  UserForSuperAdminViewModel,
  'userId' | 'userName' | 'fullName' | 'lastSeen' | 'createdAt' | 'status'
>

const columnHelper = createColumnHelper<UsersItem>()

interface Props {
  users: UsersItem[]
  sorting: SortingState
  setSorting: Dispatch<SetStateAction<SortingState>>
}

export const UsersTable: FC<Props> = ({ users, sorting, setSorting }) => {
  const { t } = useTranslation()

  const columns = [
    columnHelper.accessor('userId', {
      id: 'id',
      header: t.translation.userList.table.userId,
      cell: props => <UsersTableUserIdCell row={props.row} />,
      enableSorting: true,
      sortDescFirst: false,
    }),
    columnHelper.accessor('fullName', {
      id: 'fullName',
      header: 'Full Name',
      cell: info => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor('userName', {
      id: 'userName',
      header: t.translation.userList.table.username,
      cell: info => (
        <Link
          className="underline underline-offset-4 hover:text-accent-500 transition-colors"
          href={`/users/${info.row.original.userId}`}
        >
          {info.getValue()}
        </Link>
      ),
      enableSorting: true,
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: t.translation.userList.table.dateAdded,
      cell: info => dayjs(info.getValue()).format('DD.MM.YYYY HH:mm'),
      enableSorting: true,
    }),
    columnHelper.accessor('lastSeen', {
      id: 'lastSeen',
      header: 'Last Seen',
      cell: info => {
        const date = dayjs(info.getValue())

        if (date.isValid()) {
          return date.format('DD.MM.YYYY HH:mm')
        }

        return null
      },
      enableSorting: true,
      sortDescFirst: false,
    }),
    columnHelper.display({
      id: 'actions',
      cell: props => <UsersTableUserActions viewInfo={true} row={props.row} />,
      enableSorting: false,
    }),
  ]

  const table = useReactTable({
    data: users,
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
      <div className="text-accent-500 mt-6">
        <div>
          <table className="w-full grid">
            <thead
              className={
                'h-12 bg-dark-500 border-2 border-dark-500 border-r-2 text-light-100 font-semibold text-sm grid'
              }
            >
              {table.getHeaderGroups().map((headerGroup, key) => (
                <tr key={key} data-key={key} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_72px]">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={clsx('flex items-center justify-center select-none', {
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
                      'border-[1px] border-dark-500 text-light-100 font-normal text-sm grid grid-cols-[1fr_1fr_1fr_1fr_1fr_72px]'
                    }
                    key={row.id}
                  >
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td className={'pb-3 pt-3 text-center'} key={cell.id}>
                          <div className="w-full flex align-middle justify-center">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
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
