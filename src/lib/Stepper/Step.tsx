import React, { FunctionComponent, memo } from 'react'
import clsx from 'clsx'

import styles from './stepper.module.scss'

const empty = {}

interface Props {
  /**
   * Controls the current active step
   */
  activeStep: number
  index: number
  alreadyPassed: boolean
  lastIndex: boolean
  content?: any
  verticalClass?: string | boolean
  color?: string
  /**
   * Use this function to save the selected index
   */
  selectIndex?: Function
  /**
   * Shows the step number in the circle or not
   */
  showStepNumber?: boolean
  stepClass?: string
  vertical?: boolean
}

const Step: FunctionComponent<Props> = ({
  activeStep,
  alreadyPassed,
  color,
  content,
  index,
  lastIndex,
  selectIndex,
  showStepNumber,
  stepClass,
  vertical
}) => {
  const verticalClass = vertical && styles.vertical
  const divAttributes = alreadyPassed
    ? {
        onClick: selectIndex ? () => selectIndex(index) : null,
        onKeyPress: selectIndex ? () => selectIndex(index) : null,
        role: 'button',
        tabIndex: 0
      }
    : empty
  const circleNumber = (
    <div
      {...divAttributes}
      style={
        activeStep >= index
          ? {
              color: '#fff',
              border: `2px solid ${color}`,
              cursor: selectIndex ? 'pointer' : '',
              backgroundColor: color
            }
          : { color: '#8a8f9c', border: '1px solid #8a8f9c' }
      }
      className={clsx(styles['circle-number'], verticalClass)}
    >
      {showStepNumber && index + 1}
    </div>
  )

  return (
    <li className={clsx(styles['progress-step'], verticalClass, stepClass)}>
      {vertical ? (
        <>
          {circleNumber}
          {content && <div className={clsx(styles.word, verticalClass)}>{content}</div>}
        </>
      ) : (
        <>
          {content && <div className={styles.word}>{content}</div>}
          {circleNumber}
        </>
      )}
      {!lastIndex && (
        <div
          style={activeStep >= index ? { backgroundColor: color } : empty}
          className={clsx(styles.line, verticalClass)}
        />
      )}
    </li>
  )
}

export default memo(Step)
