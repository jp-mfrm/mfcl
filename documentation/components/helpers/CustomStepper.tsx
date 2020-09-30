import React from 'react'
import { Stepper } from '../../../src'
import Check from '../../../src/Icons/Check'
import ChevronRight from '../../../src/Icons/ChevronRight'

// @ts-ignore
import styles from './customStepper.module.scss'

const steps = [
  { label: 'Preparing Order', className: styles['first-step'] },
  { label: 'In Transit', icon: <ChevronRight fillColor="#d63426" width={24} height={24} /> },
  { label: 'Delivered', icon: <Check />, color: '#006601', className: styles['last-step'] }
]

const CustomStepper = () => {
  return <Stepper activeStep={1} steps={steps} />
}

export default CustomStepper
