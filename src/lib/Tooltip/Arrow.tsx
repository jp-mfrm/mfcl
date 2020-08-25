import React, { FunctionComponent } from 'react'
import clsx from 'clsx'

import styles from './tooltip.module.scss'

export interface Props {
  arrowClassName?: string
  backgroundColor?: string
  delay?: number
  dimensions?: ClientRect
  duration?: number
  easing?: string
  isShowing?: boolean
  offset?: string
  position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'right' | 'left'
}

const Arrow: FunctionComponent<Props> = ({
  arrowClassName,
  backgroundColor,
  delay,
  dimensions,
  duration,
  easing,
  isShowing,
  offset,
  position
}) => {
  const getBaseStyle = () => {
    if (dimensions && dimensions.top) {
      const { top, bottom, left, right } = dimensions
      return {
        transition: `all ${duration}ms ${easing} ${delay}ms`,
        opacity: isShowing ? 1 : 0,
        pointerEvents: isShowing ? 'auto' : 'none',
        top,
        bottom,
        left,
        right
      }
    }
    return {
      transition: `all ${duration}ms ${easing} ${delay}ms`,
      opacity: isShowing ? 1 : 0,
      pointerEvents: isShowing ? 'auto' : 'none'
    }
  }

  const getAnimationStyleByPosition = () => {
    if (dimensions && dimensions.top) {
      const { top, left, height, width } = dimensions
      switch (position) {
        case 'top':
        case 'top-right':
        case 'top-left':
          return {
            enter: {
              transform: 'translate3d(-50%, 0, 0)',
              bottom: '100%',
              left: left + width / 2
            },
            active: {
              transform: 'translate3d(-50%, -2px, 0)'
            }
          }

        case 'bottom':
          return {
            enter: {
              transform: 'translate3d(-50%, -10px, 0)',
              bottom: 'auto',
              left: left + width / 2,
              top: top + window.scrollY + height
            },
            active: {
              transform: 'translate3d(-50%, 1px, 0)'
            }
          }
        case 'bottom-left':
        case 'bottom-right':
          return {
            enter: {
              transform: 'translate3d(-50%, -10px, 0)',
              bottom: 'auto',
              left: left + width / 2,
              top: top + window.scrollY + height
            },
            active: {
              transform: 'translate3d(-50%, 0, 0)'
            }
          }

        case 'left':
          return {
            enter: {
              bottom: 'auto',
              right: '102%',
              left: left - 13,
              top: top + window.scrollY + 12,
              transform: 'translate3d(10px, -50%, 0)'
            },
            active: {
              transform: 'translate3d(0, -50%, 0)'
            }
          }

        case 'right':
          return {
            enter: {
              bottom: 'auto',
              left: left + width + 5,
              top: top + window.scrollY + 12,
              transform: 'translate3d(-10px, -50%, 0)'
            },
            active: {
              transform: 'translate3d(0, -50%, 0)'
            }
          }

        default:
          return {}
      }
    }
    return {}
  }

  const getArrowStyle = () => {
    const fillColor = !backgroundColor || '#E7E8EA'
    if (dimensions && dimensions.top) {
      const { top, left, height, width } = dimensions
      switch (position) {
        case 'top':
        case 'top-left':
        case 'top-right':
          return {
            borderLeft: 'solid transparent 10px',
            borderRight: 'solid transparent 10px',
            borderTop: `solid ${fillColor} 10px`,
            top: top + window.scrollY - 12,
            left: left + width / 2,
            marginBottom: 10
          }

        case 'bottom':
        case 'bottom-left':
        case 'bottom-right':
          return {
            borderLeft: 'solid transparent 10px',
            borderRight: 'solid transparent 10px',
            borderBottom: `solid ${fillColor} 10px`,
            top: top + window.scrollY + height,
            left: left + width / 2
          }

        case 'left':
          return {
            left: left - 13,
            top: top + window.scrollY + 2,
            borderTop: 'solid transparent 10px',
            borderBottom: 'solid transparent 10px',
            borderLeft: `solid ${fillColor} 10px`
          }

        case 'right':
          return {
            left: left + width + 5,
            top: top + window.scrollY + 2,
            borderTop: 'solid transparent 10px',
            borderBottom: 'solid transparent 10px',
            borderRight: `solid ${fillColor} 10px`
          }

        default:
          return {}
      }
    }
    return {}
  }

  const getAnimationStyle = () => {
    const animationStyle = getAnimationStyleByPosition()

    if (isShowing === false) {
      return animationStyle.enter
    }

    return {
      ...animationStyle.enter,
      ...animationStyle.active
    }
  }

  const getOffset = () => {
    if (offset !== '0px') {
      switch (position) {
        case 'top':
          return { marginBottom: offset }
        case 'top-left':
          return { marginBottom: offset }
        case 'top-right':
          return { marginBottom: offset, marginLeft: offset }
        case 'bottom':
          // @ts-ignore
          return { marginTop: parseInt(offset, 10) - 30 }
        case 'bottom-left':
          // @ts-ignore
          return { marginTop: parseInt(offset, 10) - 30 }
        case 'bottom-right':
          // @ts-ignore
          return { marginTop: parseInt(offset, 10) - 30, marginLeft: offset }
        case 'left':
          return { marginRight: offset }
        case 'right':
          return { marginLeft: offset }
        default:
          return {}
      }
    }
    return {}
  }

  return (
    <div
      className={clsx(styles['tooltip-arrow'], arrowClassName)}
      // @ts-ignore
      style={{
        ...getBaseStyle(),
        ...getArrowStyle(),
        ...getAnimationStyle(),
        ...getOffset()
      }}
    />
  )
}

export default Arrow
