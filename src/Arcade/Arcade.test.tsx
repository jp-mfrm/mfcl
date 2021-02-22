import { fireEvent, render } from '@testing-library/react'

import Arcade from './index'
import React from 'react'

describe('Arcade Component', () => {
  it('renders a stage', () => {
    const { container } = render(<Arcade />)
    expect(container.querySelector('.stage')).toBeInTheDocument()
  })

  it('renders a stage', () => {
    const { container } = render(<Arcade mode="sleep-expert" />)
    expect(container.querySelector('.stage')).toBeInTheDocument()
  })

  it('should render jump and drop on classic version', () => {
    const { container } = render(<Arcade />)
    expect(container.querySelector('.stage')).toBeInTheDocument()

    fireEvent.keyDown(container, {
      key: '5',
      code: '5',
      keyCode: 13
    })
  })

  it('should render jump and drop on sleep-expert version', () => {
    const { container } = render(<Arcade mode="sleep-expert" />)
    expect(container.querySelector('.stage')).toBeInTheDocument()

    fireEvent.keyDown(container, {
      key: '5',
      code: '5',
      keyCode: 13
    })
  })
})
