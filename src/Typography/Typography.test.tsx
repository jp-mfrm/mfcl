import React from 'react'
import { render } from '@testing-library/react'

import Typography from './index'

describe('Typography Component', () => {
  it('renders a custom tag', () => {
    const { container } = render(
      <Typography variant="h3" tag="h1">
        Hello World
      </Typography>
    )
    expect(container.querySelector('.h3')?.outerHTML).toContain('h1')
  })

  it('renders a variant correctly', () => {
    const { container } = render(<Typography variant="h3">Hello World</Typography>)
    expect(container.querySelector('.h3')).toBeInTheDocument
  })

  it('renders the align prop correctly', () => {
    const { container } = render(
      <Typography variant="h3" align="center">
        Hello World
      </Typography>
    )
    expect(container.querySelector('.h3')?.classList).toContain('center')
  })

  it('renders the noWrap prop correctly', () => {
    const { container } = render(
      <Typography variant="h3" noWrap>
        Hello World
      </Typography>
    )
    expect(container.querySelector('.h3')?.classList).toContain('noWrap')
  })

  it('renders a className correctly', () => {
    const { container } = render(
      <Typography variant="h3" className="test-class-name">
        Hello World
      </Typography>
    )
    expect(container.querySelector('.h3')?.classList).toContain('test-class-name')
  })

  it('renders the color prop correctly', () => {
    const { container } = render(
      <Typography variant="h3" color="alert">
        Hello World
      </Typography>
    )
    expect(container.querySelector('.h3')?.classList).toContain('alert')
  })
})
