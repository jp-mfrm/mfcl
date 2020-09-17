import React, { FunctionComponent, CSSProperties, ReactNode } from 'react'
import clsx from 'clsx'

import styles from '../Panel/panel.module.scss'

interface Props {
  /** Pre-designated panel item styles */
  type?: 'header' | 'body' | 'footer' | 'link'
  /** Class to pass to the panel item */
  itemClass?: string
  /* index & selectedIndex required when using a panel for a tabs component */
  index?: number
  selectedIndex?: number
  /** Set custom inline css */
  customStyling?: CSSProperties
  [rest: string]: unknown // ...rest property
}

const PanelItem: FunctionComponent<Props> = ({ type, index, selectedIndex, itemClass, customStyling, ...rest }) => {
  let Component = 'div'
  if (type == 'link') {
    Component = 'a'
  }

  const isSelected = index === selectedIndex;

  return (
    <Component
      // @ts-ignore
      className={clsx(styles['panel-item'], isSelected && styles['active'], !isSelected && styles['hidden'], type && styles[type], itemClass)}
      style={customStyling}
      {...rest}
      aria-hidden={!isSelected}
      // @ts-ignore
      role="tabpanel"
      tabIndex={isSelected ? 0 : -1}
    />
  )
}

export default PanelItem
