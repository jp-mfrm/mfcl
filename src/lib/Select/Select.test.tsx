/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react'
import { render } from '@testing-library/react'
import Select from './index'

const children = (
  <>
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
  </>
)

describe('Select', () => {
  it('should pass down the wrapperClass prop', () => {
    const { container } = render(<Select wrapperClass="test">{children}</Select>)
    expect(container.querySelector('.form-group')?.classList).toContain('test')
  })

  it('should pass down the className prop', () => {
    const { container } = render(<Select className="test">{children}</Select>)
    expect(container.querySelector('.form-control')?.classList).toContain('test')
  })

  it('should pass down the size prop', () => {
    const { container } = render(<Select size="sm">{children}</Select>)
    expect(container.querySelector('.form-control')?.classList).toContain('sm')
  })

  it('should render a label', () => {
    const { container } = render(<Select label="Age">{children}</Select>)
    expect(container.querySelector('label')).toBeInTheDocument()
  })
})
