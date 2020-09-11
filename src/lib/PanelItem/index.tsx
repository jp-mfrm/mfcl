import React, { FunctionComponent, CSSProperties, ReactNode } from 'react'
import clsx from 'clsx'

import styles from '../Panel/panel.module.scss'

interface Props {
  /** Pre-designated panel item styles */
  type?: 'header' | 'body' | 'footer' | 'link'
  /** Class to pass to the panel item */
  itemClass?: string
  /** Set custom inline css */
  customStyling?: CSSProperties
  [rest: string]: unknown // ...rest property
}

const PanelItem: FunctionComponent<Props> = ({ type, itemClass, customStyling, ...rest }) => {
  let Component = 'div'
  if (type == 'link') {
    Component = 'a'
  }

  return (
    <Component
      // @ts-ignore
      className={clsx(styles['panel-item'], type && styles[type], itemClass)}
      style={customStyling}
      {...rest}
    />
  )
}

export default PanelItem
