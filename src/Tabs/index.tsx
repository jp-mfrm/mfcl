import React, { FunctionComponent, useState } from 'react'
import styles from './tabs.module.scss'
import TabList from './TabList';
import Panels from './Panels';

export interface Props {
  items: []
  [rest: string]: unknown // ...rest property
}

const Tabs: FunctionComponent<Props> = ({ items, children, ...rest }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (e: any) => {
    e.preventDefault();
    setSelectedIndex(parseInt(e.target.getAttribute('index')))
    // console.log(e.target.getAttribute('index'));
    console.log('click in index.tsx')
  }

  return (
    <div className={styles['tabs-wrapper']} {...rest}>
        <TabList 
          onClick={handleClick}
          items={items}
          // @ts-ignore
          selectedIndex={selectedIndex}
        /> 
        <Panels items={items} selectedIndex={selectedIndex} />
    </div>
  )
}

export default Tabs
