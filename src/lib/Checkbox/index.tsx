/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo } from 'react'
import clsx from 'clsx'
import styles from './checkbox.module.scss'

export interface Props {
  title: string
  handleClick?: () => void
  wrapperClass?: string
  checked?: boolean
  [rest: string]: unknown
}

const Checkbox: React.FunctionComponent<Props> = ({ wrapperClass, handleClick, checked, title, ...rest }) => {
  return (
    <div
      onClick={handleClick}
      onKeyPress={handleClick}
      tabIndex={0}
      className={clsx(styles['checkbox-container'], wrapperClass)}
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

export default memo(Checkbox)
