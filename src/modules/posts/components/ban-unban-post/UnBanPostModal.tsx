import React from 'react'

import { useMutation } from '@apollo/client'

import { useTranslation } from '@/components'
import { Confirm } from '@/components/modals'
import { BAN_UN_BAN_POST, GET_POSTS_LIST, UnBanPostModalType } from 'modules/posts'

export const UnBanPostUserModal = ({
  isUnbanUserOpen,
  userName,
  setIsUnbanUserOpen,
  postId,
}: UnBanPostModalType) => {
  const { t } = useTranslation()
  const [updatePostStatus] = useMutation(BAN_UN_BAN_POST)
  const onConfirm = () => {
    updatePostStatus({ variables: { postId, isBanned: false }, refetchQueries: [GET_POSTS_LIST] })
      .then(() => {
        console.log('Post unbanned successfully')
      })
      .catch(error => {
        console.error('Error unbanning post:', error)
      })
    setIsUnbanUserOpen(false)
  }

  const onDecline = () => {
    setIsUnbanUserOpen(false)
  }

  if (!isUnbanUserOpen) return null

  return (
    <Confirm
      isOpen={isUnbanUserOpen}
      onConfirm={onConfirm}
      onClose={onDecline}
      onDecline={onDecline}
      confirmButtonText={t.translation.postsList.unban.confirm}
      declineButtonText={t.translation.postsList.unban.cancel}
      title={t.translation.postsList.unban.title}
      text={t.translation.postsList.unban.description + ' ' + userName + '?'}
    />
  )
}
