import React, { FunctionComponent, ReactNode, memo, KeyboardEvent } from 'react'
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
  handleKeyDown: (e: KeyboardEvent<HTMLDivElement>, index: number) => void
  stepClass?: string
  vertical?: boolean
}

const Step: FunctionComponent<Props> = ({
  activeStep,
  currentOrPassed,
  handleKeyDown,
  step,
  index,
  firstIndex,
  selectIndex,
  stepClass,
  vertical
}) => {
  const { color = '#d63426', icon, label, dividerClass } = step
  const verticalClass = vertical && styles.vertical
  const currentOrPassedClass = currentOrPassed ? null : styles['not-passed']

  return (
    <li className={clsx(styles['progress-step'], verticalClass, currentOrPassedClass, stepClass)}>
      {!firstIndex && <div style={{ borderColor: color }} className={clsx(styles.line, verticalClass, dividerClass)} />}
      <div
        onClick={selectIndex ? () => selectIndex(index) : undefined}
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => handleKeyDown(e, index)}
        role="button"
        tabIndex={selectIndex ? 0 : -1}
        className={clsx(styles.circle, verticalClass)}
        style={
          activeStep
            ? { border: `2px solid ${color}` }
            : { border: `2px solid ${color}`, background: color, cursor: selectIndex ? 'pointer' : '' }
        }
      >
        {icon}
      </div>
      {label && <div className={clsx(styles.label, verticalClass)}>{label}</div>}
    </li>
  )
}

export default memo(Step)
