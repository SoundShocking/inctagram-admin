import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { ModalWithContent } from '@/components/modals'
import { ImageOption } from '@/ui/image-selector/image-option/ImageOption'
import { ImageSelector } from '@/ui/image-selector/ImageSelector'

type PropsType = {
  isBanUserOpen: boolean
  setIsBanUserOpen: (isBanUserOpen: boolean) => void
  defaultText: string
  userId: number
  userName: string
}
export const BanUserModal = ({
  isBanUserOpen,
  setIsBanUserOpen,
  defaultText,
  userId,
  userName,
}: PropsType) => {
  const { t } = useTranslation()

  const reasons = [
    { text: t('userList.ban.reason.anotherReason') },
    { text: t('userList.ban.reason.behavior') },
    { text: t('userList.ban.reason.advertising') },
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [banReason, setBanReason] = useState(defaultText)

  const onDropdownClick = () => {
    setIsOpen(!isOpen)
  }

  const onDecline = () => {
    setIsBanUserOpen(false)
    setIsOpen(false)
  }

  const onConfirm = () => {
    console.log('ban onConfirm', userId)
    setIsBanUserOpen(false)
    setIsOpen(false)
  }

  const onOptionClick = (text: string) => {
    setBanReason(text)
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
    >
      <div>
        <h3>{t('userList.ban.description') + ' ' + userName + '?'}</h3>
        <span>{`${t('userList.ban.reason.title')}:`}</span>
        <div className={'flex justify-end'}>
          <ImageSelector isOpen={isOpen} setIsOpen={onDropdownClick} chosenText={banReason}>
            {reasons.map(({ text }) => {
              return (
                <ImageOption key={text} text={text} onOptionClick={() => onOptionClick(text)} />
              )
            })}
          </ImageSelector>
        </div>
      </div>
    </ModalWithContent>
  )
}
