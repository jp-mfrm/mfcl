
import React, { useState, FunctionComponent, useEffect, useRef } from 'react'
import clsx from 'clsx';
import styles from './tabs.module.scss'
import Tab from './tab'

export interface Props {
  items: []
}

const TabList: FunctionComponent<Props> = ({ items }) => {
  console.log(items);
  return (
   <ul role='tablist' className='tablist'>
  
     {items?.map((item, index) => {
      return (
        <Tab
          key={index}
          {...item}
          id={`tab-${index}`}
          index={index}
          label={item}
        />
      )
    })}

   </ul>
  
  )
}

export default TabList
