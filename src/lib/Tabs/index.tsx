import React, { FunctionComponent, isValidElement } from 'react'
import styles from './tabs.module.scss'
import TabList from './TabList';
import Panels from './Panels';

export interface Props {
  items: []
  [rest: string]: unknown // ...rest property
}

const Tabs: FunctionComponent<Props> = ({ items, children, ...rest }) => {
  return (
    <div className={styles['tabs-wrapper']} {...rest}>
        <TabList items={items} /> 
        <Panels items={items} />
    </div>
  )
}

export default Tabs
