import React, { useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useTranslation } from 'react-i18next'
import { FaEllipsis, FaBan } from 'react-icons/fa6'

import { BanUserPostModal, PostsItemsType, UnBanPostUserModal } from '@/modules/posts'

type TableActionsDropDownType = {
  post: Pick<PostsItemsType, 'userName' | 'status' | 'postId' | 'postStatus'>
}

export const PostsActionsDropDown = ({
  post: { userName, postStatus, postId },
}: TableActionsDropDownType) => {
  const { t } = useTranslation()
  const [isUnbanUserOpen, setIsUnBanPostOpen] = useState(false)
  const [isBanUserOpen, setIsBanPostOpen] = useState(false)
  const onBanClick = () => {
    setIsBanPostOpen(true)
  }

  const onUnbanClick = () => {
    setIsUnBanPostOpen(true)
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
            {postStatus === 'PUBLISHED' && (
              <DropdownMenu.Item
                className="flex items-center mb-3 cursor-pointer"
                onSelect={() => onBanClick()}
              >
                <FaBan size={24} className="mr-3" />
                {t('userList.banUser')}
              </DropdownMenu.Item>
            )}

            {postStatus === 'BANNED' && (
              <DropdownMenu.Item
                className="flex items-center mb-3 cursor-pointer"
                onSelect={() => onUnbanClick()}
              >
                <FaBan size={24} className="mr-3" />
                {t('userList.unbanUser')}
              </DropdownMenu.Item>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <BanUserPostModal
        isBanUserOpen={isBanUserOpen}
        setIsBanUserOpen={setIsBanPostOpen}
        postId={postId}
        userName={userName}
      />
      <UnBanPostUserModal
        isUnbanUserOpen={isUnbanUserOpen}
        setIsUnbanUserOpen={setIsUnBanPostOpen}
        userName={userName}
        postId={postId}
      />
    </>
  )
}
