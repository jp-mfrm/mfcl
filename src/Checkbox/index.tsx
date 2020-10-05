/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import clsx from 'clsx'
import styles from './checkbox.module.scss'

export interface Props {
  /** This is the label, htmlFor, aria-label, and name of the checkbox */
  title: string
  /** callback for when the checkbox is clicked */
  handleClick?: () => void
  /** Overrides wrapper styles */
  className?: string
  [rest: string]: unknown
}

const Checkbox: React.FunctionComponent<Props> = ({ className, handleClick, title, ...rest }) => {
  return (
    <div
      onClick={handleClick}
      onKeyPress={handleClick}
      tabIndex={0}
      className={clsx(styles['checkbox-container'], className)}
    >
      <input
        type="checkbox"
        onChange={handleClick}
        className={styles.checkbox}
        name={title}
        tabIndex={-1}
        aria-label={title}
        {...rest}
      />
      <label htmlFor={title} aria-hidden="true">
        {title}
      </label>
    </div>
  )
}

export default Checkbox
