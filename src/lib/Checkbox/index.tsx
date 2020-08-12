/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo } from 'react'
import styles from './checkbox.module.scss'

type Props = {
  handleClick: () => void
  title: string
  checked?: boolean
  [rest: string]: unknown
}

const Checkbox: React.FunctionComponent<Props> = ({ handleClick, checked, title, ...rest }) => {
  return (
    <div onClick={handleClick} onKeyPress={handleClick} tabIndex={0} className={styles['checkbox-container']} {...rest}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleClick}
        className={styles.checkbox}
        name={title}
        tabIndex={-1}
        aria-label={title}
      />
      <label htmlFor={title} aria-hidden="true">
        {title}
      </label>
    </div>
  )
}

export default memo(Checkbox)
