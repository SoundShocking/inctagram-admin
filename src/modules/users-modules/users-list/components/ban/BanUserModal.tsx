import React, { useContext, useState } from 'react'

import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import { ModalWithContent } from '@/components/modals'
import { BanReasonInputType, UPDATE_USER_STATUS } from '@/queries/delete-ban'
import { AuthContext } from '@/store/store'
import { ImageOption } from '@/ui/image-selector/image-option/ImageOption'
import { ImageSelector } from '@/ui/image-selector/ImageSelector'
import { DetailsInput } from '@/ui/inputs/details-input/DetailsInput'

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
  const { postStatusBannedDeleted, setPostStatusBannedDeleted } = useContext(AuthContext)
  const [updateUserStatus] = useMutation(UPDATE_USER_STATUS)
  const ANOTHER_REASON = t('userList.ban.reason.anotherReason')
  const BAD_BEHAVIOR = t('userList.ban.reason.behavior')
  const ADVERTISING_PLACEMENT = t('userList.ban.reason.advertising')

  const reasons: ReasonType[] = [
    { text: ANOTHER_REASON, value: 'Another_reason' },
    { text: BAD_BEHAVIOR, value: 'Bad_behavior' },
    { text: ADVERTISING_PLACEMENT, value: 'Advertising_placement' },
  ]

  const defaultText = BAD_BEHAVIOR

  const [isOpen, setIsOpen] = useState(false)
  const [banReasonName, setBanReasonName] = useState(defaultText)
  const [banReasonValue, setBanReasonValue] = useState<BanReasonInputType>('Bad_behavior')
  const [banDetails, setBanDetails] = useState('')
  const [error, setError] = useState('')

  const onDropdownClick = () => {
    setIsOpen(!isOpen)
  }

  const onDecline = () => {
    setIsBanUserOpen(false)
    setIsOpen(false)
  }

  const onConfirm = () => {
    updateUserStatus({
      variables: { userId, banReason: banReasonValue, isBanned: true, details: banDetails },
    })
      .then(() => {
        console.log('User banned successfully')
        setPostStatusBannedDeleted(!postStatusBannedDeleted)
      })
      .catch(error => {
        console.error('Error banning user:', error)
      })
    setIsBanUserOpen(false)
    setIsOpen(false)
  }

  const onOptionClick = (text: string, value: BanReasonInputType) => {
    setBanReasonName(text)
    setBanReasonValue(value)
    setIsOpen(false)
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

        <div className={'mt-1'}>
          <ImageSelector isOpen={isOpen} setIsOpen={onDropdownClick} chosenText={banReasonName}>
            {reasons.map(({ text, value }) => {
              return (
                <ImageOption
                  key={text}
                  text={text}
                  onOptionClick={() => onOptionClick(text, value)}
                />
              )
            })}
          </ImageSelector>
          <div className={'mt-4'}>
            {banReasonName === ANOTHER_REASON && (
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
