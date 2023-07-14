import React from 'react'

import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import { Confirm } from '@/components/modals'
import { DELETE_USER } from '@/queries/delete-ban'

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
  const [deleteUser] = useMutation(DELETE_USER)

  const onConfirm = () => {
    deleteUser({ variables: { userId } })
      .then(() => {
        console.log('User deleted successfully')
      })
      .catch(error => {
        console.error('Error deleting user:', error)
      })
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
