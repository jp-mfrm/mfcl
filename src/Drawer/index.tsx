/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react'
import Transition from 'react-transition-group/Transition'
import clsx from 'clsx'
import Fade from '../Fade'
import trapFocus from '../utils/trapFocus'
import styles from './drawer.module.scss'
import Portal from '../Portal'
import Close from '../Icons/Close'
import useOpenModal from '../utils/useOpenModal'

export interface Props {
  /** Show a backdrop */
  backdrop?: boolean
  /** Override styles on backdrop */
  backdropClassName?: string
  /** Duration of backdrop fade */
  backdropDuration?: number
  /** Override styles on the body of the drawer */
  bodyClassName?: string
  children?: React.ReactNode
  /** Override styles on wrapper */
  className?: string
  /** Include the (x) icon to close */
  close?: boolean
  /** duration of the transition animation */
  duration?: number
  /** Override styles on the header */
  headerClassName?: string
  /** Controls whether the drawer is open or not */
  isOpen?: boolean
  /** Callback when the drawer is closed */
  onClose?: Function | null
  /** The position on the screen the drawer will open */
  position?: 'top' | 'bottom' | 'right' | 'left'
  /** Color of close button svg  */
  closeButtonColor?: string
  /** Class to pass to the modal close button  */
  closeButtonClass?: string
  /** id for drawer*/
  id?: string
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
  closeButtonColor = '#2D2926',
  closeButtonClass = '',
  id = '',
  ...rest
}) => {
  const [isShowing, setIsShowing] = useState(isOpen)

  const closeBtnRef = useRef<HTMLDivElement>(null)
  const modalRef: any = useRef<HTMLDivElement>(null)
  const portalRef = useRef<HTMLDivElement>(null)

  useOpenModal({ isOpen, setIsShowing, closeBtnRef })
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

  const drawerClassName = clsx(styles['drawer-wrapper'], styles[position], className)

  return (
    <Portal ref={portalRef}>
      <>
        <Transition in={isShowing} timeout={duration} id={id} {...rest}>
          {(state) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <div
              className={drawerClassName}
              style={positions[position][state]}
              role="dialog"
              aria-label={`${id} drawer`}
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
                    id={`close-drawer-${id}`}
                  >
                    <span className={clsx(styles['close-icon-wrapper'], closeButtonClass)} aria-hidden="true">
                      <Close width="10" height="10" stroke={closeButtonColor} strokeWidth="2" />
                    </span>
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
