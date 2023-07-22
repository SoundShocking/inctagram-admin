import React, { useContext } from 'react'

import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import { Confirm } from '@/components/modals'
import { GET_POSTS_LIST } from '@/modules/posts'
import { UPDATE_USER_STATUS } from '@/queries/delete-ban'
import { GetAllUsersDocument } from '@/queries/users.generated'

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
  const onConfirm = () => {
    updateUserStatus({
      variables: { userId, isBanned: false },
      refetchQueries: [GET_POSTS_LIST, GetAllUsersDocument],
    })
      .then(() => {
        console.log('User unbanned successfully')
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
