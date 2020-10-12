import clsx from 'clsx'
import React, { FunctionComponent, forwardRef, CSSProperties } from 'react'

import styles from './slider.module.scss'

// took ideas from https://css-tricks.com/multi-thumb-sliders-general-case/

interface Props {
  value1: number
  value2: number
  onChange: (name: string, value: number) => void
  onChangeCommited?: (name: string, value: number) => void
  max?: number
  min?: number
  labels?: string[]
  width?: string
  /** override styles to wrapper */
  className?: string
  /** override styles to the input ranges */
  rangeClass?: string
  [rest: string]: unknown // give to the input component
}

const Slider: FunctionComponent<Props> = ({
  max = 100,
  min = 0,
  labels = [],
  onChange,
  onChangeCommited,
  value1,
  value2,
  width = '100%',
  className,
  rangeClass,
  ...rest
}) => {
  const inputClasses = clsx(styles.range, rangeClass)
  const values = [value1, value2]
  const diff = max - min
  const tpos = values.map((value, i) => `calc((var(--v${i}) - var(--min)) / ${diff} * ${width})`)
  const fill = tpos.map((value) => `linear-gradient(90deg, red ${value}, transparent 0)`)

  const handleChange = (index: number) => (e: any) => {
    onChange(`value${index}`, Number(e.target.value))
  }

  const handeChangeCommited = (index: number) => (e: any) => {
    if (onChangeCommited) {
      onChangeCommited(`value${index}`, Number(e.target.value))
    }
  }

  const handleLabelClick = (i: number) => () => {
    onChange('value2', i)

    if (onChangeCommited) {
      onChangeCommited('value2', i)
    }
  }

  return (
    <>
      <div
        className={clsx(styles['slider-wrapper'], className)}
        style={
          {
            width,
            '--v0': value1,
            '--v1': value2,
            '--min': min,
            '--fill': fill.join(', ')
          } as CSSProperties
        }
      >
        <input
          className={inputClasses}
          style={{ left: tpos[0] }}
          type="range"
          min={min}
          max={max}
          value={value1}
          onChange={handleChange(1)}
          onMouseUp={handeChangeCommited(1)}
          onTouchEnd={handeChangeCommited(1)}
          {...rest}
        />
        <input
          className={inputClasses}
          style={{ left: tpos[1] }}
          type="range"
          min={min}
          max={max}
          value={value2}
          onChange={handleChange(2)}
          onMouseUp={handeChangeCommited(2)}
          onTouchEnd={handeChangeCommited(2)}
          {...rest}
        />
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
