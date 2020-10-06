import React, { ReactNode, FunctionComponent, useState, useRef } from 'react'
import clsx from 'clsx'
import Star from '../Icons/Star'
import styles from './rating.module.scss'

import useControlled from '../utils/useControlled'
import useIsFocusVisible from '../utils/useIsFocusVisible'
import useId from '../utils/useId'

// code idea from https://github.com/mui-org/material-ui/blob/next/packages/material-ui-lab/src/Rating/Rating.js

function clamp(value: number, min: number, max: number) {
  if (value < min) {
    return min
  }
  if (value > max) {
    return max
  }
  return value
}

function getDecimalPrecision(num: number) {
  const decimalPart = num.toString().split('.')[1]
  return decimalPart ? decimalPart.length : 0
}

function roundValueToPrecision(value: number, precision: number) {
  if (value == null) {
    return value
  }

  const nearest = Math.round(value / precision) * precision
  return Number(nearest.toFixed(getDecimalPrecision(precision)))
}

function defaultLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}`
}

interface Props {
  /**
   * The name attribute of the radio `input` elements.
   * If `readOnly` is false, the prop is required,
   * this input name`should be unique within the parent form.
   */
  name: string
  /** The rating value. */
  value?: number | null
  /** Override styles of wrapper */
  className?: string
  /** The default value. Use when the component is not controlled. */
  defaultValue?: number
  /** If true, the rating will be disabled. */
  disabled?: boolean
  /** The label read when the rating input is empty. */
  emptyLabelText?: ReactNode
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.
   *
   * @param {number} value The rating label's value to format.
   * @returns {string}
   */
  getLabelText?: (value: number) => string
  /** Maximum rating. */
  max?: number
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChange?: (event: any, value: number | null) => void
  /**
   * Callback function that is fired when the hover state changes.
   *
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChangeActive?: (event: any, value: number) => void
  /** Callback given onMouseLeave */
  onMouseLeave?: (event: any) => void
  /** Callback given onMouseMove */
  onMouseMove?: (event: any) => void
  /** The minimum increment value change allowed. Should be above 0.1 */
  precision?: number
  /** Removes all hover effects and pointer events. */
  readOnly?: boolean
  /** The size of the rating.*/
  size?: 'lg' | 'md' | 'sm'
}

const Rating: FunctionComponent<Props> = ({
  className = '',
  defaultValue = null,
  disabled = false,
  emptyLabelText = 'Empty',
  getLabelText = defaultLabelText,
  max = 5,
  name: nameProp,
  onChange,
  onChangeActive,
  onMouseLeave,
  onMouseMove,
  precision = 1,
  readOnly = false,
  size = 'md',
  value: valueProp,
  ...other
}) => {
  const name = useId(nameProp)

  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    defaultValue
  })

  const valueRounded = roundValueToPrecision(valueDerived, precision)
  const [{ hover, focus }, setState] = useState({
    hover: -1,
    focus: -1
  })

  let value = valueRounded
  if (hover !== -1) {
    value = hover
  }
  if (focus !== -1) {
    value = focus
  }

  const { isFocusVisibleRef, onBlur: handleBlurVisible, onFocus: handleFocusVisible } = useIsFocusVisible()
  const [focusVisible, setFocusVisible] = useState(false)

  const rootRef = useRef()

  const handleMouseMove = (event: any) => {
    if (onMouseMove) {
      onMouseMove(event)
    }

    const rootNode = rootRef.current

    if (!rootNode) {
      return
    }
    // @ts-ignore
    const { left } = rootNode.getBoundingClientRect()
    // @ts-ignore
    const { width } = rootNode.firstChild.getBoundingClientRect()
    const percent = (event.clientX - left) / (width * max)

    let newHover = roundValueToPrecision(max * percent + precision / 2, precision)
    newHover = clamp(newHover, precision, max)

    setState((prev) =>
      prev.hover === newHover && prev.focus === newHover
        ? prev
        : {
            hover: newHover,
            focus: newHover
          }
    )

    setFocusVisible(false)

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover)
    }
  }

  const handleMouseLeave = (event: any) => {
    if (onMouseLeave) {
      onMouseLeave(event)
    }

    const newHover = -1
    setState({
      hover: newHover,
      focus: newHover
    })

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover)
    }
  }

  const handleChange = (event: any) => {
    const newValue = parseFloat(event.target.value)

    setValueState(newValue)

    if (onChange) {
      onChange(event, newValue)
    }
  }

  const handleSameStarClick = (event: any) => {
    // Ignore keyboard events
    // https://github.com/facebook/react/issues/7407
    if (event.clientX === 0 && event.clientY === 0) {
      return
    }

    handleClear(event)
  }

  const handleSameStarKey = (event: any) => {
    const key = event.keyCode || event.which
    if (key === 13) {
      handleClear(event)
    }
  }

  const handleClear = (event: any) => {
    setState({
      hover: -1,
      focus: -1
    })

    setValueState(null)

    if (onChange && parseFloat(event.target.value) === valueRounded) {
      onChange(event, null)
    }
  }

  const handleFocus = (event: any) => {
    handleFocusVisible(event)
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true)
    }

    const newFocus = parseFloat(event.target.value)
    setState((prev) => ({
      hover: prev.hover,
      focus: newFocus
    }))

    if (onChangeActive && focus !== newFocus) {
      onChangeActive(event, newFocus)
    }
  }

  const handleBlur = (event: any) => {
    if (hover !== -1) {
      return
    }

    handleBlurVisible()
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false)
    }

    const newFocus = -1
    setState((prev) => ({
      hover: prev.hover,
      focus: newFocus
    }))

    if (onChangeActive && focus !== newFocus) {
      onChangeActive(event, newFocus)
    }
  }

  const item = (state: any, labelProps = {}) => {
    const id = `${name}-${String(state.value).replace('.', '-')}`
    const container = (
      <span
        className={clsx(styles.icon, {
          [styles.iconEmpty]: !state.filled,
          [styles.iconActive]: state.active,
          [styles.iconHover]: state.hover,
          [styles.iconFocus]: state.focus
        })}
      >
        <Star />
      </span>
    )

    if (readOnly) {
      return (
        <span key={state.value} {...labelProps}>
          {container}
        </span>
      )
    }

    return (
      <React.Fragment key={state.value}>
        <label className={styles.label} htmlFor={id} {...labelProps}>
          {container}
          <span className={styles.visuallyHidden}>{getLabelText(state.value)}</span>
        </label>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onClick={handleSameStarClick}
          onKeyPress={handleSameStarKey}
          disabled={disabled}
          value={state.value}
          id={id}
          type="radio"
          name={name}
          checked={state.checked}
          className={styles.visuallyHidden}
        />
      </React.Fragment>
    )
  }

  return (
    <span
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // @ts-ignore
      ref={rootRef}
      className={clsx(
        styles.root,
        {
          [styles[`size-${size}`]]: size !== 'md',
          [styles.disabled]: disabled,
          [styles.focusVisible]: focusVisible,
          [styles.readOnly]: readOnly
        },
        className
      )}
      role={readOnly ? 'img' : undefined}
      aria-label={readOnly ? getLabelText(value) : undefined}
      {...other}
    >
      {Array.from(new Array(max)).map((_, index) => {
        const itemValue = index + 1

        if (precision < 1) {
          const items = Array.from(new Array(1 / precision))
          return (
            <span
              key={itemValue}
              className={clsx(styles.decimal, {
                [styles.iconActive]: itemValue === Math.ceil(value) && (hover !== -1 || focus !== -1)
              })}
            >
              {items.map(($, indexDecimal) => {
                const itemDecimalValue = roundValueToPrecision(
                  itemValue - 1 + (indexDecimal + 1) * precision,
                  precision
                )

                return item(
                  {
                    value: itemDecimalValue,
                    filled: itemDecimalValue <= value,
                    hover: itemDecimalValue <= hover,
                    focus: itemDecimalValue <= focus,
                    checked: itemDecimalValue === valueRounded
                  },
                  {
                    style:
                      items.length - 1 === indexDecimal
                        ? {}
                        : {
                            width: itemDecimalValue === value ? `${(indexDecimal + 1) * precision * 100}%` : '0%',
                            overflow: 'hidden',
                            zIndex: 1,
                            position: 'absolute'
                          }
                  }
                )
              })}
            </span>
          )
        }

        return item({
          value: itemValue,
          active: itemValue === value && (hover !== -1 || focus !== -1),
          filled: itemValue <= value,
          hover: itemValue <= hover,
          focus: itemValue <= focus,
          checked: itemValue === valueRounded
        })
      })}
      {!readOnly && !disabled && valueRounded == null && (
        <>
          <input
            value=""
            id={`${name}-empty`}
            type="radio"
            name={name}
            defaultChecked
            className={styles.visuallyHidden}
          />
          <label className={styles.pristine} htmlFor={`${name}-empty`}>
            <span className={styles.visuallyHidden}>{emptyLabelText}</span>
          </label>
        </>
      )}
    </span>
  )
}

export default Rating
