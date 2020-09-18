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
    | 'paragraph'
    | 'paragraph-sm'
    | 'paragraph-lg'
    | 'price-lg'
    | 'price'
    | 'price-sale'
    | 'eyebrow'
    | 'byline'
  /** Can pass a custom custom tag to the component. 
   * For example, this is helpful when you want the typography 
   * of an h1 without it being an h1 */
  tag?: string
  /** Give a custom className to the typography component. */
  className?: string
  /** Which way the text is aligned */
  align?: 'left' | 'center' | 'right'
  /** If true, sets the text to not wrap and instead display ellipsis */
  noWrap?: boolean
  /** Sets the color of the text */
  color?: 'primary' | 'secondary' | 'error' | 'success' | 'alert'
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
  paragraph: 'p',
  'paragraph-sm': 'p',
  'paragraph-lg': 'p',
  'price-lg': 'p',
  price: 'p',
  'price-sale': 'p',
  eyebrow: 'p',
  byline: 'p'
}

const Typography: FunctionComponent<Props> = ({ 
  variant, 
  children, 
  className, 
  tag, 
  align, 
  noWrap, 
  color, 
  ...rest 
}) => {
  let textStyles = clsx(
      styles.wrapper,
      color && styles[color], 
      align && styles[align], 
      noWrap && styles.noWrap,
      styles[variant],
      className
    )
  return createElement(
        tag ? tag : customElement[variant],
        { className: textStyles, ...rest },
        children
      )
}

export default Typography
