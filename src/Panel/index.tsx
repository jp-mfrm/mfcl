import React, { FunctionComponent, Children, CSSProperties, isValidElement, cloneElement } from 'react'
import clsx from 'clsx'

import styles from './panel.module.scss'

interface Props {
  /** Class to pass to the panel */
  className?: string
  /** Enable rounded variation. */
  rounded?: boolean
  [rest: string]: unknown // ...rest property
}

const Panel: FunctionComponent<Props> = ({
  className,
  header,
  footer,
  rounded = false,
  customStyling,
  children,
  ...rest
}) => {
  return (
    <div className={clsx(styles.panel, rounded && styles.rounded, className)} {...rest}>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child)
        }
      })}
    </div>
  )
}

export default Panel
