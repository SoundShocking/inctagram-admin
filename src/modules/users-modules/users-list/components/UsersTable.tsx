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
      header: t.translation.userList.table.fullName,
      cell: info => <div className="truncate">{info.getValue()}</div>,
      enableSorting: false,
    }),
    columnHelper.accessor('userName', {
      id: 'userName',
      header: t.translation.userList.table.username,
      cell: info => (
        <Link
          className="border-b border-current hover:text-accent-500 transition-colors truncate"
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
      header: t.translation.userList.table.lastSeen,
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
    <div className="mt-6">
      <table className="w-full grid text-white text-sm">
        <thead className="h-12 border-0 bg-dark-500 font-semibold grid">
          {table.getHeaderGroups().map((headerGroup, key) => (
            <tr key={key} className="grid grid-cols-[100px_1fr_1fr_160px_160px_36px] items-center">
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan} className="py-0 px-1.5">
                  {header.isPlaceholder ? null : (
                    <div
                      className={clsx('flex items-center select-none', {
                        'cursor-pointer': header.column.getCanSort(),
                      })}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="truncate">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>

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
                className="border-0 grid grid-cols-[100px_1fr_1fr_160px_160px_36px] items-center"
                key={row.id}
              >
                {row.getVisibleCells().map(cell => {
                  return (
                    <td className="py-3 px-1.5 text-center overflow-hidden" key={cell.id}>
                      <div className="w-full flex">
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
  )
}
