import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Rating from './index'

describe('Rating Component', () => {
  const defaultProps = {
    name: 'rating-test',
    value: 2
  }
  it('renders a className', () => {
    const { container } = render(<Rating className="test-class-name" {...defaultProps} />)
    expect(container.querySelector('.root')?.classList).toContain('test-class-name')
  })

  it('should round the value to the provided precision', () => {
    const { container } = render(<Rating {...defaultProps} value={3.9} precision={0.2} />)
    const checkedEl = container.querySelector('input[name="rating-test"]:checked')
    expect(checkedEl?.getAttribute('value')).toBe('4')
  })

  it('should handle mouse hover correctly', () => {
    const { container } = render(<Rating {...defaultProps} />)
    // @ts-ignore
    fireEvent.mouseMove(container.firstChild, {
      clientX: 10
    })

    expect(container.querySelectorAll('.iconEmpty').length).toEqual(0)
    expect(container.querySelectorAll('.iconHover').length).toEqual(5)

    // @ts-ignore
    fireEvent.mouseLeave(container.firstChild)
    expect(container.querySelectorAll('.iconEmpty').length).toEqual(3)
    expect(container.querySelectorAll('.iconHover').length).toEqual(0)
  })

  it('should clear the rating', () => {
    const handleChange = jest.fn()
    const { getByRole } = render(<Rating {...defaultProps} onChange={handleChange} />)

    const input = getByRole('radio', { name: '2 Stars' })
    fireEvent.click(input, {
      clientX: 1
    })

    expect(handleChange).toBeCalled()
  })

  it('should select the rating', () => {
    const handleChange = jest.fn()
    const { container, getByRole } = render(<Rating {...defaultProps} onChange={handleChange} />)

    fireEvent.click(getByRole('radio', { name: '3 Stars' }))

    expect(handleChange).toBeCalledTimes(1)
    const checked = container.querySelector('input[name="rating-test"]:checked')
    expect(checked?.getAttribute('value')).toEqual('2')
  })

  it('should select the empty input if value is null', () => {
    const { container, getByRole } = render(<Rating {...defaultProps} value={null} />)
    const input = getByRole('radio', { name: 'Empty' })
    const checked = container.querySelector('input[name="rating-test"]:checked')
    expect(input).toEqual(checked)
    expect(input.getAttribute('value')).toEqual('')
  })

  it('should support a defaultValue', () => {
    const { container, getByRole } = render(<Rating {...defaultProps} value={undefined} defaultValue={3} />)
    let checked
    checked = container.querySelector('input[name="rating-test"]:checked')
    expect(checked?.getAttribute('value')).toEqual('3')

    fireEvent.click(getByRole('radio', { name: '2 Stars' }))
    checked = container.querySelector('input[name="rating-test"]:checked')
    expect(checked?.getAttribute('value')).toEqual('2')
  })
})
