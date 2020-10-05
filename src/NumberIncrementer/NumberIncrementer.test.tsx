import React from 'react'
import { render, fireEvent, getByTestId } from '@testing-library/react'

import NumberIncrementer from './index'

const defaultProps = { name: '', label: '' }

describe('NumberIncrementer Component', () => {
  let mock = jest.fn()
  it('renders a className', () => {
    const { container } = render(<NumberIncrementer {...defaultProps} className="test-class-name" />)
    expect(container.querySelector('.number-incrementer-wrapper')?.classList).toContain('test-class-name')
  })

  it('should click the add button', () => {
    const { getByLabelText, getByTestId } = render(<NumberIncrementer {...defaultProps} name="number" />)
    fireEvent.click(getByLabelText('Add Number'))
    expect(getByTestId('number').getAttribute('value')).toEqual('2')
  })

  it('should click the add button', () => {
    const { getByLabelText, getByTestId } = render(<NumberIncrementer {...defaultProps} name="number" />)
    fireEvent.click(getByLabelText('Subtract Number'))
    expect(getByTestId('number').getAttribute('value')).toEqual('0')
  })

  it('should render the onChange prop correctly on add', () => {
    const { getByLabelText } = render(<NumberIncrementer {...defaultProps} name="number" onChange={mock} />)
    fireEvent.click(getByLabelText('Add Number'))
    expect(mock).toBeCalled
  })

  it('should render the onChange prop correctly on subtract', () => {
    const { getByLabelText } = render(<NumberIncrementer {...defaultProps} name="number" onChange={mock} />)
    fireEvent.click(getByLabelText('Subtract Number'))
    expect(mock).toBeCalled
  })

  it('should display a label', () => {
    const { container } = render(<NumberIncrementer {...defaultProps} label="Quantity" />)
    expect(container.querySelector('.hidden')?.classList).toContain('show-label')
  })

  it('should handle the name prop correctly', () => {
    const { getByTestId, container } = render(<NumberIncrementer {...defaultProps} name="hello" />)
    expect(getByTestId('number').getAttribute('name')).toContain('hello')
  })
})
