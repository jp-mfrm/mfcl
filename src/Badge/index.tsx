import React, { FunctionComponent, ElementType } from 'react'
import clsx from 'clsx'

import styles from './badge.module.scss'

interface Props {
  children: string
  /** Applies a primary or secondary style to the badge */
  type?: 'primary' | 'secondary'
  /** Overrides styles */
  className?: string
  /** Overrides wrapper DOM element */
  component?: ElementType
  [rest: string]: unknown // ...rest property
}

const Badge: FunctionComponent<Props> = ({
  className,
  children,
  type = 'primary',
  component: Component = 'span',
  ...rest
}) => {
  const badgeClassName = clsx(styles.badge, styles[type], (rest.href || rest.to) && styles.link, className)

  return (
    <Component className={badgeClassName} {...rest}>
      {children}
    </Component>
  )
}

export default Badge
