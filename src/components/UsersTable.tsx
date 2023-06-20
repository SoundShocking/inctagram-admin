import { FC, useMemo, useState } from 'react'

import { flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table'
import { createColumnHelper } from '@tanstack/table-core'
import dayjs from 'dayjs'

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
      <div>
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            {'<'}
          </button>

          {Array.from({ length: table.getPageCount() || 1 }, (_, idx) => idx + 1).map(n => (
            <button key={n} onClick={() => setPageNumber(n)}>
              {n}
            </button>
          ))}

          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            {'>'}
          </button>

          <select value={pageSize} onChange={e => setPageSize(+e.target.value)}>
            {[10, 20, 30, 40, 50, 100].map((size, idx) => (
              <option value={size} key={idx}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
        </div>
      </div>
    </>
  )
}
