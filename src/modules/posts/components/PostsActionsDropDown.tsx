import React, { useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useTranslation } from 'react-i18next'
import { AiFillUnlock } from 'react-icons/ai'
import { FaEllipsis, FaUserLock } from 'react-icons/fa6'
import { ImEye, ImEyeBlocked } from 'react-icons/im'

import { BanUserModal } from '@/components/ban-unban/ban/BanUserModal'
import { UnbanUserModal } from '@/components/ban-unban/unban/UnbanUserModal'
import { BanUserPostModal, TableActionsDropDownType, UnBanPostUserModal } from 'modules/posts'

export const PostsActionsDropDown = ({
  post: { userName, postStatus, postId, status, userId },
}: TableActionsDropDownType) => {
  const { t } = useTranslation()

  //Ban unBan Post
  const [isUnbanPostOpen, setIsUnBanPostOpen] = useState(false)
  const [isBanPostOpen, setIsBanPostOpen] = useState(false)

  //Ban unBan User
  const [isUnbanUserOpen, setIsUnbanUserOpen] = useState(false)
  const [isBanUserOpen, setIsBanUserOpen] = useState(false)
  const onBanClick = () => {
    setIsBanPostOpen(true)
  }

  const onUnbanClick = () => {
    setIsUnBanPostOpen(true)
  }

  const onBanPostClick = () => {
    setIsBanUserOpen(true)
  }

  const onUnbanPostClick = () => {
    setIsUnbanUserOpen(true)
  }

  return (
    <>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <button className="flex align-center" aria-label="Customise options">
            <FaEllipsis size={24} color="#fff" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side={'bottom'}
            align={'end'}
            className="bg-dark-500 border border-dark-100 p-3 text-sm"
          >
            {status === 'ACTIVE' && (
              <DropdownMenu.Item
                className="flex items-center mb-3 cursor-pointer"
                onSelect={() => onBanPostClick()}
              >
                <FaUserLock size={24} className="mr-3" />
                {t('userList.banUser')}
              </DropdownMenu.Item>
            )}

            {status === 'BANNED' && (
              <DropdownMenu.Item
                className="flex items-center mb-3 cursor-pointer"
                onSelect={() => onUnbanPostClick()}
              >
                <AiFillUnlock size={24} className="mr-3" />
                {t('userList.unbanUser')}
              </DropdownMenu.Item>
            )}

            {postStatus === 'PUBLISHED' && (
              <DropdownMenu.Item
                className="flex items-center mb-3 cursor-pointer"
                onSelect={() => onBanClick()}
              >
                <ImEyeBlocked size={24} className="mr-3" />
                {t('postsList.banPost')}
              </DropdownMenu.Item>
            )}

            {postStatus === 'BANNED' && (
              <DropdownMenu.Item
                className="flex items-center mb-3 cursor-pointer"
                onSelect={() => onUnbanClick()}
              >
                <ImEye size={24} className="mr-3" />
                {t('postsList.unbanPost')}
              </DropdownMenu.Item>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <BanUserPostModal
        isBanUserOpen={isBanPostOpen}
        setIsBanUserOpen={setIsBanPostOpen}
        postId={postId}
        userName={userName}
      />
      <UnBanPostUserModal
        isUnbanUserOpen={isUnbanPostOpen}
        setIsUnbanUserOpen={setIsUnBanPostOpen}
        userName={userName}
        postId={postId}
      />
      <BanUserModal
        isBanUserOpen={isBanUserOpen}
        setIsBanUserOpen={setIsBanUserOpen}
        userId={userId}
        userName={userName}
      />
      <UnbanUserModal
        isUnbanUserOpen={isUnbanUserOpen}
        setIsUnbanUserOpen={setIsUnbanUserOpen}
        userName={userName}
        userId={userId}
      />
    </>
  )
}
