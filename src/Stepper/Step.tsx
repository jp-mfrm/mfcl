import React, { FunctionComponent, ReactNode, memo } from 'react'
import clsx from 'clsx'

import styles from './stepper.module.scss'

export interface IStep {
  className?: string
  color?: string
  icon?: ReactNode
  label?: string | ReactNode
  dividerClass?: string
}

interface Props {
  /**
   * Controls the current active step
   */
  activeStep: boolean
  currentOrPassed: boolean
  index: number
  firstIndex: boolean
  step: IStep
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
  currentOrPassed,
  step,
  index,
  firstIndex,
  selectIndex,
  stepClass,
  vertical
}) => {
  const { color = '#d63426', icon, label, dividerClass } = step
  const verticalClass = vertical && styles.vertical
  const currentOrPassedClass = currentOrPassed ? styles['current-or-passed'] : styles['not-passed']
  const circleNumber = (
    <div
      onClick={selectIndex ? () => selectIndex(index) : undefined}
      onKeyPress={selectIndex ? () => selectIndex(index) : undefined}
      role="button"
      tabIndex={selectIndex ? 0 : -1}
      style={
        activeStep
          ? { border: `2px solid ${color}` }
          : { border: `2px solid ${color}`, background: color, cursor: selectIndex ? 'pointer' : '' }
      }
      className={clsx(styles.circle, currentOrPassedClass, label && styles['circle-has-label'], verticalClass)}
    >
      {icon}
    </div>
  )

  return (
    <li className={clsx(styles['progress-step'], verticalClass, stepClass)}>
      {circleNumber}
      {!firstIndex && (
        <div
          style={{ borderColor: color }}
          className={clsx(styles.line, currentOrPassedClass, verticalClass, dividerClass)}
        />
      )}
      {label && <div className={clsx(styles.label, currentOrPassedClass, verticalClass)}>{label}</div>}
    </li>
  )
}

export default memo(Step)
