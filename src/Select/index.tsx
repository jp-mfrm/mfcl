import React, { FunctionComponent, ReactNode, forwardRef } from 'react'
import useForwardRefHasValue from '../utils/useForwardRefHasValue'
import useControlled from '../utils/useControlled'
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
  /** Size of the Input. Might add "sm" in the future */
  size?: 'lg' | 'md' | 'sm'
  /** Apply error styling */
  error?: boolean
  /** Makes the input field disabled */
  disabled?: boolean
  /** Message for input submission  */
  inputMessage?: string
  /** Override styles to wrapper */
  wrapperClass?: string
  /** Set the value of the input  */
  value?: string | number | readonly string[]
  /** Make the input uncontrolled with defaultValue */
  defaultValue?: string | number | readonly string[]
  /** You already know what this is for. Why are you looking up the description? */
  onChange?: Function
  [x: string]: unknown // ...rest property
}

const Select: FunctionComponent<Props> = forwardRef<HTMLSelectElement, Props>(function Select(
  {
    className = '',
    children,
    label,
    name,
    size = 'lg',
    wrapperClass = '',
    inputMessage,
    error,
    onChange,
    disabled,
    value,
    defaultValue,
    ...rest
  },
  ref
) {
  const { hasValue, setHasValue, forwardedRef } = useForwardRefHasValue<HTMLSelectElement>(ref, value)
  const errorClass = error && styles.error
  const wrapperClassName = clsx(styles['form-group'], wrapperClass)
  const selectClassName = clsx(styles.select, errorClass, hasValue && styles['has-value'], styles[size], className)
  const [valueDerived, setSelectValue] = useControlled({
    controlled: value,
    defaultValue: defaultValue
  })

  const formControl = (e: any) => {
    const length = e.target.value.length

    // extra checks to prevent unnecessary rerenders every keystroke
    if (hasValue && length === 0) {
      setHasValue(false)
    } else if (!hasValue && length > 0) {
      setHasValue(true)
    }

    setSelectValue(e.target.value)

    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div className={wrapperClassName}>
      <div className={styles['select-group']}>
        <select
          name={name}
          ref={forwardedRef}
          disabled={disabled}
          className={selectClassName}
          onChange={formControl}
          value={valueDerived}
          {...rest}
        >
          {children}
        </select>
        {label && (
          <label htmlFor={name} className={clsx(styles.label, styles[size], errorClass, disabled && styles.disabled)}>
            {label}
          </label>
        )}
      </div>
      {inputMessage && <p className={clsx(styles.footer, errorClass)}>{inputMessage}</p>}
    </div>
  )
})

export default Select
