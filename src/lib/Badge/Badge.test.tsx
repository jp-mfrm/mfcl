import React from 'react'
import { render } from '@testing-library/react'

import Badge from './index'

describe('Badge Component', () => {
  it('renders a className', () => {
    const { container } = render(<Badge className={'test'}>Hello</Badge>)
    expect(container.querySelector('.badge')?.classList).toContain('test')
  })

  it('should render the primary badge type', () => {
    const { container } = render(<Badge type="primary">Hello</Badge>)
    expect(container.querySelector('.badge')?.classList).toContain('primary')
  })

  it('should render the secondary badge type', () => {
    const { container } = render(<Badge type="secondary">Hello There</Badge>)
    expect(container.querySelector('.badge')?.classList).toContain('secondary')
  })

  it('should render as a link', () => {
    const { container } = render(<Badge href="/">General Kenobi</Badge>)
    expect(container.querySelector('.badge')?.classList).toContain('link')
  })

  it('should render the width prop correctly', () => {
    const { container } = render(<Badge width="200px">Howdy Partner</Badge>)
    expect(container.querySelector('.badge')?.getAttribute('style')).toContain('width: 200px')
  })

  it('should render the height prop correctly', () => {
    const { container } = render(<Badge height="200px">Howdy Partner</Badge>)
    expect(container.querySelector('.badge')?.getAttribute('style')).toContain('height: 200px')
  })
})
