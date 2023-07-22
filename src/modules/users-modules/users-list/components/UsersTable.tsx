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
import { useTranslation } from 'react-i18next'

import { getUsersSorting } from '@/modules/users-modules/users-list/helpers/getUsersSorting'
import { UserForSuperAdminViewModel } from '@/types'
import { TableActionsDropdown } from '@/ui/dropdown/TableActionsDropdown'

const columnHelper =
  createColumnHelper<Pick<UserForSuperAdminViewModel, 'userId' | 'userName' | 'createdAt'>>()

interface Props {
  users: Pick<UserForSuperAdminViewModel, 'userId' | 'userName' | 'createdAt'>[]
  pagesCount: number
  sorting: SortingState
  setSorting: Dispatch<SetStateAction<SortingState>>
}

export const UsersTable: FC<Props> = ({ users, pagesCount, sorting, setSorting }) => {
  const { t } = useTranslation()

  const columns = [
    columnHelper.accessor('userId', {
      id: 'id',
      header: t('userList.table.userId'),
      cell: info => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('userName', {
      id: 'userName',
      header: t('userList.table.username'),
      cell: info => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: t('userList.table.dateAdded'),
      cell: info => dayjs(info.getValue()).format('DD.MM.YYYY'),
      enableSorting: true,
    }),
    columnHelper.display({
      id: 'actions',
      cell: props => <TableActionsDropdown viewInfo={true} row={props.row} />,
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
