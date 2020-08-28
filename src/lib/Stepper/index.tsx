import React, { FunctionComponent, ReactNode } from 'react'
import clsx from 'clsx'
import Step from './Step'
import styles from './stepper.module.scss'

interface Props {
  /**
   * Index that controls the current active step
   */
  activeStep: number
  /**
   * Any array. If you have strings or react components, they will be displayed next to the step
   * If you don't want labels, do an array of falsey values: [false, false, false]
   */
  steps: any[]
  className?: string
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
  [rest: string]: unknown
}

const Stepper: FunctionComponent<Props> = ({
  activeStep,
  className,
  color,
  steps,
  selectIndex,
  showStepNumber,
  stepClass,
  vertical,
  ...rest
}) => {
  return (
    <ul className={clsx(styles['stepper-wrapper'], vertical && styles.vertical, className)} {...rest}>
      {steps.map((content: any, index) => {
        const alreadyPassed = activeStep >= index + 1
        const lastIndex = index === steps.length - 1
        return (
          <Step
            key={index}
            activeStep={activeStep === index}
            alreadyPassed={alreadyPassed}
            color={color}
            content={content}
            index={index}
            lastIndex={lastIndex}
            selectIndex={selectIndex}
            showStepNumber={showStepNumber}
            stepClass={stepClass}
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
  selectIndex: undefined,
  showStepNumber: false,
  vertical: false
}

export default Stepper
