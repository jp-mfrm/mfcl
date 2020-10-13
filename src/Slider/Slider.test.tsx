import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Slider from './index'

const defaultProps = {
  values: [0, 2],
  onChange: (numbers: number[]) => {}
}

describe('Slider Component', () => {
  it('renders a className', () => {
    const { container } = render(<Slider {...defaultProps} className="test-class-name" />)
    expect(container.querySelector('.slider-wrapper')?.classList).toContain('test-class-name')
  })

  it('renders the rangeClassProp', () => {
    const { container } = render(<Slider {...defaultProps} rangeClass="test-class-name" />)
    expect(container.querySelector('.range')?.classList).toContain('test-class-name')
  })

  it('renders the width prop', () => {
    const { container } = render(<Slider {...defaultProps} width={'250px'} />)
    expect(container.querySelector('.slider-wrapper')).toHaveStyle('width: 250px')
  })

  it('renders the max/min prop', () => {
    const { container } = render(<Slider {...defaultProps} max={100} min={10} values={[10, 100]} />)
    expect(container.querySelector('.range')?.getAttribute('max')).toBe('100')
    expect(container.querySelector('.range')?.getAttribute('min')).toBe('10')
  })

  it('renders the labels prop', () => {
    const { container } = render(<Slider {...defaultProps} labels={['0', '1', '2', '3', '4']} />)
    expect(container.querySelector('.upper-label')).toBeInTheDocument()
    expect(container.querySelectorAll('.upper-label')[2]?.classList).toContain('active-label')
    expect(container.querySelectorAll('.labels').length).toEqual(2)
    // @ts-ignore
    fireEvent.click(container.querySelectorAll('li')[1])
    // @ts-ignore
    fireEvent.mouseUp(container.querySelector('.range'), { target: { value: 3 } })
  })

  it('renders the onChange/onChangeCommited prop', () => {
    let values = [2, 4]
    const onChangeCommited = (newValues: number[]) => {
      values = newValues
    }
    const onChange = (newValues: number[]) => {
      values = newValues
    }

    const { container } = render(
      <Slider
        values={values}
        labels={['0', '1', '2', '3', '4']}
        onChangeCommited={onChangeCommited}
        onChange={onChange}
      />
    )

    const range = container.querySelector('.range')

    // @ts-ignore
    fireEvent.change(range, { target: { value: 1 } })
    expect(values).toEqual([1, 4])

    // @ts-ignore
    fireEvent.click(container.querySelectorAll('li')[3])
    expect(values).toEqual([2, 3])

    // @ts-ignore
    fireEvent.mouseUp(range, { target: { value: 3 } })
    expect(values).toEqual([3, 4])

    // @ts-ignore
    fireEvent.touchEnd(range, { target: { value: 4 } })
    expect(values).toEqual([4, 4])
  })
})
