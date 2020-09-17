import React, { FunctionComponent, useState } from 'react'
import TabList from './TabList'
import Panel from '../Panel'
import PanelItem from '../PanelItem'

import clsx from 'clsx';
import styles from './tabs.module.scss'

export interface Props {
  items: []
  position: string
  defaultOpen: number
  [rest: string]: unknown // ...rest property
}

const Tabs: FunctionComponent<Props> = ({ items, position='top', defaultOpen = 0, ...rest }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultOpen)

  const handleClick = (e: any) => {
    e.preventDefault()
    setSelectedIndex(parseInt(e.target.getAttribute('index')))
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
    } else {
      return
    }

    let targetIndex;

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
    <div className={clsx(styles['tabs-wrapper'], styles[position])} {...rest}>
      <TabList
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        items={items}
        selectedIndex={selectedIndex}
      />
      <Panel className={clsx(styles['panel'])}>
        {items.map((item, index) => {
           return (
          <PanelItem selectedIndex={selectedIndex} index={index} key={index}> 
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
