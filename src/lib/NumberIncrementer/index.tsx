import React, { FunctionComponent, useState, useCallback } from 'react'
import { createCounterSubtractFactory, createCounterAddFactory } from './factory.counter'
import clsx from 'clsx'

import styles from './numberIncrementer.module.scss'

interface Props {
  className?: string
  [rest: string]: unknown // ...rest property
}

const NumberIncrementer: FunctionComponent<Props> = ({ className, ...rest }) => {
  const [number, setNumber] = useState(1)

  const subtractNumber = useCallback(() => {
    setNumber(createCounterSubtractFactory(number))
  }, [number])

  const addNumber = useCallback(() => {
    setNumber(createCounterAddFactory(number))
  }, [number])

  return (
    <div className={clsx(styles['number-incrementer-wrapper'], className)} {...rest}>
      <button onClick={subtractNumber} data-testid="subtract" aria-label="subtract number">
        &#8722;
      </button>
      <p data-testid="number">{number}</p>
      <button onClick={addNumber} data-testid="add" aria-label="add number">
        &#43;
      </button>
    </div>
  )
}

export default NumberIncrementer
