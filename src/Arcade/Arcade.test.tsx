import Arcade from './index'
import React from 'react'
import { render } from '@testing-library/react'

describe('Arcade Component', () => {
  it('renders a className', () => {
    const { container } = render(<Arcade />)
    expect(container.querySelector('.stage')).toBeInTheDocument()
  })
})
