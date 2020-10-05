import React, { FunctionComponent, ReactNode, forwardRef } from 'react'
import clsx from 'clsx'

import styles from './select.module.scss'

export interface Props {
  children: React.ReactNode
  /** Override styles to input  */
  className?: string
  /** Label to describe the select */
  label?: string | ReactNode
  /** Name of form element */
  name?: string
  /** size of the select */
  size?: 'sm' | 'md' | 'lg'
  /** Override styles to wrapper */
  wrapperClass?: string
  [x: string]: unknown // ...rest property
}

const Select: FunctionComponent<Props> = forwardRef<HTMLSelectElement, Props>(function Select(
  { className = '', children, label, name, size = 'lg', wrapperClass = '', ...rest },
  ref
) {
  const wrapperClassName = clsx(styles['form-group'], wrapperClass)
  const inputClassName = clsx(styles['form-control'], styles[size], className)

  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <select name={name} ref={ref} className={inputClassName} {...rest}>
        {children}
      </select>
    </div>
  )
})

export default Select
