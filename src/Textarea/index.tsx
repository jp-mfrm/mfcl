import React, { CSSProperties, FunctionComponent, ReactNode } from 'react'

import clsx from 'clsx'
import styles from './textarea.module.scss'

interface Props {
  /** Class to pass to the textarea wrapper */
  className?: string
  /** Syles to pass to the textarea element */
  fieldStyling?: CSSProperties
  /** Styles to pass to the wrapper element */
  wrapperStyling?: CSSProperties
  /** Apply error styling */
  error?: boolean
  /** Label for textarea field */
  label?: string | ReactNode
  /** Message for input submission  */
  textAreaMessage?: string
  /** Field and label name */
  name?: string
  [rest: string]: unknown // ...rest property
}

const Textarea: FunctionComponent<Props> = ({
  className,
  fieldStyling,
  wrapperStyling,
  error = false,
  label,
  name,
  textAreaMessage,
  ...rest
}) => {
  const errorClass = error && styles.error

  const handleKeyUp = (e: any) => {
    if (e.target.value.length > 0) return
    e.target.style.height = 'inherit'
  }

  const handleKeyDown = (e: any) => {
    var scrollTop =
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

  return (
    <div className={clsx(styles['textarea-wrapper'])} style={wrapperStyling}>
      <div className={styles.inner}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}
        <textarea
          className={clsx(styles.textarea, className, error && styles.error)}
          name={name}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          {...rest}
        />
      </div>
      {textAreaMessage && <p className={clsx(styles.footer, errorClass)}>{textAreaMessage}</p>}
    </div>
  )
}

export default Textarea
