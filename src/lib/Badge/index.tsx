import React, { FunctionComponent, ReactNode } from 'react'
import clsx from 'clsx'

import styles from './badge.module.scss'

interface Props {
  children: string
  type?: 'primary' | 'secondary'
  href?: string
  [rest: string]: unknown // ...rest property
}

const Badge: FunctionComponent<Props> = ({ children, width, height, type = 'primary', href = '', ...rest }) => {
  const badgeClassName = clsx(styles.badge, styles[type], href && styles.link)

  if (href) {
    return (
      <a href={href} className={clsx(badgeClassName)} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <div className={badgeClassName} {...rest}>
      {children}
    </div>
  )
}

export default Badge
