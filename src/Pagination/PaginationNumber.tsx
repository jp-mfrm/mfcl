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
    <li>
      <button
        className={clsx(styles.button, active && styles.active)}
        onClick={() => setNumberOfPage(number)}
        aria-label={`Page ${number}`}
        aria-current={active}
        type="button"
      >
        {number}
      </button>
    </li>
  )
}

export default memo(PaginationNumber)
