import React, { CSSProperties, forwardRef, FunctionComponent, ReactNode, useState } from 'react'
import useForwardRefHasValue from '../utils/useForwardRefHasValue'
import useControlled from '../utils/useControlled'
import clsx from 'clsx'
import styles from './textarea.module.scss'

interface Props {
  /** Class to pass to the textarea wrapper */
  className?: string
  /** Styles to pass to the textarea element */
  fieldStyling?: CSSProperties
  /** Styles to pass to the wrapper element */
  wrapperStyling?: CSSProperties
  /** Apply error styling */
  error?: boolean
  /** Label for textarea field */
  label?: string | ReactNode
  /** Message for input submission  */
  inputMessage?: string
  /** Field and label name */
  name?: string
  /** Set the value of the input  */
  value?: string | number | readonly string[]
  /** Make the input uncontrolled with defaultValue */
  defaultValue?: string | number | readonly string[]
  /** You already know what this is for. Why are you looking up the description? */
  onChange?: Function
  /** Enables the character count and applies a max length */
  characterLimit?: number
  [rest: string]: unknown // ...rest property
}
const Textarea: FunctionComponent<Props> = forwardRef<HTMLTextAreaElement, Props>(function TextField(props, ref) {
  const {
    className,
    fieldStyling,
    wrapperStyling,
    error = false,
    label,
    name,
    inputMessage,
    value,
    defaultValue,
    onChange,
    characterLimit,
    ...rest
  } = props
  const { hasValue, setHasValue, forwardedRef } = useForwardRefHasValue<HTMLTextAreaElement>(ref, value)
  const errorClass = error && styles.error
  const [valueDerived, setTextAreaValue] = useControlled({
    controlled: value,
    defaultValue: defaultValue
  })
  const [characterCount, setCharacterCount] = useState(
    characterLimit && valueDerived ? characterLimit - valueDerived.length : characterLimit
  )

  const handleKeyUp = (e: any) => {
    if (e.target.value.length > 0) return
    e.target.style.height = 'inherit'
  }

  const handleKeyDown = (e: any) => {
    const scrollTop =
      window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop

    // Reset field height
    e.target.style.height = 'inherit'

    // Get the computed styles for the element
    const computed = window.getComputedStyle(e.target)

    // Calculate the height
    const height =
      parseInt(computed.getPropertyValue('border-top-width'), 10) +
      parseInt(computed.getPropertyValue('padding-top'), 10) +
      (e.target.scrollHeight - 20) +
      parseInt(computed.getPropertyValue('padding-bottom'), 10) +
      parseInt(computed.getPropertyValue('border-bottom-width'), 10)

    e.target.style.height = `${height}px`
    window.scrollTo(0, scrollTop)
  }

  const formControl = (e: any) => {
    const length = e.target.value.length

    // extra checks to prevent unnecessary rerenders every keystroke
    if (hasValue && length === 0) {
      setHasValue(false)
    } else if (!hasValue && length > 0) {
      setHasValue(true)
    }

    setTextAreaValue(e.target.value)

    if (onChange) {
      onChange(e)
    }

    if (characterLimit) {
      const count = characterLimit - e.target.value.length
      if (count < 0) return
      setCharacterCount(count)
    }
  }

  return (
    <div className={styles['textarea-wrapper']} style={wrapperStyling}>
      <div className={clsx(characterLimit && styles.characterLimit)}>
        <textarea
          className={clsx(styles.textarea, errorClass, hasValue && styles['has-value'], className)}
          name={name}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onChange={formControl}
          ref={forwardedRef}
          style={fieldStyling}
          value={valueDerived}
          maxLength={characterLimit}
          {...rest}
        />
        {label && (
          <label htmlFor={name} className={clsx(styles.label, errorClass)}>
            {label}
          </label>
        )}
        {characterLimit && characterCount !== characterLimit && (
          <span className={clsx(styles.characterCount, characterCount === 0 && styles.error)}>{characterCount}</span>
        )}
      </div>
      {inputMessage && <p className={clsx(styles.footer, errorClass)}>{inputMessage}</p>}
    </div>
  )
})

export default Textarea
