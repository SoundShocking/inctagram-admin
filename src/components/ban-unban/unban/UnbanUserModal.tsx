import React, { useContext } from 'react'

import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import { Confirm } from '@/components/modals'
import { UPDATE_USER_STATUS } from '@/queries/delete-ban'
import { AuthContext } from '@/store/store'

type PropsType = {
  isUnbanUserOpen: boolean
  setIsUnbanUserOpen: (isUnbanUserOpen: boolean) => void
  userName: string
  userId: number
}
export const UnbanUserModal = ({
  isUnbanUserOpen,
  userName,
  setIsUnbanUserOpen,
  userId,
}: PropsType) => {
  const { t } = useTranslation()
  const [updateUserStatus] = useMutation(UPDATE_USER_STATUS)
  const { postStatusBannedDeleted, setPostStatusBannedDeleted } = useContext(AuthContext)
  const onConfirm = () => {
    updateUserStatus({ variables: { userId, isBanned: false } })
      .then(() => {
        console.log('User unbanned successfully')
        setPostStatusBannedDeleted(!postStatusBannedDeleted)
      })
      .catch(error => {
        console.error('Error unbanning user:', error)
      })
    setIsUnbanUserOpen(false)
  }

  const onDecline = () => {
    setIsUnbanUserOpen(false)
  }

  return (
    <Confirm
      isOpen={isUnbanUserOpen}
      onConfirm={onConfirm}
      onClose={onDecline}
      onDecline={onDecline}
      confirmButtonText={t('userList.unban.confirm')}
      declineButtonText={t('userList.unban.cancel')}
      title={t('userList.unban.title')}
      text={t('userList.unban.description') + ' ' + userName + '?'}
    />
  )
}
