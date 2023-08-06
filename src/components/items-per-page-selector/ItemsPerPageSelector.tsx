import { Dispatch, FC, SetStateAction } from 'react'

import { useTranslation } from '@/components'
import { Select, SelectItem } from '@/ui/Select/Select'

interface Props {
  pageSize: string
  setPageSize: Dispatch<SetStateAction<string>>
}

const perPageVariants = [10, 20, 30, 40, 50]

export const ItemsPerPageSelector: FC<Props> = ({ setPageSize, pageSize }) => {
  const { t } = useTranslation()

  return (
    <>
      <Select<string> value={`${pageSize}`} setValue={setPageSize}>
        {perPageVariants.map(perPage => (
          <SelectItem value={`${perPage}`} key={perPage}>
            {t.translation.userList.show} {perPage}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
