import React from 'react'

import { useTranslation } from 'react-i18next'

import { Confirm } from '@/components/modals'

type PropsType = {
  isDeleteUserOpen: boolean
  setIsDeleteUserOpen: (isDeleteUserOpen: boolean) => void
  userName: string
  userId: number
}
export const DeleteModal = ({
  isDeleteUserOpen,
  setIsDeleteUserOpen,
  userName,
  userId,
}: PropsType) => {
  const { t } = useTranslation()

  const onConfirm = () => {
    console.log('delete onConfirm', userId)
    setIsDeleteUserOpen(false)
  }

  const onDecline = () => {
    setIsDeleteUserOpen(false)
  }

  return (
    <Confirm
      isOpen={isDeleteUserOpen}
      onConfirm={onConfirm}
      onClose={onDecline}
      onDecline={onDecline}
      confirmButtonText={t('userList.delete.confirm')}
      declineButtonText={t('userList.delete.cancel')}
      title={t('userList.delete.title')}
      text={t('userList.delete.description') + ' ' + userName + '?'}
    />
  )
}
