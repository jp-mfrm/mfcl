import React, { FunctionComponent, useMemo, createRef, ReactNode, MouseEvent, KeyboardEvent } from 'react'
import Tab from './Tab'
import Indicator from './Indicator'
import Panel from '../Panel'
import PanelItem from '../PanelItem'
import useControlled from '../utils/useControlled'

import clsx from 'clsx'
import styles from './tabs.module.scss'

interface Item {
  header: string | ReactNode
  content: string | ReactNode
}

export interface Props {
  /** Uniquely identifies the Tabs component */
  name: string
  /** An array of objects that contain header and content */
  items: Item[]
  /** Callback function for controlled behavior */
  onChange?: (activeIndex: number) => void
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

  const tabRefs = useMemo(() => Array.from(items).map(() => createRef()), [items])

  const handleChange = (activeIndex: number) => {
    setSelectedIndex(activeIndex)
    if (onChange) {
      onChange(activeIndex)
    }
  }

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    // @ts-ignore
    const index = parseInt(e.target.getAttribute('data-index'), 10)
    handleChange(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
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

    handleChange(targetIndex)
  }

  return (
    <div className={clsx(styles['tabs-wrapper'], styles[position])} {...rest}>
      <div className={styles['tablist-wrapper']}>
        <ul role="tablist" className={styles.tablist}>
          {items.map((item, index) => {
            return (
              <Tab
                name={name}
                key={index}
                id={`tab-${index}`}
                innerRef={tabRefs[index]}
                index={index}
                label={item.header}
                handleClick={handleClick}
                handleKeyDown={handleKeyDown}
                isSelected={index === selectedIndex}
              />
            )
          })}
        </ul>
        <Indicator activeTabElement={tabRefs[selectedIndex]} position={position} />
      </div>
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
