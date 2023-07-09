import { useEffect, useState } from 'react'

import { PaginationState, SortingState } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useDebounce } from 'usehooks-ts'

import { UsersTable } from '@/modules/users-modules/users-list/components/UsersTable'
import { UsersTableToolbar } from '@/modules/users-modules/users-list/components/UsersTableToolbar'
import { getSorting } from '@/modules/users-modules/users-list/helpers/getSorting'
import { useGetAllUsersQuery } from '@/queries/users.generated'
import { UserStatusInputType } from '@/types'

export const UsersList = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<SortingState>([])

  const [status, setStatus] = useState<UserStatusInputType>(UserStatusInputType.All)
  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput, 500)

  useEffect(() => {
    setPagination(prev => ({ ...prev, pageIndex: 0 }))
  }, [search, pageSize])

  const { loading, error, data } = useGetAllUsersQuery({
    variables: {
      pageSize,
      pageNumber: pageIndex,
      status,
      search,
      ...getSorting(sorting),
    },
  })

  if (error) return <p>Error : {error.message}</p>

  return (
    <>
      <UsersTableToolbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        status={status}
        setStatus={setStatus}
      />

      <UsersTable
        users={data?.users?.items || []}
        pagesCount={data?.users?.pagesCount || 1}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        loading={loading}
      />
    </>
  )
}
