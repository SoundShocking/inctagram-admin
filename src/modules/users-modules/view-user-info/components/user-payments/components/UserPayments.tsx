import React, { useMemo, useState } from 'react'

import { useQuery } from '@apollo/client'
import {
  getCoreRowModel,
  useReactTable,
  PaginationState,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
  Table,
} from '@tanstack/react-table'
import { useRouter } from 'next/router'

import { capitalizeFirstLetter, dateChangesFormat } from '@/common'
import {
  GET_USER_PAYMENTS,
  ItemsUserPaymentsType,
  PaymentsUser,
  setUserPaymentsDataEffect,
  SkeletonUserPayments,
  UserPaymentsTable,
  UserPaymentsType,
} from '@/modules/users-modules/view-user-info'

export const UserPayments = () => {
  const router = useRouter()
  const { userId } = router.query
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const pagination: { pageIndex: number; pageSize: number } = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )
  const { loading, data, error } = useQuery<UserPaymentsType>(GET_USER_PAYMENTS, {
    variables: {
      userId: Number(userId),
      pageNumber: pageIndex + 1,
      pageSize: pageSize,
    },
    fetchPolicy: 'cache-first',
  })
  const paymentsUser: PaymentsUser | undefined = data?.user.paymentsUser
  const pageCount: number | undefined = paymentsUser?.pagesCount
  const [myPaymentsData, setMyPaymentsData] = useState<ItemsUserPaymentsType[]>([])

  setUserPaymentsDataEffect(paymentsUser, loading, setMyPaymentsData)

  const columns: ColumnDef<ItemsUserPaymentsType>[] = [
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
  ]

  const tableProps: Table<ItemsUserPaymentsType> = useReactTable({
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
    getSortedRowModel: getSortedRowModel(),
  })

  if (error) return <p>Error : {error.message}</p>

  return (
    <div className=" text-accent-500 p-2 block max-w-full ">
      {data?.user.paymentsUser.items.length ? (
        <UserPaymentsTable tableProps={tableProps} loading={loading} />
      ) : (
        <div className="flex justify-center text-light-100 align-middle text-base leading-6 font-normal">
          <span> No payments ... :(</span>
        </div>
      )}
    </div>
  )
}
