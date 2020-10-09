import clsx from 'clsx'
import React, { FunctionComponent, forwardRef, CSSProperties } from 'react'

import styles from './slider.module.scss'

// took ideas from https://css-tricks.com/multi-thumb-sliders-general-case/

interface Props {
  values: number[]
  onChange?: Function
  max?: number
  min?: number
  labels?: string[]
  width?: string
  /** override styles to wrapper */
  wrapperClass?: string
  [rest: string]: unknown // give to the input component
}

const Slider: FunctionComponent<Props> = forwardRef<HTMLInputElement, Props>(function Select(
  { max = 100, min = 0, labels = [], onChange, step, values, width = '100%', wrapperClass, ...rest },
  ref
) {
  const tpos = values.map((value, i) => `calc((var(--v${i}) - var(--min)) / var(--dif) * calc(${width} - 20px))`)
  const fill = tpos.map((value) => `linear-gradient(90deg, red ${value}, transparent 0)`)
  const hole = tpos.map((value) => `radial-gradient(circle at ${value}, red var(--r), transparent 0)`)

  const labelStyle = { width: `calc(${width} / ${max} - 1%)` }

  const handleChange = (index: number) => (e: any) => {
    if (onChange) {
      const value = e.target.value
      console.log(value)
      const newValues = [...values]
      newValues[index] = Number(value)
      onChange(newValues)
    }
  }

  return (
    <>
      <div
        className={clsx(styles['slider-wrapper'], wrapperClass)}
        style={
          {
            ...Object.fromEntries(values.map((value, i) => [`--v${i}`, value])),
            width,
            '--min': min,
            '--max': max,
            '--fill': fill.join(', '),
            '--hole': hole.join(', ')
          } as CSSProperties
        }
      >
        {values.map((value, i) => (
          <input
            ref={ref}
            key={`${i}-${value}`}
            className={styles.range}
            style={{ left: tpos[i] }}
            type="range"
            min={min}
            max={max}
            defaultValue={value}
            onTouchEnd={handleChange(i)}
            onMouseUp={handleChange(i)}
            // onChange={handleChange(i)}
            {...rest}
          />
        ))}
      </div>
      {labels && (
        <ul className={styles.labels}>
          {labels.map((label, i) => (
            <li
              // onChange
              style={i < labels.length - 1 ? labelStyle : {}}
              key={`${i}-${label}`}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </>
  )
})

export default Slider
