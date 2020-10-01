import React, { FunctionComponent, ReactNode, useRef, useEffect } from 'react'
import clsx from 'clsx'
import Typography from '../Typography'


import styles from './tooltip.module.scss'

export interface Props {
  children: ReactNode
  delay?: number
  dimensions?: ClientRect
  duration?: number
  easing?: string
  isShowing?: boolean
  position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'right' | 'left'
  tipContainerClassName?: string
  header?: string
}

const TipContainer: FunctionComponent<Props> = ({
  children,
  delay,
  dimensions,
  duration,
  easing,
  isShowing,
  position,
  tipContainerClassName, 
  header,
}) => {
  const closeBtnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (closeBtnRef.current !== null) {
      closeBtnRef.current.focus()
    }
  }, [isShowing]) 

  const getBaseStyle = () => {
    const opacity = isShowing ? 1 : 0
    const pointerEvents = isShowing ? 'auto' : 'none'

    if (dimensions && dimensions.top) {
      const { top, bottom, left, right, height, width } = dimensions
      switch (position) {
        case 'top':
          return {
            transition: `all ${duration}ms ${easing} ${delay}ms`,
            opacity,
            pointerEvents,
            top: top + window.scrollY - 168,
            bottom,
            left: left - 10,
            right
          }
        case 'top-left':
          return {
            transition: `all ${duration}ms ${easing} ${delay}ms`,
            opacity,
            pointerEvents,
            top: top + window.scrollY - 168,
            bottom,
            left: left - width - 5,
            right
          }
        case 'top-right':
          return {
            transition: `all ${duration}ms ${easing} ${delay}ms`,
            opacity,
            pointerEvents,
            top: top + window.scrollY - 168,
            bottom,
            left: left + width / 2 - 7,
            right
          }
        case 'bottom':
          return {
            transition: `all ${duration}ms ${easing} ${delay}ms`,
            opacity,
            pointerEvents,
            top: top + window.scrollY + height - 25,
            bottom,
            left: left - 10,
            right
          }
        case 'bottom-left':
          return {
            transition: `all ${duration}ms ${easing} ${delay}ms`,
            opacity,
            pointerEvents,
            top: top + window.scrollY + 15,
            bottom,
            left: left - width + 25,
            right
          }
        case 'bottom-right':
          return {
            transition: `all ${duration}ms ${easing} ${delay}ms`,
            opacity,
            pointerEvents,
            top: top + window.scrollY + 15,
            bottom,
            left: left + width / 2 - 7,
            right
          }
        case 'right':
          return {
            transition: `all ${duration}ms ${easing} ${delay}ms`,
            opacity,
            pointerEvents,
            top: top + window.scrollY - height,
            bottom,
            left: left + width + 15,
            right
          }
        case 'left':
          return {
            transition: `all ${duration}ms ${easing} ${delay}ms`,
            opacity,
            pointerEvents,
            top: top + window.scrollY - height,
            bottom,
            left: left - width * 2 - 60,
            right
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

  const getAnimationStyle = () => {
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
    if (dimensions && dimensions.top) {
      const { top, left, height, width } = dimensions
      switch (tipPosition) {
        case 'top':
          return {
            enter: {
              transform: 'translate3d(-50%, 0, 0)',
              bottom: '100%',
              left: left + width / 2
            },
            active: {
              transform: 'translate3d(-50%, -3px, 0)'
            }
          }

        case 'top-left':
          return {
            enter: {
              ...getAnimationStyleByPosition('top').enter,
              transform: 'translate3d(calc(-100% + 16px), 0, 0)',
              left: left + width + 10 - width / 2 
            },
            active: {
              transform: 'translate3d(calc(-100% + 16px), -3px, 0)'
            }
          }

        case 'top-right':
          return {
            enter: {
              ...getAnimationStyleByPosition('top').enter,
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
              ...getAnimationStyleByPosition('bottom').enter,
              transform: 'translate3d(calc(-100% + 16px), 0, 0)',
              top: top + window.scrollY + 5,
              left: left + 22 + width - width / 2
            },
            active: {
              transform: 'translate3d(calc(-100% + 16px), 10px, 0)'
            }
          }

        case 'bottom-right':
          return {
            enter: {
              ...getAnimationStyleByPosition('bottom').enter,
              transform: 'translate3d(calc(0% + -16px), 0, 0)',
              top: top + window.scrollY + 5,
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
              marginRight: 10,
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
              marginLeft: 10
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

  const getGap = () => {
    switch (position) {
      case 'top':
      case 'top-left':
      case 'top-right':
        return { bottom: '20px' }

      case 'bottom':
      case 'bottom-left':
      case 'bottom-right':
        return { top: '-20px' }

      case 'left':
        return { right: '-20px' }

      case 'right':
        return { left: '-20px' }

      default:
        return {}
    }
  }

  return (
    <div
      role="tooltip"
      className={clsx(styles['tip-container'], tipContainerClassName)}
      style={{
        ...getBaseStyle(),
        ...getAnimationStyle()
      }}
    >
      <div className={styles.gap} style={getGap()} />
      <div className={styles['header-wrapper']}>
        <Typography className={styles['header']} variant="h6"> {header} </Typography>
        <div
            role="button"
            tabIndex={0}
            className={clsx(styles.close)}
            aria-label="Close Alert"
            ref={closeBtnRef}
            // onClick={hideTooltip}
          >
            <span aria-hidden="true" className={styles['close-icon']}>
              &times;
            </span>
          </div>
      </div>
    
      <Typography className={styles['tooltip-content']} variant="paragraph-sm">{children}</Typography>
    </div>
  )
}

export default TipContainer
