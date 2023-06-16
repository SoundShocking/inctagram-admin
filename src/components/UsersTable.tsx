import { FC } from 'react'

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
  // const { loading, error, data } = useQuery(usersDocument)
  //
  // if (loading) return <p>Loading...</p>
  //
  // if (error) return <p>Error : {error.message}</p>
  //
  // if (data?.users) return <Table users={data.users.items} />

  const { loading, error, data } = useGetAllUsersQuery()

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error : {error.message}</p>

  if (data?.users) return <Table users={data.users.items} />

  // const table = useReactTable({
  //   data: data?.users?.items,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // })

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
}

const Table: FC<Props> = ({ users }) => {
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
      </div>

      <div>
        {users.map(user => (
          <div key={user.userId}>{user.userName}</div>
        ))}
      </div>
    </>
  )
}
