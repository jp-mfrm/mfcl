/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { FunctionComponent, memo, useEffect, useRef } from 'react'
import clsx from 'clsx'
import styles from './dropdown.module.scss'

export interface Option {
  name: string
  value: string | number
  disabled?: boolean
}

export interface Props {
  isActive: boolean
  onItemClick: Function
  option: Option
}

const DropdownItem: FunctionComponent<Props> = ({ isActive, option, onItemClick }) => {
  const { value, name, disabled } = option
  const itemRef = useRef<HTMLDivElement>(null)

  const setScrollPosition = () => {
    if (itemRef?.current) {
      // @ts-ignore - typescript doesn't like the "?" optional chaining yet
      itemRef.current.parentNode.scrollTop = itemRef.current.offsetTop - itemRef.current.offsetHeight
    }
  }

  useEffect(() => {
    if (isActive) {
      setScrollPosition()
    }
  }, [isActive])

  const handleItemClick = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    if (disabled) {
      return
    }

    onItemClick(e, option)
  }

  return (
    <div
      className={clsx(styles['dropdown-item'], isActive && styles['item-active'], disabled && styles['item-disabled'])}
      onFocus={handleItemClick}
      onKeyPress={handleItemClick}
      ref={itemRef}
      data-value={value}
      role="button"
      // @ts-ignore
      tabIndex={disabled ? null : 0}
    >
      {name}
    </div>
  )
}

export default memo(DropdownItem)
