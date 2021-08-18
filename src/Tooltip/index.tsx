/* eslint-disable no-use-before-define */
import React, { useState, useEffect, ReactNode, FunctionComponent, useRef } from 'react'
import clsx from 'clsx'
import useDimensions from '../utils/useDimensions'
import Portal from '../Portal'
import Arrow from './Arrow'
import TipContainer from './TipContainer'

import styles from './tooltip.module.scss'
import Fade from '../Fade'

export type Position = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'right' | 'left'

export interface Props {
  /** Content elements inside the tooltip container */
  children?: ReactNode
  /** The display for the user to hover/click on */
  trigger: string | ReactNode
  /** If true, shows an arrow pointing to the trigger */
  arrow?: boolean
  /** Override styles to arrow */
  arrowClassName?: string
  /** border-color of tooltip container */
  borderColor?: string
  /** adds backdrop to the tooltip */
  backdrop?: false
  /** sets opacity of backdrop */
  backdropOpacity?: number
  /** Override styles on backdrop */
  backdropClassName?: string
  /** Duration of backdrop fade */
  backdropDuration?: number
  /** explicitly sets z-index of backdrop */
  backdropZIndex?: number
  /** Override styles to wrapper */
  className?: string
  /** whether or not the x should appear in the header */
  closeBtn?: boolean
  /** Delay of debounce on scroll */
  debounceDelay?: number
  /** Delay of transition animation */
  delay?: number
  /** How long the transition animation should go */
  duration?: number
  /** Type of easing animtation applied */
  easing?: string
  /** Title to be shown at top of tooltip content */
  header?: string
  /** If true, the tooltip will open on hover */
  hover?: boolean
  /** DON'T USE. For testing purposes only */
  initialDimensions?: any
  /** Whether the tooltip is open or not */
  isOpen?: boolean
  /** max-width of the tooltip container */
  maxWidth?: string
  /** Callback when tooltip is closed */
  onClose?: Function | null
  /** Callback when tooltip is opened */
  onOpen?: Function | null
  /** Position of tooltip in relation to the trigger */
  position?: Position
  /** Sets the tooltip zIndex */
  zIndex?: number
  /** Override styles to the content */
  tipContainerClassName?: string
  [rest: string]: unknown
}

const Tooltip: FunctionComponent<Props> = ({
  arrow,
  arrowClassName,
  borderColor,
  backdrop = false,
  backdropOpacity = 0.1,
  backdropClassName = '',
  backdropDuration = 50,
  backdropZIndex = 95,
  children,
  className,
  closeBtn,
  duration,
  delay,
  debounceDelay,
  easing,
  header,
  hover,
  initialDimensions,
  isOpen,
  maxWidth,
  onOpen,
  onClose,
  position,
  tipContainerClassName,
  trigger,
  zIndex = 1,
  ...rest
}) => {
  const [isShowing, setIsShowing] = useState(isOpen)
  const tipContainerRef = useRef<HTMLDivElement>(null)
  // @ts-ignore
  const [wrapperRef, dimensions] = useDimensions(true, debounceDelay, initialDimensions, [isShowing])

  const portalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      handleTouch()
    } else {
      closeToolTip()
    }
  }, [isOpen])

  useEffect(() => {
    if (isShowing) {
      assignOutsideTouchHandler()
    }
    return removeListeners
  }, [isShowing])

  const assignOutsideTouchHandler = () => {
    document.addEventListener('click', handler)
    document.addEventListener('keydown', handleEscape)
  }

  const removeListeners = () => {
    document.removeEventListener('click', handler)
    document.removeEventListener('keydown', handleEscape)
  }

  const closeToolTip = () => {
    hideTooltip()
    removeListeners()
  }

  const handleEscape = (e: any) => {
    switch (e.key) {
      case 'Escape': {
        closeToolTip()
        break
      }
    }
  }

  const handler = (e: any) => {
    if (isShowing) {
      let currentNode = e.target
      while (currentNode.parentNode) {
        if (currentNode === tipContainerRef.current) return
        currentNode = currentNode.parentNode
      }
      if (currentNode !== document) return
      closeToolTip()
    }
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
    }
  }

  const handleKeys = (e: any) => {
    const key = e.keyCode || e.which

    switch (key) {
      // Escape
      case 27: {
        if (isShowing) {
          closeToolTip()
        }
        break
      }

      case 13: {
        if (!isShowing) {
          showTooltip()
        }
        break
      }

      default:
        break
    }
  }

  const tooltipContent = (
    <>
      {backdrop && isShowing && (
        <Fade
          className={clsx(styles['tooltip-backdrop'], isShowing && styles.backdrop, backdropClassName)}
          style={{ zIndex: zIndex - 1, opacity: backdropOpacity }}
          onClick={closeToolTip}
          onKeyDown={handleKeys}
          duration={backdropDuration}
          in={isShowing && !!backdrop}
          opacity={backdropOpacity}
        />
      )}
      {arrow && (
        <Arrow
          arrowClassName={arrowClassName}
          borderColor={borderColor}
          delay={delay}
          dimensions={dimensions}
          duration={duration}
          easing={easing}
          isShowing={isShowing}
          position={position}
          zIndex={zIndex + 100}
        />
      )}
      <TipContainer
        borderColor={borderColor}
        closeBtn={closeBtn}
        delay={delay}
        dimensions={dimensions}
        duration={duration}
        easing={easing}
        closeToolTip={closeToolTip}
        header={header}
        isShowing={isShowing}
        maxWidth={maxWidth}
        position={position}
        zIndex={zIndex + 99}
        tipContainerClassName={tipContainerClassName}
        tipContainerRef={tipContainerRef}
      >
        {children}
      </TipContainer>
    </>
  )

  return (
    <div
      className={clsx(styles['tooltip-wrapper'], className)}
      style={{ zIndex }}
      onClick={hover ? undefined : handleTouch}
      onKeyDown={hover ? undefined : handleKeys}
      onMouseEnter={hover ? showTooltip : undefined}
      onMouseLeave={hover ? closeToolTip : undefined}
      ref={wrapperRef}
      tabIndex={0}
      aria-expanded={isShowing}
      aria-label="tooltip-wrapper"
      {...rest}
    >
      {trigger}
      {/* @ts-ignore */}
      <Portal ref={portalRef} ariaRole="tooltip" ariaLabel="tooltip-content">
        <>{tooltipContent}</>
      </Portal>
    </div>
  )
}

Tooltip.defaultProps = {
  arrow: true,
  arrowClassName: '',
  borderColor: '#e5e5e5',
  className: '',
  closeBtn: false,
  duration: 180,
  debounceDelay: 20,
  delay: 0,
  easing: 'ease-in-out',
  hover: false,
  initialDimensions: {},
  isOpen: false,
  onClose: null,
  onOpen: null,
  position: 'top',
  maxWidth: '385px',
  tipContainerClassName: ''
}

export default Tooltip
