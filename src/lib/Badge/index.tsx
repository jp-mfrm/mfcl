import React, { FunctionComponent } from 'react'

import styles from './badge.module.scss'
import clsx from 'clsx'

interface Props {
  children: string
  white?: boolean
  href?: string
  [rest: string]: unknown // ...rest property
}

const Badge: FunctionComponent<Props> = ({ children, width, height, white, href = '', ...rest }) => {
  const badgeClassName = clsx(styles.badge, white && styles.whiteBadge)

  if (href) {
    return (
      <div className={styles['badge-wrapper']}>
        <a href={href} className={clsx(badgeClassName)} {...rest}>
          {children}
        </a>
      </div>
    )
  }

  return (
    <div className={styles['badge-wrapper']} {...rest}>
      <p className={badgeClassName}>{children}</p>
    </div>
  )
}

export default Badge
