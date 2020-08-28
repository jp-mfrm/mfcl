import React, { FunctionComponent, memo } from 'react'
import clsx from 'clsx'

import styles from './stepper.module.scss'

const empty = {}

interface Props {
  /**
   * Controls the current active step
   */
  activeStep: boolean
  index: number
  alreadyPassed: boolean
  lastIndex: boolean
  content?: any
  color?: string
  /**
   * Use this function to save the selected index
   */
  selectIndex?: Function
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
  stepClass,
  vertical
}) => {
  const verticalClass = vertical && styles.vertical
  const circleNumber = (
    <div className={clsx(styles['outer-circle'], verticalClass)}>
      <div
        onClick={selectIndex ? () => selectIndex(index) : undefined}
        onKeyPress={selectIndex ? () => selectIndex(index) : undefined}
        role="button"
        tabIndex={0}
        style={
          activeStep ? { border: `2px solid ${color}` } : { background: color, cursor: selectIndex ? 'pointer' : '' }
        }
        className={clsx(
          styles.circle,
          activeStep && styles['circle-active'],
          content && styles['circle-label'],
          verticalClass
        )}
      />
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
      {!lastIndex && <div style={{ backgroundColor: color }} className={clsx(styles.line, verticalClass)} />}
    </li>
  )
}

export default memo(Step)
