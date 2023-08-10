import React, { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  ColumnDef,
  Table,
  SortingState,
} from '@tanstack/react-table'
import { useRouter } from 'next/router'

import { dateChangesFormat } from '@/common'
import { ErrorMessage, TableSortingCol } from '@/components'
import {
  setUserSkeletonDataEffect,
  SkeletonUserPayments,
  UserPaymentsTable,
} from '@/modules/users-modules/view-user-info'
import { GET_USER_FOLLOWS } from '@/modules/users-modules/view-user-info/components/user-payments/queries/viewUserFollowersQueries'
import {
  SortByForUsers,
  UserFollowsForSuperAdminViewModel,
  UserFollowsWithPaginationViewModel,
} from '@/types'
import { TablePagination } from 'components/Tables/table-pagination'

export type UserFollowingType = {
  user: {
    followersUser: UserFollowsWithPaginationViewModel
  }
}
export const UserFollowers = () => {
  const router = useRouter()
  const { userId } = router.query
  const [userFollowersData, setUserFollowersData] = useState<UserFollowsWithPaginationViewModel>()
  const [myUserFollowerData, setMyUserFollowerData] = useState<UserFollowsForSuperAdminViewModel[]>(
    []
  )
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState('10')
  const [sorting, setSorting] = useState<SortingState>([])

  const { loading, error } = useQuery<UserFollowingType>(GET_USER_FOLLOWS, {
    variables: {
      userId: Number(userId),
      pageNumber: pageIndex + 1,
      pageSize: +pageSize,
      ...TableSortingCol<SortByForUsers>(sorting),
    },
    onCompleted: (data: UserFollowingType) => setUserFollowersData(data.user.followersUser),
    onError: error => console.error('error', error),
    fetchPolicy: 'cache-and-network',
  })
  const pageCount: number | undefined = userFollowersData?.pagesCount

  setUserSkeletonDataEffect<UserFollowsWithPaginationViewModel, UserFollowsForSuperAdminViewModel>(
    userFollowersData,
    loading,
    setMyUserFollowerData
  )
  const columns: ColumnDef<UserFollowsForSuperAdminViewModel>[] = [
    {
      header: 'User ID',
      cell: (params: any) => (loading ? <SkeletonUserPayments /> : params.getValue()),
      accessorKey: 'userId',
      enableSorting: false,
    },
    {
      header: 'Full Name',
      cell: (params: any) => (loading ? <SkeletonUserPayments /> : params.getValue()),
      accessorKey: 'fullName',
      enableSorting: false,
    },
    {
      header: 'User Name',
      cell: (params: any) => (loading ? <SkeletonUserPayments /> : params.getValue()),
      accessorKey: 'userName',
      enableSorting: false,
    },
    {
      header: 'Subscription Date',
      cell: (params: any) =>
        loading ? <SkeletonUserPayments /> : dateChangesFormat(params.getValue()),
      accessorKey: 'createdAt',
      enableSorting: true,
    },
  ]

  const tableProps: Table<UserFollowsForSuperAdminViewModel> = useReactTable({
    data: myUserFollowerData,
    columns: columns,
    pageCount: pageCount,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="mt-9 text-accent-500 p-2 block w-full ">
      <ErrorMessage errorMessage={error?.message} />
      <UserPaymentsTable<UserFollowsForSuperAdminViewModel> tableProps={tableProps} />
      {userFollowersData?.pagesCount ? (
        <TablePagination
          pagesCount={userFollowersData.pagesCount}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      ) : (
        <div className="flex justify-center items-center text-light-100 leading-6 text-sm">
          <span>No Data</span>
        </div>
      )}
    </div>
  )
}
