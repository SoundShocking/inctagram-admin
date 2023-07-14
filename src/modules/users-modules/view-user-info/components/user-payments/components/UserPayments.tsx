import React, { useMemo, useState } from 'react'

import { useQuery } from '@apollo/client'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef, Table,
} from '@tanstack/react-table'

import { capitalizeFirstLetter } from '@/common'
import {
  dateChangesFormat,
  setUserPaymentsDataEffect,
  SkeletonUserPayments,
} from '@/modules/users-modules/view-user-info'
import { GET_USER_PAYMENTS } from '@/modules/users-modules/view-user-info/components/user-payments/queries/viewUserPaymentsQueries'
import {
  ItemsPaymentsType,
  PaymentsUser,
  UserPaymentsType,
} from '@/modules/users-modules/view-user-info/components/user-payments/types/UserPaymentsType'
import {
  UserPaymentsTable
} from "@/modules/users-modules/view-user-info/components/user-payments/components/UserPaymentsTable";

export const UserPayments = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { loading, data } = useQuery<UserPaymentsType>(GET_USER_PAYMENTS, {
    variables: {
      userId: Number(10),
      pageNumber: pageIndex + 1,
      pageSize: pageSize,
    },
    fetchPolicy: 'cache-first',
  })
  const paymentsUser: PaymentsUser | undefined = data?.user.paymentsUser
  const pageCount: number | undefined = paymentsUser?.pagesCount
  const [myPaymentsData, setMyPaymentsData] = useState<ItemsPaymentsType[]>([])

  const pagination: { pageIndex: number; pageSize: number } = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  setUserPaymentsDataEffect(paymentsUser, loading, setMyPaymentsData)

  const columns: ColumnDef<ItemsPaymentsType>[] = useMemo(
    () => [
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
    ],
    []
  )
  const tableProps: Table<ItemsPaymentsType> = useReactTable({
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
console.log('1')

  return (
    <>
      <div className=" text-accent-500 p-2 block max-w-full ">
        <UserPaymentsTable tableProps={tableProps} loading={loading} />
      </div>
    </>
  )
}
