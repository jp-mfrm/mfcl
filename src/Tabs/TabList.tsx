
import React, { useState, FunctionComponent, useEffect, useRef } from 'react'
import clsx from 'clsx';
import styles from './tabs.module.scss'
import Tab from './Tab'

export interface Props {
  items: []
  selectedIndex: number
  onClick: Function | null
  onKeyDown: Function | null
}

const TabList: FunctionComponent<Props> = ({ items, onClick, onKeyDown, selectedIndex }) => {
  return (
   <ul role='tablist' className={clsx(styles['tabs'])}>
     {items?.map((item, index) => {
       console.log(item)
      return (
    
        <Tab
          key={index}
          {...item}
          id={`tab-${index}`}
          index={index}
          // @ts-ignore
          label={item.header}
          onClick={onClick}
          onKeyDown={onKeyDown}
          selectedIndex={selectedIndex}
        />
      )
    })}

   </ul>
  
  )
}

export default TabList
