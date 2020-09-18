import React, { FunctionComponent, createElement } from 'react'
import clsx from 'clsx'
import styles from './typography.module.scss'

interface Props {
  children: string
  /** The variations the typography can render. */
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle'
    | 'body'
    | 'bodySm'
    | 'bodyLg'
    | 'priceLg'
    | 'price'
    | 'priceSale'
  /** Can pass a custom custom tag to the component. 
   * For example, this is helpful when you want the styles of an xxl 
   * without it being an h1 */
  tag?: string
  /** Give a custom className to the typography component. */
  className?: string
  [rest: string]: unknown // ...rest property
}

const customElement = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle: 'p',
  body: 'p',
  bodySm: 'p',
  bodyLg: 'p',
  priceLg: 'p',
  price: 'p',
  priceSale: 'p',
}

const Typography: FunctionComponent<Props> = ({ variant, children, className, tag, ...rest }) => {
  return createElement(
        tag ? tag : customElement[variant],
        { className: clsx(styles[variant], className), ...rest },
        children
      )
}

export default Typography
