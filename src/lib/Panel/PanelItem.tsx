import React, { FunctionComponent, CSSProperties } from 'react'
import clsx from 'clsx'

import styles from './panel.module.scss';

interface Props {
  /** Pre-designated panel item styles */
  type?: 'header' | 'body' | 'footer' | 'link'
  /** Class to pass to the panel item */
  itemClass?: string
  /** Set custom inline css */
  customStyling?: CSSProperties
  [rest: string]: unknown; // ...rest property
}

const PanelItem: FunctionComponent<Props> = ({
  type,
  itemClass,
  customStyling,
  ...rest
}) => {
  if(type == 'link') {
    return (
      <a className={clsx(styles['panel-item'], styles[type], itemClass)} 
        style={customStyling} 
        {...rest}>
      </a>
    )
  }

  return (
    <div className={clsx(styles['panel-item'], type && styles[type], itemClass)} 
      style={customStyling} 
      {...rest}>
    </div>
  );
}

export default PanelItem;