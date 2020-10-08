import React, { FunctionComponent } from 'react'
import { createFactoryCounter } from './factory.counter'
import clsx from 'clsx'
import useControlled from '../utils/useControlled'

import styles from './numberIncrementer.module.scss'

interface Props {
  /** form name */
  name: string
  /** form label to describe it */
  label: string
  /** Override styles to the wrapper */
  className?: string
  /** Control the input by passing a value */
  value?: number | null
  /** Make the input uncontrolled with defaultValue */
  defaultValue?: number
  /** callback for when plus or minus is clicked */
  onChange?: Function
  [rest: string]: unknown // ...rest property
}

const NumberIncrementer: FunctionComponent<Props> = ({
  name,
  label,
  onChange,
  className,
  value: valueProp,
  defaultValue = 1,
  ...rest
}) => {
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
      <label className={clsx(styles.hidden, !!label && styles['show-label'])} htmlFor={name}>
        {label}
      </label>
      <div className={styles['number-incrementer']}>
        <button className={styles.button} onClick={subtractNumber} aria-label="Subtract Number">
          &#8722;
        </button>
        <input
          aria-live="polite"
          className={styles.input}
          data-testid="number"
          type="text"
          readOnly
          value={valueDerived}
          name={name}
        />
        <button className={styles.button} onClick={addNumber} aria-label="Add Number">
          &#43;
        </button>
      </div>
    </div>
  )
}

export default NumberIncrementer
