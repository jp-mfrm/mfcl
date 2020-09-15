import React, { FunctionComponent, ReactNode } from 'react'
import clsx from 'clsx';
import styles from './tabs.module.scss'

export interface Props {
  id: string
  index?: number
  selectedIndex: number
  children?: ReactNode
}

const Panel: FunctionComponent<Props> = ({ id, index, selectedIndex, children }) => {

  const isSelected = index === selectedIndex;

  return (
    <section
    aria-hidden={!isSelected}
    className={clsx(styles['panel-item'], isSelected && styles['active'])}
    id={id}
    role="tabpanel"
    // @ts-ignore
    index={index}
    tabIndex={isSelected ? 0 : -1}
    >
     {children}
  </section>
  
  )
}

export default Panel
