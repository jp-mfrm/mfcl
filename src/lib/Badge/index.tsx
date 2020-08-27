import React, { FunctionComponent } from 'react'

import styles from './badge.module.scss'
import clsx from 'clsx'

interface Props {
  children: string
  color?: string
  width?: string
  height?: string
  [rest: string]: unknown // ...rest property
}

const Badge: FunctionComponent<Props> = ({ children, width, height, color, ...rest }) => {
  return (
    <div className={styles['badge-wrapper']} {...rest}>
      {children}
    </div>
  )
}

export default Badge
