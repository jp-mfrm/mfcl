import React, { FunctionComponent, ReactNode, useState } from 'react'
import TabList, { Item } from './TabList'
import Panel from '../Panel'
import PanelItem from '../PanelItem'
import useControlled from '../utils/useControlled'

import clsx from 'clsx'
import styles from './tabs.module.scss'

export interface Props {
  /** Uniquely identifies the Tabs component */
  name: string
  /** An array of objects that contain header and content */
  items: Item[]
  /** Callback function for controlled behavior */
  onChange?: (activeIndex: number) => void
  /** Animates the tab indicator below the active tab */
  animated?: boolean
  /** Horizontal or vertical left tabs */
  position?: 'top' | 'left'
  /** Uncontrolled default value */
  defaultValue?: number
  /** Controlled value */
  value?: number
  [rest: string]: unknown // ...rest property
}

const Tabs: FunctionComponent<Props> = ({
  name,
  items,
  animated = false,
  onChange,
  position = 'top',
  defaultValue = 0,
  value,
  ...rest
}) => {
  const [selectedIndex, setSelectedIndex] = useControlled({
    controlled: value,
    defaultValue
  })

  const handleChange = (activeIndex: number) => {
    setSelectedIndex(activeIndex)
    if (onChange) {
      onChange(activeIndex)
    }
  }

  const handleClick = (e: any) => {
    e.preventDefault()
    handleChange(parseInt(e.target.getAttribute('data-index')))
  }

  const handleKeyDown = (e: any) => {
    if (e.key !== 'ArrowLeft' || e.key !== 'ArrowRight') {
      return
    }

    e.preventDefault()
    let targetIndex
    if (e.key === 'ArrowLeft' && selectedIndex > 0) {
      targetIndex = selectedIndex - 1
    } else if (e.key === 'ArrowRight' && selectedIndex < items.length - 1) {
      targetIndex = selectedIndex + 1
    } else {
      return
    }

    handleChange(targetIndex)
  }

  return (
    <div className={clsx(styles['tabs-wrapper'], styles[position])} {...rest}>
      <TabList
        name={name}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        items={items}
        selectedIndex={selectedIndex}
      />
      <Panel className={styles.panel}>
        {items.map((item, index) => {
          return (
            <PanelItem name={name} selectedIndex={selectedIndex} index={index} key={index}>
              {item.content}
            </PanelItem>
          )
        })}
      </Panel>
    </div>
  )
}

export default Tabs
