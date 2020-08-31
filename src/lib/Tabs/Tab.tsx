import React, { useState, FunctionComponent, useEffect, useRef } from 'react'
import clsx from 'clsx';
import styles from './tabs.module.scss'

export interface Props {
  id: string
  index?: number
  label: string
  isSelected: boolean
  onClick?: Function | null
  onKeyDown?: Function | null
}

const Tab: FunctionComponent<Props> = ({ id, index, isSelected, label }) => {
  const [isActive, setIsActive] = useState(false)
  const firstUpdate = useRef(true)
  const tabRef: any = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

    if (isActive) {
      console.log('in the effect')
      tabRef.current.focus();
    }

  }, [isActive])

  const setSelected = (e: any) => {
    if (isActive) {
      // TODO
      // need this to clear the rest of them out...think we do this on the more parent level
      console.log('deselect?')
      setIsActive(false)
    } else {
      console.log('select')
      setIsActive(true)
    }

  }

  return (
    <li className="tabs__tab-list-item" role="presentation">
      <a
        ref={tabRef}
        aria-controls={id}
        aria-selected={isActive}
        className={clsx(styles['tabitem'], isActive && styles['active'])}
        href={`#${id}`}
        role="tab"
        tabIndex={isActive ? 0 : -1}
        onClick={setSelected}
        // TODO set it so arrow keys work but this again might want to be on parent level
        // onKeyDown={setSelected}
      >
        {label}
      </a>
    </li>
  )
}

export default Tab
