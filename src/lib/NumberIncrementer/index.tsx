import React, { FunctionComponent, useState, useCallback } from 'react'
import { createFactoryCounter } from './factory.counter'
import clsx from 'clsx'

import styles from './numberIncrementer.module.scss'

interface Props {
  name: string
  label: string
  showLabel?: boolean
  className?: string
  onChange: () => void
  [rest: string]: unknown // ...rest property
}

const NumberIncrementer: FunctionComponent<Props> = ({
  name = 'Quantity',
  label = 'Qty:',
  showLabel,
  onChange,
  className,
  ...rest
}) => {
  const [number, setNumber] = useState(1)

  const subtractNumber = useCallback(() => {
    setNumber(createFactoryCounter(number, 'subtract'))
  }, [number])

  const addNumber = useCallback(() => {
    setNumber(createFactoryCounter(number, 'add'))
  }, [number])

  return (
    <div className={clsx(styles['number-incrementer-wrapper'], className)} {...rest}>
      <label className={clsx(styles.hidden, showLabel && styles['show-label'])} htmlFor={name}>
        {label}
      </label>
      <div className={styles['number-incrementer']}>
        <button onClick={subtractNumber} aria-label="Subtract Number">
          &#8722;
        </button>
        <input type="text" readOnly value={number} name={name} />
        <button onClick={addNumber} onChange={subtractNumber} aria-label="Add Number">
          &#43;
        </button>
      </div>
    </div>
  )
}

export default NumberIncrementer
