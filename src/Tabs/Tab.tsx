import React, { memo, useEffect, FunctionComponent, MouseEvent, KeyboardEvent, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './tabs.module.scss'
import { useFirstRender } from '../utils/useFirstRender'

interface Props {
  name: string
  id: string
  index: number
  className?: string
  innerRef: any
  isSelected: boolean
  label: ReactNode
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void
  handleKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void
}

const Tab: FunctionComponent<Props> = ({
  name,
  innerRef,
  id,
  className,
  handleClick,
  handleKeyDown,
  isSelected,
  index,
  label
}) => {
  const firstRender = useFirstRender()
  useEffect(() => {
    if (!firstRender && isSelected && innerRef.current) {
      innerRef.current.focus()
    }
  }, [isSelected])

  return (
    <li className={styles['tab-list-item']} role="presentation">
      <button
        ref={innerRef}
        aria-controls={`panel-${name}-${index}`}
        id={`tab-${name}-${index}`}
        aria-selected={isSelected}
        className={clsx(styles['tab-item'], isSelected && styles.active, className)}
        data-index={index}
        role="tab"
        tabIndex={isSelected ? 0 : -1}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {label}
      </button>
    </li>
  )
}

export default memo(Tab)
