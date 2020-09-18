import React, { FunctionComponent, createElement } from 'react'

import styles from './typography.module.scss'

interface Props {
  children: string
  variant:
    | 'xxl'
    | 'xl'
    | 'lg'
    | 'md'
    | 'sm'
    | 'xs'
    | 'subtitle'
    | 'body'
    | 'body-sm'
    | 'body-lg'
    | 'price-lg'
    | 'price'
    | 'price-sale'
  className?: string
  component?: string
  [rest: string]: unknown // ...rest property
}

const Typography: FunctionComponent<Props> = ({ variant, children, className, component, ...rest }) => {
  let text
  let customTag

  if (variant === 'xxl') {
    text = <h1 className={styles.xxl}>{children}</h1>
    if (component) {
      return (customTag = createElement(component, { className: styles.xxl }, children))
    }
  }
  if (variant === 'xl') {
    text = <h2 className={styles.xl}>{children}</h2>
  }
  if (variant === 'lg') {
    text = <h3 className={styles.lg}>{children}</h3>
    if (component) {
      return (customTag = createElement(component, styles.lg, children))
    }
  }
  if (variant === 'md') {
    text = <h4 className={styles.md}>{children}</h4>
  }
  if (variant === 'sm') {
    text = <h5 className={styles.sm}>{children}</h5>
  }
  if (variant == 'xs') {
    text = <h6 className={styles.xs}>{children}</h6>
  }
  if (variant === 'body') {
    text = <p className={styles.body}>{children}</p>
  }
  if (variant === 'body-sm') {
    text = <p className={styles['body-sm']}>{children}</p>
  }
  if (variant === 'body-lg') {
    text = <p className={styles['body-lg']}>{children}</p>
  }
  if (variant === 'price-lg') {
    text = <p className={styles['price-lg']}>{children}</p>
  }
  if (variant === 'price') {
    text = <p className={styles.price}>{children}</p>
  }
  if (variant === 'price-sale') {
    text = <p className={styles['price-sale']}>{children}</p>
  }
  return (
    <div className={className} {...rest}>
      {text}
    </div>
  )
}

export default Typography
