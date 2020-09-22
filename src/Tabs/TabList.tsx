import React, { ReactNode, FunctionComponent, MouseEvent, KeyboardEvent } from 'react'
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
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void
  onKeyDown: (event: KeyboardEvent<HTMLAnchorElement>) => void
}

const TabList: FunctionComponent<Props> = ({ name, items, onClick, onKeyDown, selectedIndex }) => {
  return (
    <ul role="tablist" className={styles.tabs}>
      {items.map((item, index) => {
        return (
          <Tab
            name={name}
            key={index}
            id={`tab-${index}`}
            index={index}
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
