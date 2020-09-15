import React, { FunctionComponent, useState } from 'react'
import styles from './tabs.module.scss'
import TabList from './TabList';
import Panels from './Panels';
import Panel from '../Panel';
import PanelItem from '../PanelItem';

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
    <div className='tabs-wrapper' {...rest}>
        <TabList 
          onClick={handleClick}
          items={items}
          // @ts-ignore
          selectedIndex={selectedIndex}
        /> 
        <Panel>
          <PanelItem itemClass="tabs-panel-item" selectedIndex={selectedIndex} index={0}> Content 1</PanelItem>
          <PanelItem itemClass="tabs-panel-item" selectedIndex={selectedIndex} index={1}> Content 2</PanelItem>
          <PanelItem itemClass="tabs-panel-item" selectedIndex={selectedIndex} index={2}> Content 3</PanelItem>
        </Panel>
        {/* <Panels items={items} selectedIndex={selectedIndex} /> */}
    </div>
  )
}

export default Tabs
