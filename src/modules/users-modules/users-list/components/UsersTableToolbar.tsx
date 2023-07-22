import { FC } from 'react'

import { useTranslation } from 'react-i18next'

import { UserStatusInputType } from '@/types'

interface Props {
  searchInput: string
  setSearchInput: (value: string) => void
  status: UserStatusInputType
  setStatus: (status: UserStatusInputType) => void
}

export const UsersTableToolbar: FC<Props> = ({
  searchInput,
  setSearchInput,
  status,
  setStatus,
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex justify-between gap-8">
      <input
        className="w-full h-9 bg-transparent text-light-100 text-sm outline-none border border-dark-100 px-10"
        type="text"
        placeholder={t('userList.search')}
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
      />

      <select
        className="bg-dark-500 text-light-100 text-sm font-normal"
        value={status}
        onChange={e => setStatus(e.target.value as UserStatusInputType)}
      >
        <option value={UserStatusInputType.All}>{t('userList.notSelected')}</option>
        <option value={UserStatusInputType.Banned}>{t('userList.blocked')}</option>
        <option value={UserStatusInputType.Active}>{t('userList.notBlocked')}</option>
        <option value={UserStatusInputType.Pending}>Pending</option>
      </select>
    </div>
  )
}
