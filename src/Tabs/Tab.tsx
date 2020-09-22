import React, { FunctionComponent, useRef, useEffect, MouseEvent, KeyboardEvent, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './tabs.module.scss'

export interface Props {
  name: string
  id: string
  index: number
  selectedIndex: number
  label: string | ReactNode
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void
  onKeyDown: (event: KeyboardEvent<HTMLAnchorElement>) => void
}

const Tab: FunctionComponent<Props> = ({ name, id, onClick, onKeyDown, selectedIndex, index, label }) => {
  const isSelected = index === selectedIndex
  const tabRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (isSelected && tabRef.current) {
      tabRef.current.focus()
    }
  }, [isSelected])

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick(event)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    onKeyDown(event)
  }

  return (
    <li className={clsx(styles['tab-list-item'], isSelected && styles.active)} role="presentation">
      <a
        ref={tabRef}
        aria-controls={`panel-${name}-${index}`}
        id={`tab-${name}-${index}`}
        aria-selected={isSelected}
        className={clsx(styles['tab-item'], isSelected && styles.active)}
        href={`#${id}`}
        data-index={index}
        role="tab"
        tabIndex={isSelected ? 0 : -1}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {label}
      </a>
    </li>
  )
}

export default Tab
