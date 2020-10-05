import React, { CSSProperties, FunctionComponent, useEffect, useRef, useState } from 'react'

import Close from '../Icons/Close'
import Fade from '../Fade'
import Portal from '../Portal'
import Typography from '../Typography'
import clsx from 'clsx'
import isClient from '../utils/isClient'
import styles from './modal.module.scss'
import trapFocus from '../utils/trapFocus'

interface HeaderProps {
  title: string
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle'
    | 'paragraph'
    | 'paragraph-sm'
    | 'paragraph-lg'
    | 'price-lg'
    | 'price'
    | 'price-sale'
    | 'eyebrow'
    | 'byline'
  align?: 'left' | 'center' | 'right'
}

interface Props {
  header?: HeaderProps
  subheader?: HeaderProps
  /** style to indicate modal border setting */
  borderStyle?: 'round' | 'square'
  /** styles to pass to modal center wrapper */
  contentStyles?: CSSProperties
  isOpen?: boolean
  onClose?: Function | null
  duration?: number
  children?: React.ReactNode
  [rest: string]: unknown // ...rest property
}

const Modal: FunctionComponent<Props> = ({
  header = {
    title: '',
    variant: 'h1',
    align: 'left'
  },
  subheader = {
    title: '',
    variant: 'h2',
    align: 'left'
  },
  borderStyle = 'square',
  contentStyles = {},
  isOpen = false,
  onClose = null,
  duration = 100,
  children = null,
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

  const headerProps = {
    variant: header.variant || 'h1',
    align: header.align || 'left',
    className: styles['modal-header']
  }

  const subheaderProps = {
    variant: subheader.variant || 'h2',
    align: subheader.align || 'left',
    className: styles['modal-subheader']
  }

  const customModalClasses = rest.className ? rest.className + '' : ''
  const modalClasses = clsx(styles['modal'], isShowing && styles['active'], styles[borderStyle], customModalClasses)
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
                <span className={styles['close-icon-wrapper']} aria-hidden="true">
                  <Close width="10" height="10" stroke="#2D2926" strokeWidth="2" />
                </span>
              </div>
            </>
            <div className={styles['modal-content']} style={contentStyles}>
              {header && header.title !== '' && <Typography {...headerProps}>{header.title}</Typography>}
              {subheader && subheader.title !== '' && <Typography {...subheaderProps}>{subheader.title}</Typography>}
              {children}
            </div>
          </div>
        </Fade>
      </div>
    </Portal>
  )
}

export default Modal
