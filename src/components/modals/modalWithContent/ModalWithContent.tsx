import { FC } from 'react'

import { FaTimes } from 'react-icons/fa'
// @ts-ignore
import Modal from 'react-modal'

import styles from './ModalWithContent.module.scss'

interface Props {
  isOpen: boolean
  onConfirm?: () => void
  onDecline?: () => void
  onClose: () => void
  title: string
  children: any
  confirmButtonText?: string
  declineButtonText?: string
}

export const ModalWithContent: FC<Props> = ({
  isOpen,
  onConfirm,
  onDecline,
  onClose,
  title,
  children,
  confirmButtonText,
  declineButtonText,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      overlayClassName={styles.modalOverlay}
      className={styles.modal}
    >
      <div className={styles.modalHeader}>
        <div className={styles.modalTitle}>{title}</div>

        <button className={styles.modalClose} onClick={() => onClose()}>
          <FaTimes />
        </button>
      </div>

      <div className={styles.modalBody}>{children}</div>

      <div className={styles.modalFooter}>
        {onConfirm ? (
          <button
            className={
              'py-[6px] px-[34px] w-mim-[96px] h-[36px] flex justify-center align-middle border-[1px] bg-dark-300 border-accent-500 text-accent-500 leading-6 font-normal text-[16px] active:text-light-100 active:bg-accent-500'
            }
            onClick={() => onConfirm()}
          >
            {confirmButtonText ?? 'Yes'}
          </button>
        ) : (
          ''
        )}
        {onDecline ? (
          <button
            className={
              'py-[6px] px-[34px] w-mim-[96px] h-[36px] flex justify-center align-middle border-[1px] bg-dark-300 border-accent-500 text-accent-500 leading-6 font-normal text-[16px] active:text-light-100 active:bg-accent-500'
            }
            onClick={() => onDecline()}
          >
            {declineButtonText ?? 'No'}
          </button>
        ) : (
          ''
        )}
      </div>
    </Modal>
  )
}
