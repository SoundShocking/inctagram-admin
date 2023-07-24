import React, { useState } from 'react'

import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import { ModalWithContent } from '@/components/modals'
import { DetailsInput, ImageOption, ImageSelector } from '@/ui'
import {
  BAN_UN_BAN_POST,
  BanPostModalType,
  BanReasonForPostInputType,
  GET_POSTS_LIST,
  ReasonType,
} from 'modules/posts'

export const BanUserPostModal = ({
  isBanUserOpen,
  setIsBanUserOpen,
  postId,
  userName,
}: BanPostModalType) => {
  const { t } = useTranslation()
  const SEXUAL_CONTENT = t('postsList.ban.reason.SEXUAL_CONTENT')
  const VIOLENCE_AND_CRUELTY = t('postsList.ban.reason.VIOLENCE_AND_CRUELTY')
  const DISCRIMINATION_AND_HATE = t('postsList.ban.reason.DISCRIMINATION_AND_HATE')
  const SPAM_AND_SCAMS = t('postsList.ban.reason.SPAM_AND_SCAMS')
  const COPYRIGHT_INFRINGEMENT = t('postsList.ban.reason.COPYRIGHT_INFRINGEMENT')
  const INAPPROPRIATE_BEHAVIOR = t('postsList.ban.reason.INAPPROPRIATE_BEHAVIOR')
  const PRIVACY_VIOLATION = t('postsList.ban.reason.PRIVACY_VIOLATION')
  const ILLEGAL_ACTIVITIES = t('postsList.ban.reason.ILLEGAL_ACTIVITIES')
  const SHOCKING_OR_DISTURBING_CONTENT = t('postsList.ban.reason.SHOCKING_OR_DISTURBING_CONTENT')
  const CONTROVERSIAL_TOPICS = t('postsList.ban.reason.CONTROVERSIAL_TOPICS')
  const defaultReason = CONTROVERSIAL_TOPICS
  const banReasons: ReasonType[] = [
    { text: SEXUAL_CONTENT, value: 'SEXUAL_CONTENT' },
    { text: VIOLENCE_AND_CRUELTY, value: 'VIOLENCE_AND_CRUELTY' },
    { text: DISCRIMINATION_AND_HATE, value: 'DISCRIMINATION_AND_HATE' },
    { text: SPAM_AND_SCAMS, value: 'SPAM_AND_SCAMS' },
    { text: COPYRIGHT_INFRINGEMENT, value: 'COPYRIGHT_INFRINGEMENT' },
    { text: INAPPROPRIATE_BEHAVIOR, value: 'PRIVACY_VIOLATION' },
    { text: PRIVACY_VIOLATION, value: 'ILLEGAL_ACTIVITIES' },
    { text: ILLEGAL_ACTIVITIES, value: 'SHOCKING_OR_DISTURBING_CONTENT' },
    { text: SHOCKING_OR_DISTURBING_CONTENT, value: 'CONTROVERSIAL_TOPICS' },
    { text: CONTROVERSIAL_TOPICS, value: 'CONTROVERSIAL_TOPICS' },
  ]
  const [updateUserStatus] = useMutation(BAN_UN_BAN_POST)

  const [isOpen, setIsOpen] = useState(false)
  const [banReasonName, setBanReasonName] = useState(defaultReason)
  const [banReasonValue, setBanReasonValue] =
    useState<BanReasonForPostInputType>('CONTROVERSIAL_TOPICS')
  const [banDetails, setBanDetails] = useState<string>('')
  const [error, setError] = useState<string>('')

  const onDropdownClick = () => {
    setIsOpen(!isOpen)
  }

  const onDecline = () => {
    setIsBanUserOpen(false)
    setIsOpen(false)
  }

  const onConfirm = () => {
    updateUserStatus({
      variables: {
        postId,
        banReason: banReasonValue,
        isBanned: true,
        details: banDetails,
      },
      refetchQueries: [GET_POSTS_LIST],
    })
      .then(() => {
        console.log('Post banned successfully')
      })
      .catch(error => {
        console.error('Error banning post:', error)
      })
    setIsBanUserOpen(false)
    setIsOpen(false)
  }

  const onOptionClick = (text: string, value: BanReasonForPostInputType) => {
    setBanReasonName(text)
    setBanReasonValue(value)
    setIsOpen(false)
  }

  return (
    <ModalWithContent
      isOpen={isBanUserOpen}
      onClose={onDecline}
      title={t('postsList.ban.title')}
      confirmButtonText={t('postsList.ban.confirm')}
      declineButtonText={t('postsList.ban.cancel')}
      onConfirm={onConfirm}
      onDecline={onDecline}
      disabled={error.length > 0}
    >
      <div>
        <h3>{t('postsList.ban.description') + ' ' + userName + '?'}</h3>

        <div className={'mt-3'}>{`${t('postsList.ban.reason.title')}:`}</div>

        <div className={'mt-1'}>
          <ImageSelector isOpen={isOpen} setIsOpen={onDropdownClick} chosenText={banReasonName}>
            {banReasons.map(({ text, value }) => {
              return (
                <ImageOption
                  key={text}
                  text={text}
                  onOptionClick={() => onOptionClick(text, value)}
                />
              )
            })}
          </ImageSelector>
          <div className={'mt-4 -z-10 relative'}>
            <DetailsInput
              banDetails={banDetails}
              setBanDetails={setBanDetails}
              setError={setError}
              error={error}
            />
          </div>
        </div>
      </div>
    </ModalWithContent>
  )
}
