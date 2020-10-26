import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Checkbox from './index'

describe('Checkbox Component', () => {
  it('should render the wrapperClass prop', () => {
    const { container } = render(<Checkbox wrapperClass="test-class" />)
    expect(container.querySelector('.checkbox-container')?.classList).toContain('test-class')
  })
  it('should render the className prop', () => {
    const { container } = render(<Checkbox className="test-class" />)
    const checkbox = container.querySelector('.checkbox')
    expect(checkbox?.classList).toContain('test-class')
    // @ts-ignore
    fireEvent.click(checkbox)
  })
  it('should render the label labelClass prop', () => {
    const label = 'label'
    const { container, getByText } = render(<Checkbox labelClass="test-class" label={label} />)
    expect(container.querySelector('.label')?.classList).toContain('test-class')
    expect(getByText(label)).toBeInTheDocument()
  })
  it('handles onChange', () => {
    let result = false
    const onChange = (e: any, newChecked: boolean) => {
      result = newChecked
    }
    const { container } = render(<Checkbox onChange={onChange} />)
    const checkbox = container.querySelector('.checkbox')
    expect(result).toBe(false)
    // @ts-ignore
    fireEvent.click(checkbox)
    expect(result).toBe(true)
  })
})
