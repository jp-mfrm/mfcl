import React from 'react'
import Skeleton from './index'
import { render } from '@testing-library/react'

describe('Skeleton Component', () => {
  it('renders the appropriate skeleton type', () => {
    const { container, rerender } = render(<Skeleton />)
    expect(container.querySelector('.text')).toBeInTheDocument()
    expect(container.querySelector('.image')).not.toBeInTheDocument()
    expect(container.querySelector('.button')).not.toBeInTheDocument()
    expect(container.querySelector('.button-secondary')).not.toBeInTheDocument()

    rerender(<Skeleton type="image" />)
    expect(container.querySelector('.text')).not.toBeInTheDocument()
    expect(container.querySelector('.image')).toBeInTheDocument()
    expect(container.querySelector('.button')).not.toBeInTheDocument()
    expect(container.querySelector('.button-secondary')).not.toBeInTheDocument()

    rerender(<Skeleton type="button" />)
    expect(container.querySelector('.text')).not.toBeInTheDocument()
    expect(container.querySelector('.image')).not.toBeInTheDocument()
    expect(container.querySelector('.button')).toBeInTheDocument()
    expect(container.querySelector('.button-secondary')).not.toBeInTheDocument()

    rerender(<Skeleton type="button-secondary" />)
    expect(container.querySelector('.text')).not.toBeInTheDocument()
    expect(container.querySelector('.image')).not.toBeInTheDocument()
    expect(container.querySelector('.button')).toBeInTheDocument()
    expect(container.querySelector('.button-secondary')).toBeInTheDocument()
  })

  it('renders a circle skeleton', () => {
    const { container } = render(<Skeleton circle />)
    expect(container.querySelector('.circle')).toBeInTheDocument()
  })
})
