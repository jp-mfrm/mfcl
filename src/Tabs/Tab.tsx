  import React, { FunctionComponent, useRef, useEffect } from 'react'
import clsx from 'clsx';
import styles from './tabs.module.scss'

export interface Props {
  id: string
  index: number
  selectedIndex: number
  label: string
  onClick?: Function | null
  onKeyDown?: Function | null
}

const Tab: FunctionComponent<Props> = ({ id, onClick, onKeyDown, selectedIndex, index, label}) => {
  const isSelected = index === selectedIndex;
  const tabRef: any = useRef<HTMLDivElement>(null)
  const firstUpdate = useRef(true)

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }  

    if (isSelected && tabRef.current) {
      tabRef.current.focus();
    }

  }, [isSelected])

  return (
    <li className={clsx(styles['tab-list-item'], isSelected && styles['active']) } role="presentation">
      <a
        ref={tabRef}
        aria-controls={id}
        aria-selected={isSelected}
        className={clsx(styles['tab-item'], isSelected && styles['active'])}
        href={`#${id}`}
        index={index}
        role="tab"
        tabIndex={isSelected ? 0 : -1}
        // @ts-ignore
        onClick={onClick}
        // @ts-ignore
        onKeyDown={onKeyDown}
      >
        {label}
      </a>
    </li>
  )
}

export default Tab
