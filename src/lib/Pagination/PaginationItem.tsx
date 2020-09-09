import React, { FunctionComponent } from 'react'

import styles from './pagination.module.scss'

interface Props {
  active?: boolean
  disabled?: boolean
  [rest: string]: unknown // ...rest property
}

export const PaginationItem: FunctionComponent<Props> = ({ active = false, disabled = false, ...rest }) => {
  const activeClass = active ? styles.active : ''
  const disabledClass = disabled ? styles.disabled : ''
  const classes = `${styles['page-item']} ${activeClass} ${disabledClass}`
  return <li {...rest} className={classes} />
}
