import React, { FunctionComponent, ElementType } from 'react'
import clsx from 'clsx'
import Bouncer from '../Icons/bouncer'

import styles from './badge.module.scss'

interface Props {
  children: string
  type?: 'primary' | 'secondary'
  className?: string
  component?: ElementType
  [rest: string]: unknown // ...rest property
}

const Badge: FunctionComponent<Props> = ({
  children,
  width = '',
  height = '',
  type = 'primary',
  className = '',
  component: Component = 'div',
  ...rest
}) => {
  const badgeClassName = clsx(styles.root, styles.badge, styles[type], rest.href && styles.link, className)
  const badgeSizeStyles = { width: `${width}`, height: `${height}` }

  return (
    <Component className={badgeClassName} style={badgeSizeStyles} {...rest}>
      {children}
      <Bouncer />
    </Component>
  )
}

export default Badge
