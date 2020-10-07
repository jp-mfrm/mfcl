import React from 'react'
import { render } from '@testing-library/react'

import Breadcrumbs from './index'

describe('Breadcrumbs Component', () => {
  it('renders a className', () => {
    const { container } = render(
      <Breadcrumbs className="test-class-name">
        <a href="/">one</a>
        <a href="/">two</a>
      </Breadcrumbs>
    )
    expect(container.querySelector('.test-class-name')).toBeInTheDocument()
    expect(container.querySelector('nav')).toBeInTheDocument()
  })

  it('renders separators correctly', () => {
    const { container } = render(
      <Breadcrumbs separator="*">
        <a href="/">one</a>
        <a href="/">two</a>
        <a href="/">three</a>
      </Breadcrumbs>
    )
    const wrapper = container.querySelector('ol')
    expect(wrapper?.children.length).toBe(5)
    expect(wrapper?.children[1].innerHTML).toBe('*')
    expect(wrapper?.children[2].innerHTML).toBe('<a href="/">two</a>')
  })
})
