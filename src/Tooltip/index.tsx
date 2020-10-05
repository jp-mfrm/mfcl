/* eslint-disable no-use-before-define */
import React, { useState, useEffect, ReactNode, FunctionComponent } from 'react'
import clsx from 'clsx'
import useDimensions from '../utils/useDimensions'
import Portal from '../Portal'
import Arrow from './Arrow'
import TipContainer from './TipContainer'

import styles from './tooltip.module.scss'

export interface Props {
  /** Content elements inside the tooltip container */
  children?: ReactNode
  /** The display for the user to hover/click on */
  trigger: string | ReactNode
  /** If true, shows an arrow pointing to the trigger */
  arrow?: boolean
  /** Override styles to arrow */
  arrowClassName?: string
  /** Override styles to wrapper */
  className?: string
  /** Delay of transition animation */
  delay?: number
  /** How long the transition animation should go */
  duration?: number
  /** Type of easing animtation applied */
  easing?: string
  /** If true, the tooltip will open on hover */
  hover?: boolean
  /** DON'T USE. For testing purposes only */
  initialDimensions?: any
  /** Whether the tooltip is open or not */
  isOpen?: boolean
  /** Callback when tooltip is closed */
  onClose?: Function | null
  /** Callback when tooltip is opened */
  onOpen?: Function | null
  /** Position of tooltip in relation to the trigger */
  position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'right' | 'left'
  /** Override styles to the content */
  tipContainerClassName?: string
  /** Title to be shown at top of tooltip content */
  header: string
  [rest: string]: unknown
}

const Tooltip: FunctionComponent<Props> = (props) => {
  const {
    arrow,
    arrowClassName,
    children,
    className,
    initialDimensions,
    trigger,
    duration,
    delay,
    easing,
    hover,
    onOpen,
    onClose,
    position,
    tipContainerClassName,
    isOpen,
    header,
    ...rest
  } = props
  const [isShowing, setIsShowing] = useState(isOpen)
  // @ts-ignore
  const [wrapperRef, dimensions] = useDimensions(true, 250, initialDimensions, [isShowing])
  useEffect(() => {
    if (isOpen) {
      handleTouch()
    }
    return removeListeners
  }, [isOpen])

  const assignOutsideTouchHandler = () => {
    document.addEventListener('click', handler)
    document.addEventListener('keydown', handleEscape)
  }

  const removeListeners = () => {
    document.removeEventListener('click', handler)
    document.removeEventListener('keydown', handleEscape)
  }

  const handleEscape = (e: any) => {
    switch (e.key) {
      case 'Escape': {
        hideTooltip()
        removeListeners()
        break
      }
    }
  }

  const handler = (e: any) => {
    hideTooltip()
    removeListeners()
  }

  const showTooltip = () => {
    if (onOpen) {
      onOpen()
    }

    setIsShowing(true)
  }

  const hideTooltip = () => {
    if (onClose) {
      onClose()
    }

    setIsShowing(false)
  }

  const handleTouch = () => {
    if (!isShowing) {
      showTooltip()
      assignOutsideTouchHandler()
    }
  }

  const handleKeys = (e: any) => {
    const key = e.keyCode || e.which

    switch (key) {
      // Escape
      case 27: {
        if (isShowing) {
          hideTooltip()
          removeListeners()
        }
        break
      }

      case 13: {
        if (isShowing) {
          hideTooltip()
          removeListeners()
        } else {
          showTooltip()
          assignOutsideTouchHandler()
        }
        break
      }

      default:
        break
    }
  }

  const tooltipContent = (
    <>
      {arrow && (
        <Arrow
          arrowClassName={arrowClassName}
          delay={delay}
          dimensions={dimensions}
          duration={duration}
          easing={easing}
          isShowing={isShowing}
          position={position}
        />
      )}
      <TipContainer
        header={header}
        delay={delay}
        dimensions={dimensions}
        duration={duration}
        easing={easing}
        isShowing={isShowing}
        position={position}
        tipContainerClassName={tipContainerClassName}
      >
        {children}
      </TipContainer>
    </>
  )

  return (
    <div
      className={clsx(styles['tooltip-wrapper'], className)}
      onClick={hover ? undefined : handleTouch}
      onKeyDown={hover ? undefined : handleKeys}
      onMouseEnter={hover ? showTooltip : undefined}
      onMouseLeave={hover ? hideTooltip : undefined}
      ref={wrapperRef}
      tabIndex={0}
      aria-expanded={isShowing}
      {...rest}
    >
      {trigger}
      {/* @ts-ignore */}
      <Portal>
        <>{tooltipContent}</>
      </Portal>
    </div>
  )
}

Tooltip.defaultProps = {
  arrow: true,
  arrowClassName: '',
  className: '',
  duration: 180,
  delay: 0,
  easing: 'ease-in-out',
  hover: true,
  initialDimensions: {},
  isOpen: false,
  onClose: null,
  onOpen: null,
  position: 'top',
  tipContainerClassName: ''
}

export default Tooltip
