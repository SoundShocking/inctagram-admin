import React, { Dispatch, FC, SetStateAction } from 'react'

import { useTranslation } from '@/components'
import { UserStatusInputType } from '@/types'
import { Select, SelectItem } from '@/ui/Select/Select'

interface Props {
  searchInput: string
  setSearchInput: (value: string) => void
  status: UserStatusInputType
  setStatus: Dispatch<SetStateAction<UserStatusInputType>>
}

export const UsersTableToolbar: FC<Props> = ({
  searchInput,
  setSearchInput,
  status,
  setStatus,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex justify-between gap-8">
        <input
          className="w-full h-9 bg-transparent text-light-100 text-sm outline-none border border-dark-100 px-10"
          type="text"
          placeholder={t.translation.userList.search}
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />

        <Select<UserStatusInputType> value={status} setValue={setStatus}>
          <SelectItem value={UserStatusInputType.All}>
            {t.translation.userList.notSelected}
          </SelectItem>
          <SelectItem value={UserStatusInputType.Banned}>
            {t.translation.userList.blocked}
          </SelectItem>
          <SelectItem value={UserStatusInputType.Active}>
            {t.translation.userList.notBlocked}
          </SelectItem>
          <SelectItem value={UserStatusInputType.Pending}>Pending</SelectItem>
        </Select>
      </div>
    </>
  )
}
