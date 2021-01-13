import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import Close from '../Icons/Close'
import Fade from '../Fade'
import Portal from '../Portal'
import Typography from '../Typography'
import clsx from 'clsx'
import styles from './modal.module.scss'
import useOpenModal from '../utils/useOpenModal'
import trapFocus from '../utils/trapFocus'

interface Props {
  /** Header title for the modal  */
  header?: string
  /** Subheader title for the modal */
  subheader?: string
  /** Class to pass to the modal center wrapper */
  contentClass?: string
  /** Whether or not the modal is open */
  isOpen?: boolean
  /** Callback function after the modal is hidden */
  onClose?: Function | null
  /** Transition speed when the modal appears */
  duration?: number
  /** Color of close button svg  */
  closeButtonColor?: string
  /** Class to pass to the modal close button  */
  closeButtonClass?: string
  /** Child elements of the modal  */
  children?: React.ReactNode
  /** id for modal */
  id?: string
  [rest: string]: unknown // ...rest property
}

const Modal: FunctionComponent<Props> = ({
  header = '',
  subheader = '',
  contentClass = '',
  isOpen = false,
  onClose = null,
  duration = 100,
  children = null,
  closeButtonColor = '#2D2926',
  closeButtonClass = '',
  id = '',
  ...rest
}) => {
  const [isShowing, setIsShowing] = useState(isOpen)

  const modalRef: any = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLDivElement>(null)

  useOpenModal({ isOpen, setIsShowing, closeBtnRef })

  const hideModal = () => {
    if (onClose) {
      onClose()
    }
    setIsShowing(!isOpen)
  }

  const handleKeys = (e: any) => {
    const key = e.keyCode || e.which

    switch (key) {
      // Escape
      case 27: {
        hideModal()
        break
      }
      // tab
      case 9: {
        trapFocus(e, modalRef)
        break
      }
      default:
        break
    }
  }

  const modalClasses = clsx(styles['modal'], isShowing && styles['active'], rest.className as string)
  const modalContentClasses = clsx(styles['modal-content'], contentClass)
  const modalWrapperClasses = clsx(styles['modal-wrapper'], isShowing && styles['active'])

  return (
    <Portal>
      <div className={modalWrapperClasses}>
        <Fade duration={duration} in={isOpen}>
          <div className={styles['modal-overlay']} onClick={hideModal} onKeyDown={handleKeys} />
          <div
            role="dialog"
            aria-modal="true"
            onKeyDown={handleKeys}
            ref={modalRef}
            id={id}
            {...rest}
            className={modalClasses}
          >
            <>
              <div
                role="button"
                tabIndex={0}
                onClick={hideModal}
                className={styles.close}
                aria-label="Close Modal"
                ref={closeBtnRef}
                id={`close-modal-${id}`}
              >
                <span className={clsx(styles['close-icon-wrapper'], closeButtonClass)} aria-hidden="true">
                  <Close width="10px" height="10px" stroke={closeButtonColor} strokeWidth="2" />
                </span>
              </div>
            </>
            <div className={modalContentClasses}>
              {header && header !== '' && (
                <Typography className={clsx(styles['modal-header'])} variant="h4" align="center">
                  {header}
                </Typography>
              )}
              {subheader && subheader !== '' && (
                <Typography className={clsx(styles['modal-subheader'])} variant="paragraph" align="center">
                  {subheader}
                </Typography>
              )}
              {children}
            </div>
          </div>
        </Fade>
      </div>
    </Portal>
  )
}

export default Modal
