import React, { FunctionComponent, useState } from 'react'
import TabList from './TabList'
import Panel from '../Panel'
import PanelItem from '../PanelItem'

import clsx from 'clsx';
import styles from './tabs.module.scss'

export interface Props {
  items: []
  [rest: string]: unknown // ...rest property
}

const Tabs: FunctionComponent<Props> = ({ items, children, ...rest }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleClick = (e: any) => {
    e.preventDefault()
    setSelectedIndex(parseInt(e.target.getAttribute('index')))
  }

  const handleKeyDown = (e: any) => {
    console.log('handle keys')
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      console.log('arrows')
    } else {
      return
    }

    let targetIndex

    if (e.key === 'ArrowLeft' && selectedIndex > 0) {
      targetIndex = selectedIndex - 1
    } else if (e.key === 'ArrowRight' && selectedIndex < items.length - 1) {
      targetIndex = selectedIndex + 1
    } else {
      return
    }
    setSelectedIndex(targetIndex)
  }

  return (
    <div className={clsx(styles['tabs-wrapper'])} {...rest}>
      <TabList
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        items={items}
        // @ts-ignore
        selectedIndex={selectedIndex}
      />
      <Panel className={clsx(styles['panel'])}>
      {/* <PanelItem itemClass="tabs-panel-item" selectedIndex={selectedIndex} index={0}> Test 123 </PanelItem> */}
        {items.map((item, index) => {
           return (
          <PanelItem itemClass="tabs-panel-item" selectedIndex={selectedIndex} index={index}>
            {/* @ts-ignore */}
            {item.content}
          </PanelItem>
           )
        })}
      </Panel>
    </div>
  )
}

export default Tabs
