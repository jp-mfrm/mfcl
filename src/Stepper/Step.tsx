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
  index: number
  lastIndex: boolean
  step: IStep
  color?: string
  /**
   * Use this function to save the selected index
   */
  selectIndex?: Function
  stepClass?: string
  vertical?: boolean
}

const Step: FunctionComponent<Props> = ({ activeStep, step, index, lastIndex, selectIndex, stepClass, vertical }) => {
  const { color = '#302926', icon, label, dividerClass } = step
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
          label && styles['circle-icon'],
          verticalClass
        )}
      >
        {icon}
      </div>
    </div>
  )

  return (
    <li className={clsx(styles['progress-step'], activeStep && styles['active-step'], verticalClass, stepClass)}>
      {circleNumber}
      {label && <div className={clsx(styles.label, verticalClass)}>{label}</div>}
      {!lastIndex && <div style={{ borderColor: color }} className={clsx(styles.line, verticalClass, dividerClass)} />}
    </li>
  )
}

export default memo(Step)
