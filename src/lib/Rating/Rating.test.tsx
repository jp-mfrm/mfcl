import React from 'react'
import { render } from '@testing-library/react'

import Rating from './index'

describe('Rating Component', () => {
  it('renders a className', () => {
    const { container } = render(<Rating className="test-class-name">Click Me</Rating>)
    expect(container.querySelector('rating-wrapper')?.classList).toContain('test-class-name')
  })
})
