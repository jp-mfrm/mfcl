/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Drawer from './index'

const children = <span data-testid="yo">Yo</span>

describe('Drawer', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })
  it('should render children', () => {
    const { getByTestId, container } = render(<Drawer isOpen>{children}</Drawer>)
    // @ts-ignore
    fireEvent.click(container.querySelector('.close'))
    expect(getByTestId('yo')?.textContent).toBe('Yo')
  })

  it('should render the className prop correctly', () => {
    const { container } = render(
      <Drawer isOpen className="test-class-name">
        {children}
      </Drawer>
    )
    expect(container.querySelector('.drawer-wrapper')?.classList).toContain('test-class-name')
  })

  it('should render the headerClassName prop correctly', () => {
    const { container } = render(
      <Drawer isOpen headerClassName="test-class-name">
        {children}
      </Drawer>
    )
    expect(container.querySelector('.drawer-header')?.classList).toContain('test-class-name')
  })

  it('should render the bodyClassName prop correctly', () => {
    const { container } = render(
      <Drawer isOpen bodyClassName="test-class-name">
        {children}
      </Drawer>
    )
    expect(container.querySelector('.drawer-body')?.classList).toContain('test-class-name')
  })

  it('should pass closeClassName down', () => {
    const { container } = render(
      <Drawer isOpen closeClassName="test-class-name">
        {children}
      </Drawer>
    )
    expect(container.querySelector('.close')?.classList).toContain('test-class-name')
  })

  it('should pass backdropClassName down', () => {
    const { container } = render(
      <Drawer isOpen backdropClassName="test-class-name">
        {children}
      </Drawer>
    )
    expect(container.querySelector('.drawer-backdrop')?.classList).toContain('test-class-name')
  })

  it('can toggle the backdrop', () => {
    const { container } = render(<Drawer backdrop={false}>{children}</Drawer>)
    expect(container.querySelector('.drawer-backdrop')).toBeNull()
  })

  it('should show close button if passed close', () => {
    const { container, rerender } = render(<Drawer isOpen>{children}</Drawer>)
    expect(container.querySelector('.close')).toBeInTheDocument()

    rerender(
      <Drawer isOpen close={false}>
        {children}
      </Drawer>
    )
    expect(container.querySelector('.close')).toBeNull()
  })

  it('should be empty if not isOpen', () => {
    const { container } = render(<Drawer isOpen={false}>{children}</Drawer>)
    expect(container.querySelector('.drawer')).toBeNull()
  })

  it('should be dismissible by close button click', () => {
    const onClick = jest.fn()
    const { container } = render(
      <Drawer isOpen onClose={onClick}>
        {children}
      </Drawer>
    )
    // @ts-ignore
    fireEvent.click(container.querySelector('.close'))
    jest.runAllTimers()
    expect(onClick).toHaveBeenCalled()
  })

  it('should render different positions', () => {
    const { container, rerender } = render(<Drawer isOpen>{children}</Drawer>)
    expect(container.querySelector('.drawer-wrapper')?.classList).toContain('right')

    rerender(
      <Drawer isOpen position="left">
        {children}
      </Drawer>
    )
    expect(container.querySelector('.drawer-wrapper')?.classList).toContain('left')

    rerender(
      <Drawer isOpen position="top">
        {children}
      </Drawer>
    )
    expect(container.querySelector('.drawer-wrapper')?.classList).toContain('top')

    rerender(
      <Drawer isOpen position="bottom">
        {children}
      </Drawer>
    )
    expect(container.querySelector('.drawer-wrapper')?.classList).toContain('bottom')
  })
})
