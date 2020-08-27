import React, { useState, useEffect, useCallback, useRef, FunctionComponent } from 'react'
import clsx from 'clsx'
import styles from './modal.module.scss'
import Portal from '../Portal'
import isClient from '../utils/isClient'
import trapFocus from '../utils/trapFocus'
import Fade from '../Fade'

interface Props {
  header?: string
  isOpen?: boolean
  onClose?: Function | null
  duration?: number
  children?: React.ReactNode
  [rest: string]: unknown // ...rest property
}

const Modal: FunctionComponent<Props> = ({
  header = '',
  isOpen = false,
  onClose = null,
  duration = 100,
  children = null,
  ...rest
}) => {
  const [isSafari] = useState(() => (isClient ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false))
  const [isShowing, setIsShowing] = useState(isOpen)

  const modalRef: any = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
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
  }, [isOpen, isShowing])

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

  return (
    <Portal>
      <div className={clsx(styles['modal-wrapper'], isShowing && styles['active'])}>
        <Fade duration={duration} in={isOpen}>
          <div className={styles['modal-overlay']} onClick={hideModal} onKeyDown={handleKeys} />
            <div
              className={clsx(styles['modal'], isShowing && styles['active'])}
              role="dialog"
              aria-modal="true"
              onKeyDown={handleKeys}
              ref={modalRef}
              {...rest}
            >
              <div>
                <button
                  type="button"
                  onClick={hideModal}
                  className={styles.close}
                  aria-label="Close Modal"
                  ref={closeBtnRef}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-content">
                <h1>{header}</h1>
                {children}
              </div>
            </div>
        </Fade>
      </div>
    </Portal>
  )
}

export default Modal
