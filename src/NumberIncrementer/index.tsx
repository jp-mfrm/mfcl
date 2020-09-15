import React, { FunctionComponent } from 'react'
import { createFactoryCounter } from './factory.counter'
import clsx from 'clsx'
import useControlled from '../utils/useControlled'

import styles from './numberIncrementer.module.scss'

interface Props {
  name: string
  label: string
  showLabel?: boolean
  className?: string
  value?: number | null
  defaultValue?: number
  onChange?: Function
  [rest: string]: unknown // ...rest property
}

const NumberIncrementer: FunctionComponent<Props> = ({
  name,
  label,
  showLabel,
  onChange,
  className,
  value: valueProp,
  defaultValue = 1,
  ...rest
}) => {
  let inputName = name ? name : 'Quantity'
  let labelName = label ? label : 'Qty:'

  const [valueDerived, setNumber] = useControlled({
    controlled: valueProp,
    defaultValue
  })

  const subtractNumber = () => {
    const newVal = createFactoryCounter(valueDerived, 'subtract')
    setNumber(newVal)
    if (onChange) {
      onChange(newVal)
    }
  }

  const addNumber = () => {
    const newVal = createFactoryCounter(valueDerived, 'add')
    setNumber(newVal)
    if (onChange) {
      onChange(newVal)
    }
  }

  return (
    <div className={clsx(styles['number-incrementer-wrapper'], className)} {...rest}>
      <label className={clsx(styles.hidden, showLabel && styles['show-label'])} htmlFor={inputName}>
        {labelName}
      </label>
      <div className={styles['number-incrementer']}>
        <button className={styles.button} onClick={subtractNumber} aria-label="Subtract Number">
          &#8722;
        </button>
        <input
          className={styles.input}
          data-testid="number"
          type="text"
          readOnly
          value={valueDerived}
          name={inputName}
        />
        <button className={styles.button} onClick={addNumber} aria-label="Add Number">
          &#43;
        </button>
      </div>
    </div>
  )
}

export default NumberIncrementer
