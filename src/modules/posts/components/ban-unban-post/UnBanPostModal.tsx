import React, { useContext } from 'react'

import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import { Confirm } from '@/components/modals'
import { AuthContext } from '@/store/store'
import { BAN_UN_BAN_POST, UnBanPostModalType } from 'modules/posts'

export const UnBanPostUserModal = ({
  isUnbanUserOpen,
  userName,
  setIsUnbanUserOpen,
  postId,
}: UnBanPostModalType) => {
  const { t } = useTranslation()
  const [updateUserStatus] = useMutation(BAN_UN_BAN_POST)
  const { postStatusBannedDeleted, setPostStatusBannedDeleted } = useContext(AuthContext)
  const onConfirm = () => {
    updateUserStatus({ variables: { postId, isBanned: false } })
      .then(() => {
        console.log('Post unbanned successfully')
        setPostStatusBannedDeleted(!postStatusBannedDeleted)
      })
      .catch(error => {
        console.error('Error unbanning post:', error)
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
      confirmButtonText={t('postsList.unban.confirm')}
      declineButtonText={t('postsList.unban.cancel')}
      title={t('postsList.unban.title')}
      text={t('postsList.unban.description') + ' ' + userName + '?'}
    />
  )
}
