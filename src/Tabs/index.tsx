import React, { FunctionComponent, useMemo, createRef, ReactNode, MouseEvent, KeyboardEvent } from 'react'
import Tab from './Tab'
import Indicator from './Indicator'
import useControlled from '../utils/useControlled'
import styles from './tabs.module.scss'

export interface Props {
  /** Uniquely identifies the Tabs component */
  name: string
  /** An array of objects that contain header and content */
  items: ReactNode[]
  /** class name to add to tabs component */
  className?: string
  /** class name to add to tabs title */
  titleClassName?: string
  /** Callback function for controlled behavior */
  onChange?: (activeIndex: number) => void
  /** Uncontrolled default value */
  defaultValue?: number
  /** Controlled value */
  value?: number
  [rest: string]: unknown // ...rest property
}

const Tabs: FunctionComponent<Props> = ({
  name,
  items,
  className,
  titleClassName,
  onChange,
  defaultValue = 0,
  value,
  ...rest
}) => {
  const [selectedIndex, setSelectedIndex] = useControlled({
    controlled: value,
    defaultValue
  })

  const tabRefs = useMemo(() => items.map(() => createRef()), [items])

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
    <div className={styles['tablist-wrapper']} {...rest}>
      <ul role="tablist" className={styles.tablist}>
        {items.map((label, index) => {
          return (
            <Tab
              name={name}
              key={index}
              id={`tab-${index}`}
              innerRef={tabRefs[index]}
              index={index}
              label={label}
              handleClick={handleClick}
              handleKeyDown={handleKeyDown}
              isSelected={index === selectedIndex}
              className={titleClassName}
            />
          )
        })}
      </ul>
      <Indicator activeTabElement={tabRefs[selectedIndex]} />
    </div>
  )
}

export default Tabs
