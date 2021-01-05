import React, { memo, useEffect, FunctionComponent, MouseEvent, KeyboardEvent, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './tabs.module.scss'

interface Props {
  name: string
  id: string
  index: number
  className?: string
  innerRef: any
  isSelected: boolean
  label: string | ReactNode
  handleClick: (e: MouseEvent<HTMLAnchorElement>) => void
  handleKeyDown: (e: KeyboardEvent<HTMLAnchorElement>) => void
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
  useEffect(() => {
    if (isSelected && innerRef.current) {
      innerRef.current.focus()
    }
  }, [isSelected])

  return (
    <li className={clsx(styles['tab-list-item'], isSelected && styles.active)} role="presentation">
      <a
        ref={innerRef}
        aria-controls={`panel-${name}-${index}`}
        id={`tab-${name}-${index}`}
        aria-selected={isSelected}
        className={clsx(styles['tab-item'], isSelected && styles.active, className)}
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

export default memo(Tab)
