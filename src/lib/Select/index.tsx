import React, { ReactNode } from 'react'
import clsx from 'clsx'

import styles from './select.module.scss'

type Props = {
  children: React.ReactNode
  className?: string
  innerRef?: any
  label?: string | ReactNode
  name?: string
  size?: 'sm' | 'md' | 'lg'
  wrapperClass?: string
  [x: string]: unknown // ...rest property
}

const Select: React.FunctionComponent<Props> = ({
  className = '',
  children,
  innerRef = null,
  label,
  name,
  size = 'lg',
  wrapperClass = '',
  ...rest
}) => {
  const wrapperClassName = clsx(styles['form-group'], wrapperClass)
  const inputClassName = clsx(styles['form-control'], styles[size], className)

  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <select name={name} ref={innerRef} className={inputClassName} {...rest}>
        {children}
      </select>
    </div>
  )
}

export default Select
