import { Dispatch, FC, SetStateAction } from 'react'

import { t } from 'i18next'

interface Props {
  pageSize: number
  setPageSize: Dispatch<SetStateAction<number>>
}

const perPageVariants = [10, 20, 30, 40, 50]

export const ItemsPerPageSelector: FC<Props> = ({ setPageSize, pageSize }) => {
  return (
    <>
      <select
        className={'bg-dark-500 text-light-100 text-sm font-normal'}
        value={pageSize}
        onChange={e => {
          setPageSize(+e.target.value)
        }}
      >
        {perPageVariants.map(pageSize => (
          <option key={pageSize} value={pageSize}>
            {t('userList.show')} {pageSize}
          </option>
        ))}
      </select>
    </>
  )
}
