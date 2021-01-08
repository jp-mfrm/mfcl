import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Chip from './index'

describe('Chip Component', () => {
  it('renders all style props', () => {
    const { container } = render(<Chip label="test" className="test-class-name" />)
    expect(container.querySelector('.chip')?.classList).toContain('test-class-name')
  })

  it('renders a label', () => {
    const { getByText } = render(<Chip label="test" />)
    expect(getByText('test')).toBeInTheDocument()
  })

  it('renders the correct size', () => {
    const { container } = render(<Chip label="test" size="sm" />)
    expect(container.querySelector('.chip')?.classList).toContain('sm')
  })

  it('renders the correct variant', () => {
    const { container } = render(<Chip label="test" variant="filled" />)
    // @ts-ignore
    fireEvent.click(chip) // won't delete
    expect(container.querySelector('.chip')?.classList).toContain('filled')
  })

  it('can delete', () => {
    let newLabel = ''
    const onDelete = (label: string) => {
      newLabel = label
    }
    const { container } = render(<Chip label="test" onDelete={onDelete} />)
    const chip = container.querySelector('.chip')
    // @ts-ignore
    fireEvent.click(chip)
    expect(newLabel).toBe('test')
    newLabel = ''
    // @ts-ignore
    fireEvent.keyUp(chip, { key: 'Delete' })
    expect(newLabel).toBe('test')
    newLabel = ''
    // @ts-ignore
    fireEvent.keyUp(chip, { key: 'Backspace' })
    expect(newLabel).toBe('test')
    newLabel = ''
    // @ts-ignore
    fireEvent.keyUp(chip, { key: 'Enter' })
    expect(newLabel).toBe('test')
    // @ts-ignore
    fireEvent.keyUp(chip, { key: 'Escape' })
  })
})
