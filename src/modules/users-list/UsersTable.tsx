import { FC, useMemo, useState } from 'react'

import { flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table'
import { createColumnHelper } from '@tanstack/table-core'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import { useGetAllUsersQuery } from '@/queries/users.generated'
import { UserForSuperAdminViewModel } from '@/types'

const columnHelper =
  createColumnHelper<Pick<UserForSuperAdminViewModel, 'userId' | 'userName' | 'createdAt'>>()

const columns = [
  columnHelper.accessor('userId', {
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('userName', {
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('createdAt', {
    cell: info => dayjs(info.getValue()).format('DD.MM.YYYY'),
  }),
  columnHelper.display({
    id: 'actions',
    cell: props => <RowActions row={props.row} />,
  }),
]

const RowActions = ({
  row,
}: {
  row: Row<Pick<UserForSuperAdminViewModel, 'userId' | 'userName' | 'createdAt'>>
}) => {
  console.log(row)

  return <>row</>
}

export const UsersTable = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { loading, error, data } = useGetAllUsersQuery({
    variables: {
      pageSize,
      pageNumber,
    },
  })

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error : {error.message}</p>

  if (data?.users)
    return (
      <Table
        users={data.users.items}
        pagesCount={data.users.pagesCount}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        pageSize={pageSize}
      />
    )

  return (
    <>
      <div>count: {data?.users.totalCount}</div>

      {data?.users.items.map(user => (
        <div key={user.userId}>{user.userName}</div>
      ))}
    </>
  )
}

interface Props {
  users: Pick<UserForSuperAdminViewModel, 'userId' | 'userName' | 'createdAt'>[]
  pagesCount: number
  setPageNumber: (number: number) => void
  setPageSize: (page: number) => void
  pageNumber: number
  pageSize: number
}

const Table: FC<Props> = ({
  users,
  pagesCount,
  setPageNumber,
  setPageSize,
  pageSize,
  pageNumber,
}) => {
  // const pageIndex = 1
  // const pageSize = 10
  //
  // const pagination = useMemo(
  //   () => ({
  //     pageIndex,
  //     pageSize,
  //   }),
  //   [pageIndex, pageSize]
  // )

  const { t } = useTranslation()

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: pagesCount,
    state: {
      pagination: {
        pageSize,
        pageIndex: pageNumber,
      },
    },
    manualPagination: true,
    debugTable: true,
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
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0

                  table.setPageIndex(page)
                }}
                className="border p-1 rounded w-16 bg-dark-500 text-light-100 text-sm font-normal"
              />
            </span>
            <select
              className={'bg-dark-500 text-light-100 text-sm font-normal'}
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {/*Show*/}
                  {t('userList.show')} {pageSize}
                </option>
              ))}
            </select>
            {/*{dataQuery.isFetching ? 'Loading...' : null}*/}
          </div>
          <div>{table.getRowModel().rows.length} Rows</div>
          {/*<div>*/}
          {/*  <button onClick={() => rerender()}>Force Rerender</button>*/}
          {/*</div>*/}
          {/*<pre>{JSON.stringify(pagination, null, 2)}</pre>*/}
        </div>
      </div>
    </>
  )
}
