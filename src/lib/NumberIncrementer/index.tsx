import React, { FunctionComponent, useState, useCallback } from 'react'
import clsx from 'clsx'

import styles from './numberIncrementer.module.scss'

interface Props {
  className?: string
  [rest: string]: unknown // ...rest property
}

const NumberIncrementer: FunctionComponent<Props> = ({ className, ...rest }) => {
  const [number, setNumber] = useState(1)

  const subtractNumber = useCallback(() => {
    if (number <= 1) {
      setNumber(0)
    } else if (number > 1) {
      setNumber(number - 1)
    }
  }, [number])

  const addNumber = useCallback(() => {
    setNumber(number + 1)
  }, [number])

  return (
    <div className={clsx(styles['number-incrementer-wrapper'], className)} {...rest}>
      <button onClick={subtractNumber} aria-label="subtract number">
        &#8722;
      </button>
      <p>{number}</p>
      <button onClick={addNumber} aria-label="add number">
        &#43;
      </button>
    </div>
  )
}

export default NumberIncrementer
