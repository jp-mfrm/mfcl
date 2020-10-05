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

  it('should render the height prop correctly', () => {
    const { container } = render(<Badge style={{ height: '200px', width: '200px' }}>Howdy Partner</Badge>)
    const badge = container.querySelector('.badge')
    expect(badge?.getAttribute('style')).toContain('height: 200px')
    expect(badge?.getAttribute('style')).toContain('width: 200px')
  })
})
