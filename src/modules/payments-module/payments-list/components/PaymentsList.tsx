import { FC, useEffect, useState } from 'react'

import { SortingState } from '@tanstack/react-table'
import { t } from 'i18next'
import { toast } from 'react-toastify'
import { useDebounce } from 'usehooks-ts'

import { getPaymentsSorting } from '../helpers/getPaymentsSorting'

import { PaymentsTable } from './PaymentsTable'

import { TablePagination } from '@/components/table-pagination'
import { PAYMENTS_SUBSCRIPTION } from '@/queries/payments'
import {
  CreatedSubscriptionSubscription,
  useCreatedSubscriptionSubscription,
  useGetAllPaymentsQuery,
} from '@/queries/payments.generated'

export const PaymentsList: FC = () => {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState('10')
  const [sorting, setSorting] = useState<SortingState>([])

  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput, 500)

  useEffect(() => {
    setPageIndex(0)
  }, [search, pageSize])

  const { loading, error, data, previousData, subscribeToMore, refetch } = useGetAllPaymentsQuery({
    variables: {
      pageSize: +pageSize,
      pageNumber: pageIndex + 1,
      search,
      ...getPaymentsSorting(sorting),
    },
    fetchPolicy: 'cache-and-network',
  })

  useCreatedSubscriptionSubscription({
    onData: options => {
      const newSubscription = options.data.data?.createdSubscription

      toast.success(
        `added new subscription: ${newSubscription?.userName} - ${newSubscription?.amount}$`
      )

      refetch()
    },
  })

  // useEffect(() => {
  //   console.log('effect')
  //
  //   let unsubscribe: () => void
  //
  //   unsubscribe = subscribeToMore<CreatedSubscriptionSubscription>({
  //     document: PAYMENTS_SUBSCRIPTION,
  //     variables: {
  //       pageSize: +pageSize,
  //       pageNumber: pageIndex + 1,
  //       search,
  //     },
  //     updateQuery: (previousQueryResult, { subscriptionData, variables }) => {
  //       console.log(previousQueryResult)
  //       console.log(subscriptionData)
  //       console.log(variables)
  //
  //       refetch()
  //       if (!subscriptionData.data) return previousQueryResult
  //
  //       return previousQueryResult
  //
  //       // const newSubscription = [subscriptionData.data.createdSubscription]
  //       //
  //       // return Object.assign({}, previousQueryResult, {
  //       //   ...previousQueryResult,
  //       //   paymentsList: {
  //       //     ...previousQueryResult.paymentsList,
  //       //     items: [...newSubscription, ...previousQueryResult.paymentsList.items],
  //       //   },
  //       // })
  //
  //       // return previousQueryResult
  //     },
  //   })
  //
  //   return () => unsubscribe()
  // }, [subscribeToMore])

  return (
    <div className="pt-16 px-6">
      <div className="flex justify-between gap-8">
        <input
          className="w-full h-9 bg-transparent text-light-100 text-sm outline-none border border-dark-100 px-10"
          type="text"
          placeholder={t('userList.search')}
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
      </div>

      {error ? (
        <p>Error : {error.message}</p>
      ) : (
        <PaymentsTable
          payments={data?.paymentsList.items || previousData?.paymentsList.items || []}
          sorting={sorting}
          setSorting={setSorting}
        />
      )}

      {!error && (
        <TablePagination
          pagesCount={data?.paymentsList.pagesCount || previousData?.paymentsList.pagesCount || 1}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}
    </div>
  )
}
