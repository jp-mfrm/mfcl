import React, { FunctionComponent } from 'react'
import clsx from 'clsx'

import styles from './badge.module.scss'

interface Props {
  children: string
  type?: 'primary' | 'secondary'
  href?: string
  className?: string
  [rest: string]: unknown // ...rest property
}

const Badge: FunctionComponent<Props> = ({
  children,
  width = '',
  height = '',
  type = 'primary',
  href = '',
  className = '',
  ...rest
}) => {
  const badgeClassName = clsx(styles.badge, styles[type], href && styles.link, className)
  const badgeSizeStyles = { width: `${width}`, height: `${height}` }

  if (href) {
    return (
      <a
        href={href}
        role="button"
        aria-label={children}
        className={clsx(badgeClassName)}
        style={badgeSizeStyles}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <div className={badgeClassName} style={badgeSizeStyles} {...rest}>
      {children}
    </div>
  )
}

export default Badge
