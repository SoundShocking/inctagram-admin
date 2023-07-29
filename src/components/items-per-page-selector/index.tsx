import { Dispatch, FC, SetStateAction } from 'react'

import { useTranslation } from 'react-i18next'

interface Props {
  pageSize: number
  setPageSize: Dispatch<SetStateAction<number>>
}

const perPageVariants = [10, 20, 30, 40, 50]

export const ItemsPerPageSelector: FC<Props> = ({ setPageSize, pageSize }) => {
  const { i18n } = useTranslation()

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
            {i18n.t('userList.show')} {pageSize}
          </option>
        ))}
      </select>
    </>
  )
}
