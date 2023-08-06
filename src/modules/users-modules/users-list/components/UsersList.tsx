import { useEffect, useState } from 'react'

import { SortingState } from '@tanstack/react-table'
import { useDebounce } from 'usehooks-ts'

import { TablePagination } from '@/components/table-pagination'
import { UsersTable } from '@/modules/users-modules/users-list/components/UsersTable'
import { UsersTableToolbar } from '@/modules/users-modules/users-list/components/UsersTableToolbar'
import { getUsersSorting } from '@/modules/users-modules/users-list/helpers/getUsersSorting'
import { useGetAllUsersQuery } from '@/queries/users.generated'
import { UserStatusInputType } from '@/types'

export const UsersList = () => {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState('10')
  const [sorting, setSorting] = useState<SortingState>([])

  const [status, setStatus] = useState<UserStatusInputType>(UserStatusInputType.All)
  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput, 500)

  useEffect(() => {
    setPageIndex(0)
  }, [search, pageSize])

  const { error, data, previousData } = useGetAllUsersQuery({
    variables: {
      pageSize: +pageSize,
      pageNumber: pageIndex + 1,
      status,
      search,
      ...getUsersSorting(sorting),
    },
    fetchPolicy: 'cache-and-network',
  })

  return (
    <div>
      <UsersTableToolbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        status={status}
        setStatus={setStatus}
      />

      {error ? (
        <p>Error : {error.message}</p>
      ) : (
        <UsersTable
          users={data?.users.items || previousData?.users.items || []}
          sorting={sorting}
          setSorting={setSorting}
        />
      )}

      {!error && (
        <TablePagination
          pagesCount={data?.users.pagesCount || previousData?.users.pagesCount || 1}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}
    </div>
  )
}
