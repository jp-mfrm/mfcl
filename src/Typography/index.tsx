import React, { FunctionComponent, createElement } from 'react'
import clsx from 'clsx'
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
    | 'bodySm'
    | 'bodyLg'
    | 'priceLg'
    | 'price'
    | 'priceSale'
  className?: string
  component?: string
  [rest: string]: unknown // ...rest property
}

const customElement = {
  xxl: 'h1',
  xl: 'h2',
  lg: 'h3',
  md: 'h4',
  sm: 'h5',
  xs: 'h6',
  subtitle: 'p',
  body: 'p',
  bodySm: 'p',
  bodyLg: 'p',
  priceLg: 'p',
  price: 'p',
  priceSale: 'p'
}

const Typography: FunctionComponent<Props> = ({ variant, children, className, component, ...rest }) => {
  return (
    <>
      {createElement(
        component ? component : customElement[variant],
        { className: clsx(styles[variant], className), ...rest },
        children
      )}
    </>
  )
}

export default Typography
