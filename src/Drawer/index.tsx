/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react'
import Transition from 'react-transition-group/Transition'
import clsx from 'clsx'
import Fade from '../Fade'
import isClient from '../utils/isClient'
import trapFocus from '../utils/trapFocus'
import styles from './drawer.module.scss'
import Portal from '../Portal'

export interface Props {
  /** Show a backdrop */
  backdrop?: boolean
  backdropClassName?: string
  /** Duration of backdrop fade */
  backdropDuration?: number
  bodyClassName?: string
  children?: React.ReactNode
  className?: string
  /** Include the (x) icon to close */
  close?: boolean
  duration?: number
  headerClassName?: string
  isOpen?: boolean
  onClose?: Function | null
  position?: 'top' | 'bottom' | 'right' | 'left'
  [rest: string]: unknown
}

const defaultStyles = {
  entered: { transform: `translate3d(0, 0, 0)` },
  exiting: { transform: `translate3d(0, 0, 0)` },
  unmounted: {}
}
const positions = {
  left: {
    entering: { transform: `translate3d(-50%, 0, 0)` },
    exited: { transform: `translate3d(-50%, 0, 0)` },
    ...defaultStyles
  },
  right: {
    entering: { transform: `translate3d(100%, 0, 0)` },
    exited: { transform: `translate3d(100%, 0, 0)` },
    ...defaultStyles
  },
  top: {
    entering: { transform: `translate3d(0, -50%, 0)` },
    exited: { transform: `translate3d(0, -50%, 0)` },
    ...defaultStyles
  },
  bottom: {
    entering: { transform: `translate3d(0, 100%, 0)` },
    exited: { transform: `translate3d(0, 100%, 0)` },
    ...defaultStyles
  }
}

let timeout: ReturnType<typeof setTimeout>

const Drawer: React.FunctionComponent<Props> = ({
  backdrop = true,
  backdropClassName = '',
  backdropDuration = 50,
  bodyClassName = '',
  children = null,
  className = '',
  close = true,
  duration = 100,
  position = 'right',
  onClose = null,
  isOpen = false,
  headerClassName = '',
  ...rest
}) => {
  const [isSafari] = useState(() => (isClient ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false))
  const [isShowing, setIsShowing] = useState(isOpen)

  const drawerClassName = clsx(styles['drawer-wrapper'], styles[position], className)
  const closeBtnRef = useRef<HTMLDivElement>(null)
  const modalRef: any = useRef<HTMLDivElement>(null)
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
  }, [isOpen, isSafari])

  useEffect(() => () => clearTimeout(timeout), [])

  if (!isOpen) {
    return null
  }

  const hideDrawer = () => {
    if (onClose) {
      timeout = setTimeout(() => {
        onClose()
      }, 250)
    }

    setIsShowing(false)
  }

  const handleKeys = (e: any) => {
    const key = e.keyCode || e.which

    switch (key) {
      // Escape
      case 27: {
        hideDrawer()
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
      <>
        <Transition in={isShowing} timeout={duration} {...rest}>
          {(state) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <div
              className={drawerClassName}
              style={positions[position][state]}
              role="dialog"
              aria-modal="true"
              ref={modalRef}
              onKeyDown={handleKeys}
            >
              <div className={clsx(styles['drawer-header'], headerClassName)}>
                {(close || onClose) && (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={hideDrawer}
                    className={styles.close}
                    aria-label="Close Drawer"
                    ref={closeBtnRef}
                  >
                    <span aria-hidden="true">&times;</span>
                  </div>
                )}
              </div>
              <div className={clsx(styles['drawer-body'], bodyClassName)}>{children}</div>
            </div>
          )}
        </Transition>
        {backdrop && (
          <Fade
            className={clsx(styles['drawer-backdrop'], isOpen && styles.backdrop, backdropClassName)}
            onClick={hideDrawer}
            onKeyDown={handleKeys}
            duration={backdropDuration}
            in={isOpen && !!backdrop}
            opacity={0.5}
            data-testid="backdrop"
          />
        )}
      </>
    </Portal>
  )
}

export default Drawer
