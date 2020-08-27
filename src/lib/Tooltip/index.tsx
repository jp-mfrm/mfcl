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
  children: ReactNode
  /** The display for the user to hover/click on */
  trigger: string | ReactNode
  arrow?: boolean
  arrowClassName?: string
  className?: string
  delay?: number
  duration?: number
  easing?: string
  hover?: boolean
  /* don't use. For testing only*/
  initialDimensions?: any
  isOpen?: boolean
  onClose?: Function | null
  onOpen?: Function | null
  position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'right' | 'left'
  tipContainerClassName?: string
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
    document.addEventListener('keypress', handleEscape)
  }

  const removeListeners = () => {
    document.removeEventListener('click', handler)
    document.removeEventListener('keypress', handleEscape)
  }

  const handleEscape = (e) => {
    switch (e.key) {
      case 'Escape': {
        hideTooltip()
        removeListeners()
        break
      }
    }
  }

  const handler = (e) => {
    let currentNode = e.target
    const componentNode = wrapperRef.current
    while (currentNode.parentNode) {
      if (currentNode === componentNode) return
      currentNode = currentNode.parentNode
    }
    if (currentNode !== document) return
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
    showTooltip()
    assignOutsideTouchHandler()
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
      onKeyPress={hover ? undefined : handleTouch}
      onMouseEnter={hover ? showTooltip : undefined}
      onMouseLeave={hover ? hideTooltip : undefined}
      ref={wrapperRef}
      {...rest}
    >
      {trigger}
      <Portal>{tooltipContent}</Portal>
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
