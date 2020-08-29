import React, { FunctionComponent, useState, useCallback } from 'react'

import styles from './numberIncrementer.module.scss'

interface Props {
  width?: string
  height?: string
  [rest: string]: unknown // ...rest property
}

const NumberIncrementer: FunctionComponent<Props> = ({ width, height, ...rest }) => {
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
    <div className={styles['number-incrementer-wrapper']} {...rest}>
      <button onClick={subtractNumber}>-</button>
      <p>{number}</p>
      <button onClick={addNumber}>+</button>
    </div>
  )
}

export default NumberIncrementer
