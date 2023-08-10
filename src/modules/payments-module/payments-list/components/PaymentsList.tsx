import { FC, useEffect, useState } from 'react'

import { SortingState } from '@tanstack/react-table'
import { toast } from 'react-toastify'
import { useDebounce, useUpdateEffect } from 'usehooks-ts'

import { getPaymentsSorting } from '../helpers/getPaymentsSorting'

import { PaymentsTable } from './PaymentsTable'

import { useTranslation } from '@/components'
import { TablePagination } from '@/components/Tables/table-pagination'
import {
  useCreatedSubscriptionSubscription,
  useGetAllPaymentsQuery,
} from '@/queries/payments.generated'
import { Switch } from '@/ui/switch'

export const PaymentsList: FC = () => {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState('10')
  const [sorting, setSorting] = useState<SortingState>([])

  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput, 500)

  const [autoUpdate, setAutoUpdate] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    setPageIndex(0)
  }, [search, pageSize])

  const { loading, error, data, previousData, refetch } = useGetAllPaymentsQuery({
    variables: {
      pageSize: +pageSize,
      pageNumber: pageIndex + 1,
      search,
      ...getPaymentsSorting(sorting),
    },
    fetchPolicy: 'cache-and-network',
  })

  useCreatedSubscriptionSubscription({
    skip: !autoUpdate,
    onData: options => {
      const newSubscription = options.data.data?.createdSubscription

      toast.success(
        `added new subscription: ${newSubscription?.userName} - ${newSubscription?.amount}$`
      )

      refetch()
    },
    onComplete: () => {
      console.log('on complete')
    },
  })

  useUpdateEffect(() => {
    if (autoUpdate) {
      toast.success('auto update on', {
        toastId: 'paymentsAutoUpdateOn',
      })
    } else {
      toast.success('auto update off', {
        toastId: 'paymentsAutoUpdateOff',
      })
    }
  }, [autoUpdate])

  return (
    <div>
      <div className="flex justify-between gap-8">
        <input
          className="w-full h-9 bg-transparent text-light-100 text-sm outline-none border border-dark-100 px-10"
          type="text"
          placeholder={t.translation.userList.search}
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />

        <Switch
          text={t.translation.payments.autoUpdate}
          checked={autoUpdate}
          setChecked={setAutoUpdate}
        />
      </div>

      {error ? (
        <p>Error : {error.message}</p>
      ) : (
        <PaymentsTable
          payments={data?.paymentsList.items || previousData?.paymentsList.items || []}
          sorting={sorting}
          setSorting={setSorting}
          loading={loading}
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
