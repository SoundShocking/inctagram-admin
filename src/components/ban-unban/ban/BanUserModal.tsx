import React, { useState } from 'react'

import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import { ModalWithContent } from '@/components/modals'
import { GET_POSTS_LIST } from '@/modules/posts'
import { UPDATE_USER_STATUS } from '@/queries/delete-ban'
import { GetAllUsersDocument } from '@/queries/users.generated'
import { BanReasonInputType } from '@/types'
import { DetailsInput } from '@/ui/inputs/details-input/DetailsInput'
import { Select, SelectItem } from '@/ui/Select/Select'

type PropsType = {
  isBanUserOpen: boolean
  setIsBanUserOpen: (isBanUserOpen: boolean) => void
  userId: number
  userName: string
}

type ReasonType = {
  text: string
  value: BanReasonInputType
}
export const BanUserModal = ({ isBanUserOpen, setIsBanUserOpen, userId, userName }: PropsType) => {
  const { t } = useTranslation()
  const [updateUserStatus] = useMutation(UPDATE_USER_STATUS)
  const ANOTHER_REASON = t('userList.ban.reason.anotherReason')
  const BAD_BEHAVIOR = t('userList.ban.reason.behavior')
  const ADVERTISING_PLACEMENT = t('userList.ban.reason.advertising')

  const reasons: ReasonType[] = [
    { text: ANOTHER_REASON, value: BanReasonInputType.AnotherReason },
    { text: BAD_BEHAVIOR, value: BanReasonInputType.BadBehavior },
    { text: ADVERTISING_PLACEMENT, value: BanReasonInputType.AdvertisingPlacement },
  ]

  const [banReason, setBanReason] = useState<BanReasonInputType>(BanReasonInputType.BadBehavior)
  const [banDetails, setBanDetails] = useState('')
  const [error, setError] = useState('')

  const onDecline = () => {
    setIsBanUserOpen(false)
  }

  const onConfirm = () => {
    updateUserStatus({
      variables: { userId, banReason, isBanned: true, details: banDetails },
      refetchQueries: [GET_POSTS_LIST, GetAllUsersDocument],
    })
      .then(() => {
        console.log('User banned successfully')
      })
      .catch(error => {
        console.error('Error banning user:', error)
      })
      .finally(() => {
        setIsBanUserOpen(false)
      })
  }

  return (
    <ModalWithContent
      isOpen={isBanUserOpen}
      onClose={onDecline}
      title={t('userList.ban.title')}
      confirmButtonText={t('userList.ban.confirm')}
      declineButtonText={t('userList.ban.cancel')}
      onConfirm={onConfirm}
      onDecline={onDecline}
      disabled={error.length > 0}
    >
      <div>
        <h3>{t('userList.ban.description') + ' ' + userName + '?'}</h3>

        <div className={'mt-3'}>{`${t('userList.ban.reason.title')}:`}</div>

        <div className={'mt-4'}>
          <Select<BanReasonInputType> value={banReason} setValue={setBanReason} fullWidth>
            {reasons.map(reason => (
              <SelectItem value={reason.value} key={reason.value}>
                {reason.text}
              </SelectItem>
            ))}
          </Select>

          <div className={'mt-4'}>
            {banReason === BanReasonInputType.AnotherReason && (
              <DetailsInput
                banDetails={banDetails}
                setBanDetails={setBanDetails}
                setError={setError}
                error={error}
              />
            )}
          </div>
        </div>
      </div>
    </ModalWithContent>
  )
}
