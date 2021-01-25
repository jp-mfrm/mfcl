import React, { FunctionComponent, useState, useRef, ReactNode, useEffect } from 'react'
import { usePopper } from 'react-popper'
import clsx from 'clsx'
import customStyles from './popper.module.scss'

interface Props {
  [rest: string]: unknown // ...rest property
  /** The display for the user to hover/click on */
  trigger: string | ReactNode
  /** Override styles to trigger */
  triggerClass?: string
  /** Override styles to popper content */
  contentClass?: string
  /** Content that is in header */
  header?: string
  /** Content that is in the tooltip itself */
  tooltipContent: string
  /** Position of tooltip in relation to the trigger */
  position?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'righ-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end'
  /** Space offset left/right in relation to the trigger */
  offsetX?: number
  /** Space offset top/bottom in relation to the trigger */
  offsetY?: number
  arrow?: boolean
  closeBtn?: boolean
}

const Popper: FunctionComponent<Props> = ({
  trigger,
  triggerClass,
  contentClass,
  header,
  tooltipContent,
  position = 'bottom',
  offsetX = 0,
  offsetY = 0,
  arrow = true,
  closeBtn = false,
  ...rest
}) => {
  const [visible, setVisibility] = useState(false)
  const [arrowElement, setArrowElement] = useState(null)
  const referenceElement = useRef<HTMLDivElement>(null)
  const [popperElement, setPopperElement] = useState(null)
  const closeBtnRef = useRef<HTMLDivElement>(null)

  const { styles, attributes } = usePopper(referenceElement.current, popperElement, {
    // @ts-ignore
    placement: position,
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        enabled: true,
        options: {
          offset: [offsetX, offsetY]
        }
      },
      { name: 'flip', enabled: false }
    ]
  })

  useEffect(() => {
    if (visible) {
      if (closeBtnRef.current !== null) {
        closeBtnRef.current.focus()
      }
    } else {
      if (referenceElement.current !== null) {
        referenceElement.current.focus()
      }
    }
  }, [visible])

  useEffect(() => {
    if (visible) {
      handleTouch()
    }
    return removeListeners
  }, [visible])

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
    setVisibility(true)
  }

  const hideTooltip = () => {
    setVisibility(false)
  }

  const handleTouch = () => {
    if (!visible) {
      showTooltip()
      assignOutsideTouchHandler()
    }
  }

  const handleKeys = (e: any) => {
    const key = e.keyCode || e.which

    switch (key) {
      // Escape
      case 27: {
        if (visible) {
          hideTooltip()
          removeListeners()
        }
        break
      }

      case 13: {
        if (!visible) {
          showTooltip()
          assignOutsideTouchHandler()
        } else {
          hideTooltip()
          removeListeners()
        }
        break
      }

      default:
        break
    }
  }

  const popperContent = visible && (
    <div
      data-testid="popper-content"
      // @ts-ignore
      ref={setPopperElement}
      style={styles.popper}
      className={clsx(customStyles['content'], contentClass)}
      {...attributes.popper}
    >
      <div
        className={clsx(
          header?.length && close && customStyles['popper-header'],
          header?.length && customStyles['popper-with-heading'],
          header?.length === 0 && closeBtn && customStyles['popper-only-close']
        )}
      >
        {header?.length && <div> {header} </div>}
        {closeBtn && (
          <div role="button" className={clsx(customStyles['close'])} aria-label="Close Alert">
            <span tabIndex={0} className={customStyles['close-X']} ref={closeBtnRef}>
              &times;
            </span>
          </div>
        )}
      </div>
      {tooltipContent}
      {arrow && (
        <div
          data-testid="arrow"
          // @ts-ignore
          ref={setArrowElement}
          data-placement={position}
          style={styles.arrow}
          className={clsx(
            customStyles['arrow'],
            position.startsWith('top') && customStyles['styleArrowBottom'],
            position.startsWith('bottom') && customStyles['styleArrowTop'],
            position.startsWith('left') && customStyles['styleArrowRight'],
            position.startsWith('right') && customStyles['styleArrowLeft']
          )}
        />
      )}
    </div>
  )

  return (
    <div className={clsx(customStyles['popper-wrapper'])} onClick={handleTouch} onKeyDown={handleKeys}>
      <div role="button" tabIndex={0} ref={referenceElement} className={triggerClass}>
        {trigger}
      </div>
      {popperContent}
    </div>
  )
}

export default Popper
