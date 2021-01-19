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
  /** Override styles to popper content */
  contentClass?: string
}

// based off below url, documentation on actual site is not comprehensive
// https://dev.to/tannerhallman/using-usepopper-to-create-a-practical-dropdown-5bf8
const Popper: FunctionComponent<Props> = ({
  trigger,
  triggerClass,
  position = 'bottom',
  offsetX = 0,
  offsetY = 0,
  contentClass,
  ...rest
}) => {
  const [visible, setVisibility] = useState(false)
  const [referenceElement, setReferenceElement] = React.useState(null)
  const [popperElement, setPopperElement] = React.useState(null)
  const [arrowElement, setArrowElement] = React.useState(null)

  // const clickRef = useRef<HTMLButtonElement>(null)
  // const popperRef = useRef<HTMLDivElement>(null)
  // const arrowRef = useRef<HTMLDivElement>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: position,
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        enabled: true,
        options: {
          offset: [offsetX, offsetY]
        }
      }
    ]
  })

  function handleClick() {
    console.log('test')
    setVisibility(!visible)
  }

  // const placement1 = attributes && attributes.popper && attributes.popper['data-popper-placement']
  // const arrowTopClass = position && position.startsWith('top') && ' top'

  return (
    <div className={clsx(customStyles['popper-wrapper'])} onClick={handleClick}>
      <button type="button" ref={setReferenceElement}>
        {trigger}
      </button>
      {visible && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          className={clsx(customStyles['content'])}
          {...attributes.popper}
        >
          Popper element
          {/* Popper element
          // styleArrow,
          //   placement && placement.startsWith("top") && styleArrowBottom,
          //   placement && placement.startsWith("bottom") && styleArrowTop,
          //   placement && placement.startsWith("left") && styleArrowRight,
          //   placement && placement.startsWith("right") && styleArrowLeft */}
          <div
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
        </div>
      )}
    </div>
  )

  // return (
  //   <>
  //     <div
  //       className={clsx(customStyles['popper-wrapper'])}
  //       role="button"
  //       tabIndex={0}
  //       ref={referenceElement}
  //       onClick={handleClick}
  //     >
  //       <div className={clsx(customStyles['popper-trigger'], triggerClass)}> {trigger} </div>
  //     </div>

  //     <div ref={popperElement} style={styles.popper} {...attributes.popper}>
  //       <div ref={arrowElement} style={styles.arrow} />
  //       {visible && (
  //         // <Portal>
  //         <div className={clsx(customStyles['popper-content'], contentClass)}>
  //           FREE ADJUSTABLE BASE 3 with Queen mattress purchase of $699+ or King $999+. Use code: ELEVATE{' '}
  //         </div>
  //         // </Portal>
  //       )}
  //     </div>
  //   </>
  // )
}

export default Popper
