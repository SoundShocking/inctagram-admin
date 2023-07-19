import { FC } from 'react'

import { useTranslation } from 'react-i18next'

import { UserStatusInputType } from '@/types'

interface Props {
  status: UserStatusInputType
  setStatus: (status: UserStatusInputType) => void
}

export const StatusSelected: FC<Props> = ({ status, setStatus }) => {
  const { t } = useTranslation()

  return (
    <div className="flex justify-between flex-row-reverse pb-3 w-full h-full gap-8">
      <select
        className="bg-dark-500 align-bottom text-light-100 text-sm font-normal"
        value={status}
        onChange={e => setStatus(e.target.value as UserStatusInputType)}
      >
        <option value={UserStatusInputType.All}>{t('userList.notSelected')}</option>
        <option value={UserStatusInputType.Banned}>{t('userList.blocked')}</option>
        <option value={UserStatusInputType.Active}>{t('userList.notBlocked')}</option>
      </select>
    </div>
  )
}
