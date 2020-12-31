import React, { forwardRef, FunctionComponent, ReactNode } from 'react'
import useForwardRefHasValue from '../utils/useForwardRefHasValue'
import clsx from 'clsx'
import styles from './input.module.scss'

export interface Props {
  /** Class to pass to the input wrapper */
  wrapperClass?: string
  /** Class to pass to the input */
  className?: string
  /** Field and label name */
  name?: string
  /** Label for input field */
  label?: string | ReactNode
  /** Size of the Input. */
  size?: 'lg' | 'sm'
  /** Use rounded styling */
  rounded?: boolean
  /** Makes the input field disabled */
  disabled?: boolean
  /** Apply error styling */
  error?: boolean
  /** Message for input submission  */
  inputMessage?: string
  /** Add a Button or other component to the right side  */
  rightSide?: ReactNode
  /** You already know what this is for. Why are you looking up the description? */
  onChange?: Function
  [rest: string]: unknown
}

const Input: FunctionComponent<Props> = forwardRef<HTMLInputElement, Props>(function TextField(props, ref) {
  const {
    wrapperClass,
    className,
    name,
    label,
    size = 'lg',
    rounded = false,
    disabled = false,
    error = false,
    inputMessage,
    onChange,
    rightSide,
    ...rest
  } = props
  const { hasValue, setHasValue, forwardedRef } = useForwardRefHasValue<HTMLInputElement>(ref)
  const errorClass = error && styles.error

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

  return (
    <div className={clsx(styles['input-wrapper'], wrapperClass)}>
      <div className={styles.inner}>
        <input
          className={clsx(
            styles.input,
            styles[size],
            errorClass,
            hasValue && styles['has-value'],
            rounded && styles.rounded,
            className
          )}
          name={name}
          disabled={disabled}
          onChange={formControl}
          ref={forwardedRef}
          {...rest}
        />
        {label && (
          <label
            htmlFor={name}
            className={clsx(
              styles.label,
              styles[size],
              disabled && styles.disabled,
              rounded && styles.roundedLabel,
              errorClass
            )}
          >
            {label}
          </label>
        )}
        {rightSide && <div className={styles['right-side']}>{rightSide}</div>}
      </div>
      {inputMessage && <p className={clsx(styles.footer, errorClass)}>{inputMessage}</p>}
    </div>
  )
})

export default Input
