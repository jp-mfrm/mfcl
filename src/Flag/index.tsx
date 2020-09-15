import React, { FunctionComponent } from 'react'

import styles from './flag.module.scss'
import clsx from 'clsx'

interface Props {
  /* Flag text */
  text: string
  /* Flag color */
  backgroundColor?: string
  /* height of flag */
  height?: string
  /* width of flag */
  width?: string
  /* color of text */
  textColor?: string
  /* option to use Flag without a parent container */
  withoutContainer?: boolean
  [rest: string]: unknown // ...rest property
}

const Flag: FunctionComponent<Props> = ({
  text,
  backgroundColor = '#d63426',
  height = '78px',
  width = '191px',
  textColor,
  withoutContainer = false,
  ...rest
}) => {
  return (
    <div className={styles.flagWrapper} {...rest}>
      <div
        className={clsx(styles.flag, withoutContainer && styles.withoutContainer)}
        style={{
          background: `linear-gradient(to right bottom,  ${backgroundColor} 50%, transparent 50%)`,
          height,
          width
        }}
      >
        <div className={styles.text} style={{ color: textColor }}>
          {text}
        </div>
      </div>
    </div>
  )
}

export default Flag
