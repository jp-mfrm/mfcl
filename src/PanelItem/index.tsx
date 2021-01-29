import React, { FunctionComponent, CSSProperties, ReactNode } from 'react'
import clsx from 'clsx'

import styles from '../Panel/panel.module.scss'

interface Props {
  /** Name to pass to the panel for ADA when used with Tabs component */
  name: string
  /** index is required when using multiple panels with the same name */
  index?: number
  /** Pre-designated panel item styles */
  type?: 'header' | 'body' | 'footer' | 'link'
  /** Class to pass to the panel item */
  className?: string
  /** is the item selected? */
  isSelected?: number
  [rest: string]: unknown // ...rest property
}

const PanelItem: FunctionComponent<Props> = ({ name, type, index, isSelected, className, ...rest }) => {
  let Component = 'div'
  if (type == 'link') {
    Component = 'a'
  }

  return (
    <Component
      id={`panel-${name}-${index}`}
      className={clsx(
        styles['panel-item'],
        isSelected && styles['active'],
        !isSelected && styles['hidden'],
        type && styles[type],
        className
      )}
      {...rest}
      aria-hidden={!isSelected}
      // @ts-ignore
      role="tabpanel"
      tabIndex={isSelected ? 0 : -1}
      aria-labelledby={`tab-${name}-${index}`}
    />
  )
}

export default PanelItem
