import React, { useState, useEffect, ReactNode } from 'react'
import clsx from 'clsx'
import Collapse from '../Collapse'
import Fade from '../Fade'

import styles from './alert.module.scss'

export interface Props {
  /** Children to be in the Alert body */
  children?: ReactNode
  className?: string
  closeClassName?: string
  /** Include Collapse transition */
  collapse?: boolean
  /** Alert Color type */
  color?: 'error'
  /** Transition duration passed to Fade */
  duration?: number
  /** Include Fade transition */
  fade?: boolean
  /** Controls if the Alert is displayed or not */
  isOpen?: boolean
  onClose?: Function
  [rest: string]: unknown
}

const Alert: React.FunctionComponent<Props> = ({
  children = null,
  className = '',
  closeClassName = '',
  color = 'error',
  isOpen = true,
  onClose = null,
  fade = true,
  collapse = true,
  duration = 300,
  ...rest
}) => {
  const [isShowing, setIsShowing] = useState(isOpen)
  const [isShowingFade, setIsShowingFade] = useState(true)

  const showAlert = () => {
    if (fade) {
      setIsShowingFade(true)
    }
    setIsShowing(true)
  }

  useEffect(() => {
    if (isOpen && !isShowing) {
      showAlert()
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen) {
    return null
  }

  const renderAlert = () => (
    <div {...rest} className={clsx(styles.alert, styles[`alert-${color}`], className)} role="alert">
      <div className={styles.alertInside}>
        {onClose && (
          <div
            role="button"
            tabIndex={0}
            className={clsx(styles.close, closeClassName)}
            aria-label="Close Alert"
            onClick={() => {
              if (fade) {
                setIsShowingFade(false)
              }

              setIsShowing(false)
              if (onClose) {
                setTimeout(() => {
                  onClose()
                }, duration)
              }
            }}
          >
            <span aria-hidden="true" className={styles['close-icon']}>
              &times;
            </span>
          </div>
        )}
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  )

  if (collapse && fade) {
    return (
      <Collapse isOpen={isShowing}>
        <Fade in={isShowingFade} duration={duration} onExited={() => setIsShowing(false)}>
          {renderAlert()}
        </Fade>
      </Collapse>
    )
  }

  if (collapse) {
    return <Collapse isOpen={isShowing}>{renderAlert()}</Collapse>
  }

  if (fade) {
    return (
      <Fade in={isShowingFade} duration={duration} onExited={() => setIsShowing(false)}>
        {renderAlert()}
      </Fade>
    )
  }

  return renderAlert()
}

export default Alert
