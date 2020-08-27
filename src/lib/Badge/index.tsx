import React, { FunctionComponent } from 'react'

import styles from './badge.module.scss'
import clsx from 'clsx'

interface Props {
  children: string
  white?: string
  width?: string
  height?: string
  [rest: string]: unknown // ...rest property
}

const Badge: FunctionComponent<Props> = ({ children, width, height, white, ...rest }) => {
  return (
    <div className={styles['badge-wrapper']} {...rest}>
      <p className={clsx(styles.badge, white && styles.whiteBadge)}>{children}</p>
    </div>
  )
}

export default Badge
