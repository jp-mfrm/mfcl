import React from 'react'
import { render } from '@testing-library/react'

import Typography from './index'

describe('Typography Component', () => {
  it('renders a custom tag', () => {
    const { container } = render(
      <Typography variant="xs" tag="h1">
        Hello World
      </Typography>
    )
    expect(container.querySelector('.xs')?.outerHTML).toContain('h1')
  })

  it('renders a variant correctly', () => {
    const { container } = render(<Typography variant="xs">Hello World</Typography>)
    expect(container.querySelector('.xs')).toBeInTheDocument
  })

  it('renders a className correctly', () => {
    const { container } = render(
      <Typography variant="xs" className="test-class-name">
        Hello World
      </Typography>
    )
    expect(container.querySelector('.xs')?.classList).toContain('test-class-name')
  })
})
