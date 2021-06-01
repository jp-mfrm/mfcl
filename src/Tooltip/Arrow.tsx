import React, { CSSProperties, FunctionComponent, useMemo } from 'react'
import clsx from 'clsx'

import styles from './tooltip.module.scss'
import { Position } from '.'

export interface Props {
  arrowClassName?: string
  borderColor?: string
  delay?: number
  dimensions?: ClientRect
  duration?: number
  easing?: string
  isShowing?: boolean
  position?: Position
  zIndex?: number
}

const getAnimationStyleByPosition = (position?: Position) => {
  switch (position) {
    case 'top':
    case 'top-right':
    case 'top-left':
      return {
        enter: 'translate3d(-50%, 0, 0)',
        active: 'translate3d(-50%, -2px, 0)'
      }

    case 'bottom':
      return {
        enter: 'translate3d(0, -10px, 0)',
        active: 'translate3d(-50%, 1px, 0)'
      }
    case 'bottom-left':
    case 'bottom-right':
      return {
        enter: 'translate3d(0, -10px, 0)',
        active: 'translate3d(-50%, 0, 0)'
      }

    case 'left':
      return {
        enter: 'translate3d(0, -50%, 0)',
        active: 'translate3d(0, -50%, 0)'
      }

    case 'right':
      return {
        enter: 'translate3d(-10px, -100%, 0)',
        active: 'translate3d(0, -50%, 0)'
      }

    default:
      return { enter: '', active: '' }
  }
}

const Arrow: FunctionComponent<Props> = ({
  arrowClassName,
  borderColor,
  delay,
  dimensions,
  duration,
  easing,
  isShowing,
  position,
  zIndex = 100
}) => {
  const getBaseStyle: CSSProperties = useMemo(() => {
    const baseStyle: CSSProperties = {
      transition: `all ${duration}ms ${easing} ${delay}ms`,
      opacity: isShowing ? 1 : 0,
      pointerEvents: isShowing ? 'auto' : 'none'
    }

    if (dimensions && dimensions.top) {
      const { top, bottom, left, right } = dimensions
      baseStyle.top = top
      baseStyle.bottom = bottom
      baseStyle.left = left
      baseStyle.right = right
    }

    return baseStyle
  }, [dimensions])

  const getPositionStyle = (): CSSProperties => {
    if (dimensions && dimensions.top) {
      const { top, left, height, width } = dimensions
      switch (position) {
        case 'top':
        case 'top-left':
        case 'top-right':
          return {
            bottom: '100%',
            top: top + window.scrollY - 29,
            left: left - 5 + width / 2,
            boxShadow: `-1px 1px 0px 0px ${borderColor}`
          }

        case 'bottom':
        case 'bottom-left':
        case 'bottom-right':
          return {
            bottom: 'auto',
            top: top + window.scrollY + height + 9,
            left: left - 5 + width / 2,
            boxShadow: `1px -1px 0px 0px ${borderColor}`
          }

        case 'left':
          return {
            left: left - 31,
            top: top + window.scrollY + 9,
            bottom: 'auto',
            right: '102%',
            boxShadow: `1px 1px 0px 0px ${borderColor}`
          }

        case 'right':
          return {
            left: left + width + 18,
            top: top + window.scrollY + 11,
            bottom: 'auto',
            boxShadow: `-1px -1px 0px 0px ${borderColor}`
          }

        default:
          return {}
      }
    }
    return {}
  }

  const getSpecificStyle = (): CSSProperties => {
    if (dimensions && dimensions.top) {
      const { left, width } = dimensions
      switch (position) {
        case 'bottom-left':
        case 'top-left':
          return {
            left: left - 7 + width / 2
          }
        default:
          return {}
      }
    }
    return {}
  }

  const getAnimation: CSSProperties = useMemo(() => {
    let animation: 'active' | 'enter' = 'active'
    if (isShowing === false) {
      animation = 'enter'
    }

    return {
      transform: `rotate(-45deg) ${getAnimationStyleByPosition(position)[animation]}`
    }
  }, [isShowing, position])

  return (
    <div
      aria-label="tooltip-arrow"
      className={clsx(styles['tooltip-arrow'], arrowClassName)}
      style={{
        ...getBaseStyle,
        ...getPositionStyle(),
        ...getSpecificStyle(),
        ...getAnimation,
        zIndex
      }}
    />
  )
}

export default Arrow
