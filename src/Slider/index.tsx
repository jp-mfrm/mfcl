import clsx from 'clsx'
import React, { FunctionComponent, forwardRef, CSSProperties } from 'react'

import styles from './slider.module.scss'

// took ideas from https://css-tricks.com/multi-thumb-sliders-general-case/

interface Props {
  /** the index value on the slide scale. Multiple values mean multiple thumb sliders */
  values: number[]
  /** callback for every step touched */
  onChange: (value: number[]) => void
  /** callback once the user is done sliding */
  onChangeCommited?: (value: number[]) => void
  /** maximum step value allowed */
  max?: number
  /** minimum step value allowed */
  min?: number
  /** labels will appear at the bottom and top */
  labels?: string[]
  /* set a width of the range input */
  width?: string
  /** override styles to wrapper */
  className?: string
  /** override styles to the input ranges */
  rangeClass?: string
  [rest: string]: unknown // give to the input component
}

const Slider: FunctionComponent<Props> = ({
  max = 5,
  min = 0,
  labels = [],
  onChange,
  onChangeCommited,
  values,
  width = '100%',
  className,
  rangeClass,
  ...rest
}) => {
  const inputClasses = clsx(styles.range, rangeClass)
  const diff = max - min
  const tpos = values.map((value, i) => `calc((var(--v${i}) - var(--min)) / ${diff} * ${width})`)
  const fill = tpos.map((value) => `linear-gradient(90deg, red ${value}, transparent 0)`)

  const handleChange = (index: number) => (e: any) => {
    const newValues = [...values]
    newValues[index] = Number(e.target.value)
    onChange(newValues)
  }

  const handeChangeCommited = (index: number) => (e: any) => {
    if (onChangeCommited) {
      const newValues = [...values]
      newValues[index] = Number(e.target.value)
      onChangeCommited(newValues)
    }
  }

  const handleLabelClick = (index: number) => () => {
    const newValues = [...values]
    newValues[newValues.length - 1] = index
    onChange(newValues)

    if (onChangeCommited) {
      onChangeCommited(newValues)
    }
  }

  return (
    <>
      {labels && (
        <div className={styles.labels}>
          {labels.map((label, i) => {
            const activeLabel = values.includes(i)
            return (
              <div
                key={`${i}-${label}`}
                aria-hidden={!activeLabel}
                className={clsx(styles['upper-label'], activeLabel && styles['active-label'])}
              >
                {i === 0 && '<'}
                {label}
              </div>
            )
          })}
        </div>
      )}
      <div
        className={clsx(styles['slider-wrapper'], className)}
        style={
          {
            width,
            ...Object.fromEntries(values.map((value, i) => [`--v${i}`, value])),
            '--min': min,
            '--fill': fill.join(', ')
          } as CSSProperties
        }
      >
        {values.map((value, i) => (
          <input
            className={inputClasses}
            key={i}
            style={{ left: tpos[i] }}
            type="range"
            tabIndex={0}
            min={min}
            max={max}
            value={value}
            onChange={handleChange(i)}
            onMouseUp={handeChangeCommited(i)}
            onTouchEnd={handeChangeCommited(i)}
            {...rest}
          />
        ))}
      </div>
      {labels && (
        <ul className={styles.labels}>
          {labels.map((label, i) => (
            <li onClick={handleLabelClick(i)} key={`${i}-${label}`}>
              {label}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Slider
