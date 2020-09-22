import React, { ReactNode, FunctionComponent } from 'react'
import clsx from 'clsx'
import styles from './tabs.module.scss'
import Tab from './Tab'

export interface Item {
  header: string | ReactNode
  content: string | ReactNode
}

export interface Props {
  name: string
  items: Item[]
  selectedIndex: number
  onClick: Function | null
  onKeyDown: Function | null
}

const TabList: FunctionComponent<Props> = ({ name, items, onClick, onKeyDown, selectedIndex }) => {
  return (
    <ul role="tablist" className={clsx(styles['tabs'])}>
      {items?.map((item, index) => {
        return (
          <Tab
            name={name}
            key={index}
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
