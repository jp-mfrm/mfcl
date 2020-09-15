
import React, { useState, FunctionComponent, useEffect, useRef } from 'react'
import clsx from 'clsx';
import styles from './tabs.module.scss'
import Tab from './Tab'

export interface Props {
  items: []
  selectedIndex: number
  onClick: Function | null
}

const TabList: FunctionComponent<Props> = ({ items, onClick, selectedIndex }) => {
  // const handleClick = (e: any) => {
  //   console.log('click in index.tsx')
  // }
  console.log(items)

  return (
   <ul role='tablist' className='tablist'>
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
          selectedIndex={selectedIndex}
        />
      )
    })}

   </ul>
  
  )
}

export default TabList
