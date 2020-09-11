import Input from './index'
import Button from '../Button'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'

describe('Input Component', () => {
  it('should render the className prop', () => {
    const { container } = render(<Input className="test-class" />)
    expect(container.querySelector('.input')?.classList).toContain('test-class')
  })

  it('should render the label and name attribute props correctly', () => {
    const { container, rerender } = render(<Input name="test-name" />)

    expect(container.querySelector('.input')?.getAttribute('name')).toEqual('test-name')
    expect(container.querySelector('.input-wrapper label')).not.toBeInTheDocument()

    rerender(<Input label="test label name" />)

    expect(container.querySelector('.input-wrapper label'))?.toHaveTextContent('test label name')
    expect(container.querySelector('.input-wrapper label'))?.not.toHaveAttribute('for')
    expect(container.querySelector('.input-wrapper input'))?.not.toHaveAttribute('name')

    rerender(<Input label="test label name" disabled name="test-name" />)

    expect(container.querySelector('.input-wrapper label'))?.toHaveTextContent('test label name')
    expect(container.querySelector('.input-wrapper label')?.getAttribute('for')).toEqual('test-name')
    expect(container.querySelector('.input-wrapper input')?.getAttribute('name')).toEqual('test-name')
  })

  it('should render the button properly only when rightSide prop is present', () => {
    const button = <Button>Log Out</Button>

    const { container, rerender } = render(<Input />)
    expect(container.querySelector('button')).not.toBeInTheDocument()

    rerender(<Input rightSide={button} />)
    expect(container.querySelector('button')).toBeInTheDocument()
  })

  it('should render different sizes correctly', () => {
    const { container, rerender } = render(<Input size="sm" />)
    expect(container.querySelector('.input')?.classList).toContain('sm')
    expect(container.querySelector('.input')?.classList).not.toContain('md')
    expect(container.querySelector('.input')?.classList).not.toContain('lg')

    rerender(<Input size="md" />)
    expect(container.querySelector('.input')?.classList).not.toContain('sm')
    expect(container.querySelector('.input')?.classList).toContain('md')
    expect(container.querySelector('.input')?.classList).not.toContain('lg')

    rerender(<Input size="lg" />)
    expect(container.querySelector('.input')?.classList).not.toContain('sm')
    expect(container.querySelector('.input')?.classList).not.toContain('md')
    expect(container.querySelector('.input')?.classList).toContain('lg')
  })

  it('should render the disabled prop correctly', () => {
    const { container, rerender } = render(<Input />)
    expect(container.querySelector('input')).not.toHaveAttribute('disabled')

    rerender(<Input disabled />)
    expect(container.querySelector('input')).toHaveAttribute('disabled')
  })

  it('should render the error prop correctly', () => {
    const { container, rerender } = render(<Input />)
    const input = container.querySelector('input')
    expect(input?.classList).not.toContain('error')

    rerender(<Input error />)
    expect(input?.classList).toContain('error')

    // @ts-ignore
    fireEvent.change(input, { target: { value: 'Bye now' } })
    // @ts-ignore
    expect(input?.value).toBe('Bye now')
  })

  it('should render the inputMessage prop', () => {
    const { container } = render(<Input inputMessage="Test message" />)
    expect(container.querySelector('.footer')).toBeInTheDocument()
  })

  it('should render the error prop', () => {
    const { container } = render(<Input error inputMessage="Test message" />)
    expect(container.querySelector('.error')).toBeInTheDocument()
  })

  it('handles the onChange prop', () => {
    let val = 0
    const onChange = () => {
      val = 1
    }
    const { container } = render(<Input onChange={onChange} />)
    const input = container.querySelector('.input')
    expect(val).toEqual(0)
    // @ts-ignore
    fireEvent.change(input, { target: { value: 'Good Day' } })
    expect(val).toEqual(1)
    // @ts-ignore
    expect(input?.value).toBe('Good Day')
    expect(input?.classList).toContain('has-value')

    // @ts-ignore
    fireEvent.change(input, { target: { value: '' } })
    // @ts-ignore
    expect(input?.value).toBe('')
    expect(input?.classList).not.toContain('has-value')
  })
})
