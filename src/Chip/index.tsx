import React, { useRef, FunctionComponent, KeyboardEvent, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './chip.module.scss'
import Check from '../Icons/Check'

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
  variant?: 'outlined' | 'default' | 'filled' | 'checked'
  /** Makes the chip deletable */
  onDelete?: (label: string) => void
  /** callback for onClick */
  onClick?: (label: string) => void
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
  onClick,
  ...rest
}) => {
  const chipRef = useRef(null)

  const handleClick = () => {
    if (onDelete) {
      onDelete(label)
    }

    if (onClick) {
      onClick(label)
    }
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (isDeletableKeyboardEvent(event) && onDelete) {
      onDelete(label)
    } else if (event.key === 'Escape' && chipRef && chipRef.current) {
      // @ts-ignore
      chipRef.current.blur()
    } else if (event.key === 'Enter' && onClick) {
      onClick(label)
    }
  }

  return (
    <button
      className={clsx(
        styles.chip,
        styles[size],
        styles[variant],
        !onDelete && !onClick && styles['not-clickable'],
        className
      )}
      id={`chip-${label}`}
      onClick={handleClick}
      onKeyUp={handleKeyUp}
      type="button"
      ref={chipRef}
      {...rest}
    >
      {variant === 'checked' && <Check width={9} height={7} fillColor="#FFFFFF" />}
      <span className={clsx(styles['chip-label'], variant === 'checked' && styles['checked-label'])}>{label}</span>
      {onDelete && rightIcon}
    </button>
  )
}

export default Chip
