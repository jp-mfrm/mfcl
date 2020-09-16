/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useMemo, useCallback, ReactNode, FunctionComponent } from 'react'
import clsx from 'clsx'
import DropdownItem, { Option } from './DropdownItem'

import styles from './dropdown.module.scss'

export interface Props {
  /* Dropdown options */
  options: Option[]
  /* Open or close dropdown. For controlled effect */
  open?: boolean
  className?: string
  id?: string
  /** Whether or not the json should close when the dropdown is blurred. */
  closeOnBlur?: boolean
  disabled?: boolean
  /* Label Text (if any) */
  label?: string | ReactNode
  listClass?: string
  /* class to pass to the menu options wrapper */
  menuClass?: string
  /* Click function on dropdown header */
  onClick?: Function
  /* Change function when a dropdown item is selected */
  onChange?: Function
  placeholder?: string
  /* Select item when tabing out of dropdown */
  selectOnTab?: boolean
  /* size of the dropdown */
  size?: string
  style?: object
  value?: Option | null
  /* Width of dropdown */
  width?: string | number
  [rest: string]: unknown
}

type InitState = {
  activeItem: Option
  isExpanded: boolean
  isFocused: boolean
  restoreItem?: Option | null
}

const Dropdown: FunctionComponent<Props> = ({
  className = '',
  id = '',
  closeOnBlur = true,
  disabled = false,
  value = null,
  label = '',
  listClass = '',
  menuClass = '',
  open = false,
  onChange,
  onClick = null,
  options,
  placeholder = '',
  selectOnTab = true,
  size = 'sm',
  style = {},
  width = '',
  ...rest
}) => {
  const [state, setState] = useState<InitState>({
    activeItem: value || (placeholder && { name: placeholder, value: placeholder }) || options[0] || {},
    isExpanded: open,
    isFocused: false,
    restoreItem: null
  })
  const { activeItem, isFocused, isExpanded, restoreItem } = state
  const dropdownRef = useRef<HTMLDivElement>(null)

  // gets all dropdown options that aren't disabled
  const activeItems = useMemo(() => options.filter((option) => !option.disabled), [options])

  // controlled isExpanded
  useEffect(() => {
    setState({
      ...state,
      isExpanded: open
    })
  }, [open])

  const handleOnChange = useCallback(
    (item: Option) => {
      if (!item || (restoreItem && restoreItem.name === item.name)) {
        return
      }
      if (onChange) {
        onChange(item)
      }
    },
    [onChange, restoreItem]
  )

  // sets active item internally as well as passes it back to parent
  const setActiveItem = useCallback(
    (item: Option, fireOnChange = true) => {
      if (activeItem.name === item.name) {
        return
      }

      setState({
        ...state,
        activeItem: item
      })

      if (fireOnChange) {
        handleOnChange(item)
      }
    },
    [activeItem.name, handleOnChange]
  )

  // controlled default value
  useEffect(() => {
    if (value) {
      setActiveItem(value, false)
    }
  }, [value])

  const handleOpen = () => {
    setState({
      ...state,
      isExpanded: true,
      restoreItem: activeItem
    })
  }

  const handleClose = (restore = false) => {
    const next = restore && restoreItem ? restoreItem : activeItem
    setActiveItem(next, false)
    setState({ ...state, isExpanded: false })
  }

  const handleClick = (e: any) => {
    e.preventDefault()
    if (disabled) return

    if (onClick) {
      onClick()
    }

    if (isExpanded) {
      handleClose()

      if (activeItem.value) {
        handleOnChange(activeItem)
      }
      return
    }

    handleOpen()
  }

  const handleEscapeKey = () => {
    if (!isExpanded && dropdownRef?.current) {
      dropdownRef.current.blur()
      return
    }

    handleClose(true)
  }

  /** Up/Down Arrows */
  const handleArrowKeys = (e: any, key: number) => {
    e.preventDefault()
    if (!isExpanded) {
      handleOpen()

      if (activeItem.value) {
        return
      }
    }

    // Helper Functions
    const getItem = (i: number) => activeItems[i] || {}
    const getNext = (i: number, dir: number) => {
      const exception = dir > 0 ? i === activeItems.length - 1 : i === 0

      if (exception) {
        return getItem(i)
      }

      return getItem(i + dir)
    }

    // Get current index
    const index = activeItems.findIndex((option) => option.value === activeItem.value)
    // If up - else down
    const nextItem = key === 38 ? getNext(index, -1) : getNext(index, 1)

    if (activeItem.name !== nextItem.name) {
      setActiveItem(nextItem, false)
    }
  }

  const handleTab = () => {
    if (selectOnTab && isExpanded && activeItem.value) {
      handleOnChange(activeItem)
    } else if (isExpanded) {
      handleClose(true)
    }
  }

  const handleSearch = (e: any, key: number) => {
    const char = String.fromCharCode(key)
    if (/\w/.test(char)) {
      const item = options.find((option) => option.name.toUpperCase().startsWith(char) && !option.disabled)
      if (item) {
        setActiveItem(item, !isExpanded)
      }
    }
  }

  const handleKeys = (e: any) => {
    const key = e.keyCode || e.which

    switch (key) {
      // Enter/Space
      case 13:
      case 32:
        handleClick(e)
        break
      // Escape
      case 27: {
        handleEscapeKey()
        break
      }
      // Up/Down
      case 38:
      case 40:
        handleArrowKeys(e, key)
        break
      // Tab
      case 9:
        handleTab()
        break
      default: {
        handleSearch(e, key)
      }
    }
  }

  const handleFocus = () => {
    if (!disabled) {
      setState({
        ...state,
        isFocused: true
      })
    }
  }

  const handleBlur = () => {
    setState({
      ...state,
      isFocused: false
    })
    if (isExpanded && closeOnBlur) {
      handleClose(true)
    }
  }

  const handleItemClick = (e: any, item: Option) => {
    setActiveItem(item)
    handleClose()
  }

  const dropdownClass = clsx(
    styles.dropdown,
    styles[`dropdown-${size}`],
    isExpanded && styles['dropdown-visible'],
    disabled && styles.disabled,
    isFocused && 'select-focused'
  )

  return (
    <div
      {...rest}
      className={clsx(styles['dropdown-container'], className)}
      style={{
        ...style,
        ...(width && { width })
      }}
    >
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={dropdownClass}
        id={id}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        onKeyDown={handleKeys}
        ref={dropdownRef}
        tabIndex={0}
        role="button"
      >
        <div className={styles['dropdown-header']}>
          <span data-testid="active-item">{activeItem.name}</span>
          <svg
            className={clsx(styles['dropdown-icon'], isExpanded && styles['dropdown-open'])}
            width="12"
            height="7"
            viewBox="0 0 12 7"
          >
            <path
              fill="none"
              fillRule="evenodd"
              stroke="#2D2926"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M122 23L127.114 28 132 23"
              transform="matrix(1 0 0 -1 -121 29)"
            />
          </svg>
          <fieldset className={clsx(styles.label && styles['has-label'], disabled && styles['fieldset-disabled'])}>
            <legend>
              <span>&#8203;</span>
            </legend>
          </fieldset>
        </div>
        <div className={clsx(styles['dropdown-list-wrapper'], styles[`dropdown-${size}`], listClass)}>
          <div className={clsx(styles['dropdown-list'], menuClass, isExpanded && styles['menu-visible'])}>
            {options.map((option) => (
              <DropdownItem
                key={option.value}
                option={option}
                isActive={option.value === activeItem.value}
                onItemClick={handleItemClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dropdown
