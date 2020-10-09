import clsx from 'clsx'
import React, { FunctionComponent, forwardRef, CSSProperties } from 'react'

import styles from './slider.module.scss'

// took ideas from https://css-tricks.com/multi-thumb-sliders-general-case/

interface Props {
  onChange?: Function
  max?: number
  min?: number
  values: number[]
  /** override styles to wrapper */
  wrapperClass?: string
  [rest: string]: unknown // give to the input component
}

const Slider: FunctionComponent<Props> = forwardRef<HTMLInputElement, Props>(function Select(
  { max = 100, min = 0, onChange, step, values, wrapperClass, ...rest },
  ref
) {
  const tpos = values.map((value, i) => `calc((var(--v${i}) - var(--min)) / var(--dif) * calc(100% - 20px))`)

  const fill = tpos.map((value) => `linear-gradient(90deg, red ${value}, transparent 0)`)
  const hole = tpos.map((value) => `radial-gradient(circle at ${value}, red var(--r), transparent 0)`)
  console.log(values)

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
    <div
      className={clsx(styles['slider-wrapper'], wrapperClass)}
      style={
        {
          ...Object.fromEntries(values.map((value, i) => [`--v${i}`, value])),
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
          value={value}
          // onTouchEnd={handleChange(i)}
          // onMouseUp={handleChange(i)}
          onChange={handleChange(i)}
          {...rest}
        />
      ))}
    </div>
  )
})

export default Slider
