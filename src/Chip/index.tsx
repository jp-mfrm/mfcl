import React, { useRef, FunctionComponent, KeyboardEvent, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './chip.module.scss'

interface Props {
  /** Label inside of the chip */
  label: string
  /** className applied to wrapper */
  className?: string
  /** svg of right icon */
  rightIcon?: ReactNode
  /** type of Chip */
  size?: 'sm' | 'md'
  /** type of Chip */
  variant?: 'outlined' | 'filled'
  /** Makes the chip deletable */
  onDelete?: (label: string) => void
  [rest: string]: unknown
}

function isDeletableKeyboardEvent(e: KeyboardEvent<HTMLButtonElement>) {
  return e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Enter'
}

const CloseIcon = () => (
  <svg width="9" height="10" viewBox="0 0 9 10" style={{ marginLeft: '11px' }}>
    <path d="M1 8.99211L8 1.99512" stroke="#2D2926" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 8.99211L1 1.99512" stroke="#2D2926" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Chip: FunctionComponent<Props> = ({
  label,
  className = '',
  rightIcon = <CloseIcon />,
  size = 'md',
  variant = 'outlined',
  onDelete,
  ...rest
}) => {
  const chipRef = useRef(null)

  const handleDelete = () => {
    if (onDelete) {
      onDelete(label)
    }
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (isDeletableKeyboardEvent(event)) {
      handleDelete()
    } else if (event.key === 'Escape' && chipRef && chipRef.current) {
      // @ts-ignore
      chipRef.current.blur()
    }
  }

  return (
    <button
      className={clsx(styles.chip, styles[size], styles[variant], !onDelete && styles['not-deletable'], className)}
      id={`chip-${label}`}
      onClick={handleDelete}
      onKeyUp={handleKeyUp}
      type="button"
      ref={chipRef}
      {...rest}
    >
      <span className={styles['chip-label']}>{label}</span>
      {onDelete && rightIcon}
    </button>
  )
}

export default Chip
