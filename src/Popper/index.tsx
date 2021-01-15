import React, { FunctionComponent, useState, useRef, ReactNode } from 'react'
import { usePopper } from 'react-popper'
import Portal from '../Portal'
import clsx from 'clsx'
import customStyles from './popper.module.scss'

interface Props {
  [rest: string]: unknown // ...rest property
  /** The display for the user to hover/click on */
  trigger: string | ReactNode
  /** Override styles to trigger */
  triggerClass?: string
  /** Position of tooltip in relation to the trigger */
  position?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'left'
  /** Space offset left/right in relation to the trigger */
  offsetX?: number
  /** Space offset top/bottom in relation to the trigger */
  offsetY?: number
  /** Override styles to popper content */
  contentClass?: string
}

// based off below url, documentation on actual site is not comprehensive
// https://dev.to/tannerhallman/using-usepopper-to-create-a-practical-dropdown-5bf8
const Popper: FunctionComponent<Props> = ({
  trigger,
  triggerClass,
  position = 'bottom-start',
  offsetX = 0,
  offsetY = 0,
  contentClass,
  ...rest
}) => {
  const [visible, setVisibility] = useState(false)

  const clickRef = useRef<HTMLButtonElement>(null)
  const popperRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  const { styles, attributes } = usePopper(clickRef.current, popperRef.current, {
    placement: position,
    modifiers: [
      // {
      //   name: 'offset',
      //   enabled: true,
      //   options: {
      //     offset: [offsetX, offsetY]
      //   }
      // },
      { name: 'arrow', options: { element: arrowRef.current } }
    ]
  })

  function handleClick() {
    setVisibility(!visible)
  }

  return (
    <>
      <div
        className={clsx(customStyles['popper-wrapper'])}
        role="button"
        tabindex={0}
        ref={clickRef}
        onClick={handleClick}
      >
        <div className={clsx(customStyles['popper-trigger'], triggerClass)}> {trigger} </div>
      </div>

      <div ref={popperRef} style={styles.popper} {...attributes.popper}>
        <div ref={arrowRef} style={styles.arrow} />
        {visible && (
          // <Portal>
          <div className={clsx(customStyles['popper-content'], contentClass)}>
            FREE ADJUSTABLE BASE 3 with Queen mattress purchase of $699+ or King $999+. Use code: ELEVATE{' '}
          </div>
          // </Portal>
        )}
      </div>
    </>
  )
}

export default Popper
