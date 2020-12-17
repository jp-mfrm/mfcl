import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import Close from '../Icons/Close'
import Fade from '../Fade'
import Portal from '../Portal'
import Typography from '../Typography'
import clsx from 'clsx'
import isClient from '../utils/isClient'
import styles from './modal.module.scss'
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
  ...rest
}) => {
  const [isSafari] = useState(() => (isClient ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false))
  const [isShowing, setIsShowing] = useState(isOpen)

  const modalRef: any = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLDivElement>(null)
  const firstUpdate = useRef(true)

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    if (isOpen) {
      setIsShowing(true)
      document.body.style.overflow = 'hidden'

      // safari doesn't respect overflows on body/html. You need to set the position to fixed
      if (isSafari) {
        document.body.style.top = `${-window.pageYOffset}px`
        document.body.style.position = 'fixed'
      }

      if (closeBtnRef.current !== null) {
        closeBtnRef.current.focus()
      }
    } else {
      setIsShowing(false)
      document.body.style.overflow = ''

      // with a fixed position, the scroll goes to the top.
      // After setting the top, we grab that value and scroll to it to restore scroll position
      if (isSafari) {
        const offsetY = Math.abs(parseInt(document.body.style.top || '0', 10))
        document.body.style.position = ''
        document.body.style.top = ''
        window.scrollTo(0, offsetY || 0)
      }
    }
  }, [isOpen])

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
          <div role="dialog" aria-modal="true" onKeyDown={handleKeys} ref={modalRef} {...rest} className={modalClasses}>
            <>
              <div
                role="button"
                tabIndex={0}
                onClick={hideModal}
                className={styles.close}
                aria-label="Close Modal"
                ref={closeBtnRef}
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
