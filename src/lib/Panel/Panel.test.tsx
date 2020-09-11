import React from 'react'
import { render } from '@testing-library/react'

import Panel from './index'
import PanelItem from '../PanelItem'

describe('Panel Component', () => {
  it('should render the panelClass prop', () => {
    const { container } = render(<Panel panelClass="test-class"></Panel>)
    expect(container.querySelector('.panel')?.classList).toContain('test-class')
  })

  it('should render the rounded variation correctly', () => {
    const { container, rerender } = render(<Panel></Panel>)
    expect(container.querySelector('.panel')?.classList).not.toContain('rounded')

    rerender(<Panel rounded></Panel>)
    expect(container.querySelector('.panel')?.classList).toContain('rounded')
  })

  it('should render the custom inline styling properly', () => {
    const { container } = render(<Panel customStyling={{ width: '400px', backgroundColor: 'blue' }}></Panel>)
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
  it('should render the itemClass prop', () => {
    const { container } = render(<PanelItem itemClass="test-class"></PanelItem>)
    expect(container.querySelector('.panel-item')?.classList).toContain('test-class')
  })

  it('should render the different types properly', () => {
    const { container, rerender } = render(<PanelItem></PanelItem>)
    expect(container.querySelectorAll('.header, .body, .footer, .link').length).toBe(0)

    rerender(<PanelItem type="header"></PanelItem>)
    expect(container.querySelector('.header')).toBeInTheDocument()
    expect(container.querySelectorAll('.body, .footer, .link').length).toBe(0)

    rerender(<PanelItem type="body"></PanelItem>)
    expect(container.querySelector('.body')).toBeInTheDocument()
    expect(container.querySelectorAll('.header, .footer, .link').length).toBe(0)

    rerender(<PanelItem type="footer"></PanelItem>)
    expect(container.querySelector('.footer')).toBeInTheDocument()
    expect(container.querySelectorAll('.header, .body, .link').length).toBe(0)

    rerender(<PanelItem type="link"></PanelItem>)
    expect(container.querySelector('.link')).toBeInTheDocument()
    expect(container.querySelectorAll('.header, .body, .footer').length).toBe(0)
  })

  it('should render the custom inline styling properly', () => {
    const { container } = render(<PanelItem customStyling={{ width: '400px', backgroundColor: 'blue' }}></PanelItem>)
    expect(container.querySelector('.panel-item'))?.toHaveStyle('width: 400px; background-color: blue')
  })
})
