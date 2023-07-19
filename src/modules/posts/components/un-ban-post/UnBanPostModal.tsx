import React, { useContext } from 'react'

import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import { Confirm } from '@/components/modals'
import { BAN_UN_BAN_POST } from '@/modules/posts'
import { AuthContext } from '@/store/store'

type PropsType = {
  isUnbanUserOpen: boolean
  setIsUnbanUserOpen: (isUnbanUserOpen: boolean) => void
  userName: string
  postId: number
}
export const UnBanPostUserModal = ({
  isUnbanUserOpen,
  userName,
  setIsUnbanUserOpen,
  postId,
}: PropsType) => {
  const { t } = useTranslation()
  const [updateUserStatus] = useMutation(BAN_UN_BAN_POST)
  const { postStatusBannedDeleted, setPostStatusBannedDeleted } = useContext(AuthContext)
  const onConfirm = () => {
    updateUserStatus({ variables: { postId, isBanned: false } })
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
