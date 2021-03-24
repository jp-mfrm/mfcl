import React, { FunctionComponent, ReactNode, useRef, useEffect, CSSProperties, RefObject } from 'react'
import clsx from 'clsx'
import Typography from '../Typography'

import styles from './tooltip.module.scss'
import { Position } from '.'

export interface Props {
  borderColor?: string
  children: ReactNode
  closeBtn?: boolean
  delay?: number
  dimensions?: ClientRect
  duration?: number
  easing?: string
  closeToolTip?: () => void
  header?: string
  isShowing?: boolean
  maxWidth?: string
  position?: Position
  tipContainerClassName?: string
  tipContainerRef?: RefObject<HTMLDivElement>
}

const TipContainer: FunctionComponent<Props> = ({
  borderColor,
  children,
  closeBtn,
  delay,
  dimensions,
  duration,
  easing,
  closeToolTip,
  isShowing,
  maxWidth,
  position,
  tipContainerClassName,
  tipContainerRef,
  header
}) => {
  const closeBtnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (closeBtnRef.current !== null) {
      closeBtnRef.current.focus()
    }
  }, [isShowing])

  const getBaseStyle = (): CSSProperties => {
    const opacity = isShowing ? 1 : 0
    const pointerEvents = isShowing ? 'auto' : 'none'
    const baseStyle: CSSProperties = {
      borderColor,
      maxWidth,
      transition: `all ${duration}ms ${easing} ${delay}ms`,
      opacity,
      pointerEvents
    }

    if (dimensions && dimensions.top && tipContainerRef?.current) {
      const { top, left, right, height, width } = dimensions
      switch (position) {
        case 'top': {
          return {
            ...baseStyle,
            top: top + window.scrollY - tipContainerRef.current.offsetHeight - 49,
            left: left - 10,
            right,
            marginTop: '42px',
            paddingBottom: '18px'
          }
        }
        case 'top-left':
          return {
            ...baseStyle,
            top: top + window.scrollY - tipContainerRef.current.offsetHeight - 49,
            left: left - width - 5,
            right,
            marginTop: '42px',
            paddingBottom: '18px'
          }
        case 'top-right':
          return {
            ...baseStyle,
            top: top + window.scrollY - tipContainerRef.current.offsetHeight - 49,
            left: left + width / 2 - 7,
            right,
            marginTop: '42px',
            paddingBottom: '18px'
          }
        case 'bottom': {
          return {
            ...baseStyle,
            top: top + window.scrollY + height - 25,
            left: left - 10,
            right,
            paddingTop: '22px',
            marginTop: '2px'
          }
        }

        case 'bottom-left':
          return {
            ...baseStyle,
            top: top + window.scrollY + height - 25,
            left: left - width + 25,
            right,
            paddingTop: '22px',
            marginTop: '2px'
          }
        case 'bottom-right': {
          return {
            ...baseStyle,
            top: top + window.scrollY + height - 25,
            left: left + width / 2 - 7,
            right,
            paddingTop: '22px',
            marginTop: '2px'
          }
        }

        case 'right':
          return {
            ...baseStyle,
            top: top + window.scrollY - height,
            left: left + width + 15,
            right,
            marginTop: '25px',
            paddingLeft: '27px'
          }
        case 'left':
          return {
            ...baseStyle,
            top: top + window.scrollY - height,
            left: left - width * 2 - 60,
            right,
            marginTop: '25px',
            paddingRight: '27px'
          }

        default:
          return {}
      }
    }
    return {
      transition: `all ${duration}ms ${easing} ${delay}ms`,
      opacity,
      pointerEvents
    }
  }

  const getAnimationStyle = (): CSSProperties => {
    const animationStyle = getAnimationStyleByPosition(position)

    if (isShowing === false) {
      return animationStyle.enter
    }

    return {
      ...animationStyle.enter,
      ...animationStyle.active
    }
  }

  const getAnimationStyleByPosition = (tipPosition?: string): any => {
    if (dimensions && dimensions.top && tipContainerRef?.current) {
      const { top, left, height, width } = dimensions

      switch (tipPosition) {
        case 'top': {
          return {
            enter: {
              top: top + window.scrollY - tipContainerRef.current.offsetHeight - 39,
              transform: 'translate3d(-50%, 0, 0)',
              left: left + width / 2
            },
            active: {
              transform: 'translate3d(-50%, -3px, 0)'
            }
          }
        }
        case 'top-left': {
          return {
            enter: {
              top: top + window.scrollY - tipContainerRef.current.offsetHeight - 39,
              transform: 'translate3d(calc(-100% + 16px), 0, 0)',
              left: left + width + 10 - width / 2
            },
            active: {
              transform: 'translate3d(calc(-100% + 16px), -3px, 0)'
            }
          }
        }
        case 'top-right':
          return {
            enter: {
              top: top + window.scrollY - tipContainerRef.current.offsetHeight - 39,
              transform: 'translate3d(calc(0% + -16px), 0, 0)',
              left: left + width / 2 - 7
            },
            active: {
              transform: 'translate3d(calc(0% + -16px), -3px, 0)'
            }
          }

        case 'bottom':
          return {
            enter: {
              transform: 'translate3d(-50%, 0, 0)',
              top: top + window.scrollY + height - 15,
              left: left + width / 2
            },
            active: {
              transform: 'translate3d(-50%, 10px, 0)'
            }
          }

        case 'bottom-left':
          return {
            enter: {
              transform: 'translate3d(calc(-100% + 16px), 0, 0)',
              top: top + window.scrollY + height - 15,
              left: left + 22 + width - width / 2
            },
            active: {
              transform: 'translate3d(calc(-100% + 16px), 10px, 0)'
            }
          }

        case 'bottom-right':
          return {
            enter: {
              transform: 'translate3d(calc(0% + -16px), 0, 0)',
              top: top + window.scrollY + height - 15,
              left: left - 22 + width - width / 2
            },
            active: {
              transform: 'translate3d(calc(0% + -16px), 10px, 0)'
            }
          }

        case 'left':
          return {
            enter: {
              bottom: 'auto',
              top: top + window.scrollY - height / 2,
              marginLeft: '27px',
              transform: `translate3d(calc(-100% + -${width}), -50%, 0)`,
              left: left - 10 + width - width / 2
            },
            active: {
              transform: `translate3d(calc(-100% + -${width}px + ${width / 2}px - 13px), -50%, 0)`
            }
          }

        case 'right':
          return {
            enter: {
              bottom: 'auto',
              left: left + width + 15,
              top: top + window.scrollY - height / 2,
              transform: 'translate3d(-10px, -50%, 0)',
              marginLeft: '-18px'
            },
            active: {
              transform: 'translate3d(0, -47%, 0)'
            }
          }

        default:
          return { enter: {}, active: {} }
      }
    }
    return { enter: {}, active: {} }
  }

  return (
    <div
      role="tooltip"
      ref={tipContainerRef}
      className={clsx(styles['tip-container-wrapper'])}
      style={{
        ...getBaseStyle(),
        ...getAnimationStyle()
      }}
    >
      <div className={clsx(styles['tip-container'], tipContainerClassName)}>
        {(header || closeBtn) && (
          <div className={styles['header-wrapper']}>
            {header && (
              <Typography className={styles['header']} variant="h6">
                {header}
              </Typography>
            )}
            {closeBtn && (
              <div
                role="button"
                tabIndex={0}
                className={styles.close}
                aria-label="Close Alert"
                ref={closeBtnRef}
                onClick={closeToolTip}
              >
                <span aria-hidden="true" className={styles['close-icon']}>
                  &times;
                </span>
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default TipContainer
