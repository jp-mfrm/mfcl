import React, { FunctionComponent } from 'react'
import clsx from 'clsx'
import Step, { IStep } from './Step'
import styles from './stepper.module.scss'

interface Props {
  /** Index that controls the current active step */
  activeStep: number
  /**
   * An array of objects that can have color, icon, label, dividerStyle
   * If you don't want labels, do an array of empty objects [{}, {}, {}]
   */
  steps: IStep[]
  /** className to be applied to the ul container element */
  className?: string
  /** Use this function to save the selected index */
  selectIndex?: Function
  /** Turns the entire stepper vertical */
  vertical?: boolean
  [rest: string]: unknown
}

const Stepper: FunctionComponent<Props> = ({ activeStep, className, color, steps, selectIndex, vertical, ...rest }) => {
  return (
    <ul className={clsx(styles['stepper-wrapper'], vertical && styles.vertical, className)} {...rest}>
      {steps.map((step: any, index) => {
        const lastIndex = index === steps.length - 1
        return (
          <Step
            key={index}
            activeStep={activeStep === index}
            step={step}
            index={index}
            lastIndex={lastIndex}
            selectIndex={selectIndex}
            vertical={vertical}
          />
        )
      })}
    </ul>
  )
}

Stepper.defaultProps = {
  className: '',
  color: '#302926',
  vertical: false
}

export default Stepper
