import React, { FunctionComponent, KeyboardEvent, MutableRefObject, isValidElement, useRef, useState } from 'react'

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
  header?: string | React.ReactNode
  /** Subheader title for the modal */
  subheader?: string | React.ReactNode
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
  /** Class to pass to the children wrapper */
  childrenClass?: string
  /** id for modal */
  id?: string
  /** style to indicate modal border setting */
  borderStyle?: 'round' | 'square'
  /** ref for the modal */
  modalRef?: MutableRefObject<HTMLDivElement | null>
  [rest: string]: unknown // ...rest property
}

const Modal: FunctionComponent<Props> = ({
  header = '',
  subheader = '',
  contentClass = '',
  childrenClass = '',
  isOpen = false,
  onClose = null,
  duration = 100,
  children = null,
  closeButtonColor = '#2D2926',
  closeButtonClass = '',
  id = '',
  borderStyle = 'round',
  modalRef = null,
  ...rest
}) => {
  const [isShowing, setIsShowing] = useState(isOpen)

  const modalRefWrapper = modalRef || useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLDivElement>(null)
  const portalRef = useRef<HTMLDivElement>(null)

  useOpenModal({ isOpen, setIsShowing, closeBtnRef })

  const hideModal = () => {
    if (onClose) {
      onClose()
    }
    setIsShowing(!isOpen)
  }

  const handleKeys = (e: KeyboardEvent<HTMLDivElement>) => {
    const key = e.keyCode || e.which

    switch (key) {
      // Escape
      case 27: {
        hideModal()
        break
      }
      // tab
      case 9: {
        trapFocus(e, modalRefWrapper)
        break
      }
      default:
        break
    }
  }

  const modalClasses = clsx(styles.modal, isShowing && styles.active, styles[borderStyle], rest.className as string)
  const modalContentClasses = clsx(styles['modal-content'], contentClass)
  const modalWrapperClasses = clsx(styles['modal-wrapper'], isShowing && styles.active)
  const modalChildrenClasses = clsx(styles['modal-children-wrapper'], childrenClass)

  return (
    <Portal ref={portalRef}>
      <div className={modalWrapperClasses}>
        <Fade duration={duration} in={isOpen}>
          <div className={styles['modal-overlay']} onClick={hideModal} onKeyDown={handleKeys} />
          <div
            role="dialog"
            aria-modal="true"
            onKeyDown={handleKeys}
            ref={modalRefWrapper}
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
              {(isValidElement(header) && header) ||
                (header && header !== '' && (
                  <Typography className={clsx(styles['modal-header'])} variant="h4" align="center">
                    {header}
                  </Typography>
                ))}
              {(isValidElement(subheader) && subheader) ||
                (subheader && subheader !== '' && (
                  <Typography className={clsx(styles['modal-subheader'])} variant="paragraph" align="center">
                    {subheader}
                  </Typography>
                ))}
              <div className={modalChildrenClasses}>{children}</div>
            </div>
          </div>
        </Fade>
      </div>
    </Portal>
  )
}

export default Modal
