import React, { FunctionComponent, forwardRef, useEffect, ChangeEvent } from 'react'
import clsx from 'clsx'
import styles from './checkbox.module.scss'
import useControlled from '../utils/useControlled'

export interface Props {
  /** checked or not */
  checked?: boolean
  /** default value for uncontrolled */
  defaultChecked?: boolean
  /** This is the label and aria-label of the checkbox */
  label?: string | React.ReactNode
  /** Changes the background color of checkbox */
  backgroundColor?: 'black' | 'red'
  /** Which side of the checkbox the label is placed */
  labelPlacement?: 'top' | 'bottom' | 'left' | 'right'
  /** Which side of the checkbox the label is placed */
  size?: 'sm' | 'md' | 'lg'
  /** Which side of the checkbox the label is placed */
  alignment?: 'left' | 'center' | 'right'
  /** callback for when the checkbox is clicked */
  onChange?: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void
  /** Overrides input styles */
  className?: string
  /** Overrides wrapper styles */
  wrapperClass?: string
  /** Overrides label styles */
  labelClass?: string
  [rest: string]: unknown
}

const Checkbox: FunctionComponent<Props> = forwardRef<HTMLInputElement, Props>(function CheckboxField(props, ref) {
  const {
    className,
    backgroundColor = 'black',
    defaultChecked,
    alignment = 'center',
    onChange,
    label,
    labelPlacement = 'right',
    labelClass,
    checked,
    size = 'lg',
    wrapperClass,
    ...rest
  } = props
  const [valueDerived, setValueState] = useControlled({
    controlled: checked,
    defaultValue: Boolean(defaultChecked)
  })

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked
    setValueState(newChecked)

    if (onChange) {
      onChange(event, newChecked)
    }
  }

  return (
    <label
      className={clsx(styles['checkbox-container'], styles[labelPlacement], styles[`align-${alignment}`], wrapperClass)}
    >
      <input
        type="checkbox"
        onChange={handleCheck}
        className={clsx(styles.checkbox, styles[backgroundColor], styles[size], className)}
        ref={ref}
        checked={valueDerived}
        {...rest}
      />
      {label && <span className={clsx(styles.label, styles[size], labelClass)}>{label}</span>}
    </label>
  )
})

export default Checkbox
