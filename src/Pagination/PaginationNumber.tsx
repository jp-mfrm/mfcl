import React, { FunctionComponent, memo } from 'react'
import clsx from 'clsx'

import styles from './pagination.module.scss'

interface Props {
  active: boolean
  number: number
  setNumberOfPage: (number: number) => void
}

const PaginationNumber: FunctionComponent<Props> = ({ active, number, setNumberOfPage }) => {
  return (
    <button
      className={clsx(styles.button, active && styles.active)}
      onClick={() => setNumberOfPage(number)}
      aria-label={`Go to page ${number}`}
      aria-current={active}
      type="button"
    >
      {number}
    </button>
  )
}

export default memo(PaginationNumber)
