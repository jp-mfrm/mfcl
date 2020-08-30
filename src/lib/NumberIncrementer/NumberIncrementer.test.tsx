import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import NumberIncrementer from './index'

describe('NumberIncrementer Component', () => {
  it('renders a className', () => {
    const { container } = render(<NumberIncrementer className="test-class-name">Click Me</NumberIncrementer>)
    expect(container.querySelector('.number-incrementer-wrapper')?.classList).toContain('test-class-name')
  })

  it('should click the add button', () => {
    const { getByTestId } = render(<NumberIncrementer />)
    fireEvent.click(getByTestId('add'))
    expect(getByTestId('number').textContent).toContain(2)
  })

  it('should click the subtract button', () => {
    const { getByTestId } = render(<NumberIncrementer />)
    fireEvent.click(getByTestId('subtract'))
    expect(getByTestId('number').textContent).toContain(0)
  })
})
