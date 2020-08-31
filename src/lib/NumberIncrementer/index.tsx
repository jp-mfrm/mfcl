import React, { FunctionComponent, useState, useCallback } from 'react'
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
  name = 'Quantity',
  label = 'Qty:',
  showLabel,
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

  const subtractNumber = useCallback(() => {
    const newVal = createFactoryCounter(valueDerived, 'subtract')
    setNumber(newVal)
    if (onChange) {
      onChange(newVal)
    }
  }, [valueDerived, onChange])

  const addNumber = useCallback(() => {
    const newVal = createFactoryCounter(valueDerived, 'add')
    setNumber(newVal)
    if (onChange) {
      onChange(newVal)
    }
  }, [valueDerived, onChange])

  return (
    <div className={clsx(styles['number-incrementer-wrapper'], className)} {...rest}>
      <label className={clsx(styles.hidden, showLabel && styles['show-label'])} htmlFor={name}>
        {label}
      </label>
      <div className={styles['number-incrementer']}>
        <button onClick={subtractNumber} aria-label="Subtract Number">
          &#8722;
        </button>
        <input type="text" readOnly value={valueDerived} name={name} />
        <button onClick={addNumber} aria-label="Add Number">
          &#43;
        </button>
      </div>
    </div>
  )
}

export default NumberIncrementer
