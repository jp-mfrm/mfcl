import React, { FunctionComponent, ReactNode, useState, useEffect, forwardRef } from 'react'
import useForwardedRef from '../utils/useForwardedRef'
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
  /** Apply error styling */
  error?: boolean
  /** Message for input submission  */
  inputMessage?: string
  /** Override styles to wrapper */
  wrapperClass?: string
  /** You already know what this is for. Why are you looking up the description? */
  onChange?: Function
  [x: string]: unknown // ...rest property
}

const Select: FunctionComponent<Props> = forwardRef<HTMLSelectElement, Props>(function Select(
  { className = '', children, label, name, size = 'lg', wrapperClass = '', inputMessage, error, onChange, ...rest },
  ref
) {
  const [hasValue, setHasValue] = useState(false)
  const forwardedRef = useForwardedRef(ref)

  const errorClass = error && styles.error
  const wrapperClassName = clsx(styles['form-group'], wrapperClass)
  const selectClassName = clsx(styles.select, errorClass, className)

  const formControl = (e: any) => {
    const length = e.target.value.length

    // extra checks to prevent unnecessary rerenders every keystroke
    if (hasValue && length === 0) {
      setHasValue(false)
    } else if (!hasValue && length > 0) {
      setHasValue(true)
    }

    if (onChange) {
      onChange(e)
    }
  }

  useEffect(() => {
    if ((forwardedRef as React.RefObject<HTMLInputElement>)?.current?.value) {
      setHasValue(true)
    }
  }, [])

  return (
    <div className={wrapperClassName}>
      <div className={styles['select-group']}>
        <select name={name} ref={ref} className={selectClassName} onChange={formControl} {...rest}>
          {children}
        </select>
        {label && (
          <label htmlFor={name} className={clsx(styles.label, error && styles.error)}>
            {label}
          </label>
        )}
      </div>
      {inputMessage && <p className={clsx(styles.footer, errorClass)}>{inputMessage}</p>}
    </div>
  )
})

export default Select
