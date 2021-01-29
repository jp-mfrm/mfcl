import React from 'react'
import { render } from '@testing-library/react'

import Panel from './index'
import PanelItem from '../PanelItem'

describe('Panel Component', () => {
  it('should render the className prop', () => {
    const { container } = render(<Panel className="test-class" />)
    expect(container.querySelector('.panel')?.classList).toContain('test-class')
  })

  it('should render the rounded variation correctly', () => {
    const { container, rerender } = render(<Panel />)
    expect(container.querySelector('.panel')?.classList).not.toContain('rounded')

    rerender(<Panel rounded />)
    expect(container.querySelector('.panel')?.classList).toContain('rounded')
  })

  it('should render the custom inline styling properly', () => {
    const { container } = render(<Panel style={{ width: '400px', backgroundColor: 'blue' }} />)
    expect(container.querySelector('.panel'))?.toHaveStyle('width: 400px; background-color: blue')
  })

  it('should render valid children elements', () => {
    const { container } = render(
      <Panel>
        <div>This is valid</div>
      </Panel>
    )
    expect(container.querySelector('.panel div'))?.toBeInTheDocument()
  })

  it('should not render invalid children elements', () => {
    const { container } = render(<Panel>This is invalid</Panel>)
    expect(container.querySelector('.panel'))?.not.toHaveTextContent('This is invalid')
  })
})

describe('PanelItem Component', () => {
  it('should render the className prop', () => {
    const { container } = render(<PanelItem className="test-class" name="panel" />)
    expect(container.querySelector('.panel-item')?.classList).toContain('test-class')
  })

  it('should render the different types properly', () => {
    const { container, rerender } = render(<PanelItem name="panel" />)
    expect(container.querySelectorAll('.header, .body, .footer, .link').length).toBe(0)

    rerender(<PanelItem type="header" name="panel" />)
    expect(container.querySelector('.header')).toBeInTheDocument()
    expect(container.querySelectorAll('.body, .footer, .link').length).toBe(0)

    rerender(<PanelItem type="body" name="panel" />)
    expect(container.querySelector('.body')).toBeInTheDocument()
    expect(container.querySelectorAll('.header, .footer, .link').length).toBe(0)

    rerender(<PanelItem type="footer" name="panel" />)
    expect(container.querySelector('.footer')).toBeInTheDocument()
    expect(container.querySelectorAll('.header, .body, .link').length).toBe(0)

    rerender(<PanelItem type="link" name="panel" />)
    expect(container.querySelector('.link')).toBeInTheDocument()
    expect(container.querySelectorAll('.header, .body, .footer').length).toBe(0)
  })

  it('should render the custom inline styling properly', () => {
    const { container } = render(<PanelItem name="panel" style={{ width: '400px', backgroundColor: 'blue' }} />)
    expect(container.querySelector('.panel-item'))?.toHaveStyle('width: 400px; background-color: blue')
  })
})
