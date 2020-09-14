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
    const { getByTestId, getByRole } = render(<Drawer isOpen>{children}</Drawer>)
    // @ts-ignore
      fireEvent.click(getByRole('dialog').querySelector('.close'))
    expect(getByTestId('yo')?.textContent).toBe('Yo')

  })

  it('should render the className prop correctly', () => {
    const { getByRole } = render(
      <Drawer isOpen className="test-class-name">
        {children}
      </Drawer>
    )
    expect(getByRole('dialog')?.classList).toContain('test-class-name')
  })

  it('should render the headerClassName prop correctly', () => {
    const { getByRole } = render(
      <Drawer isOpen headerClassName="test-class-name">
        {children}
      </Drawer>
    )
    expect(getByRole('dialog').querySelector('.drawer-header')?.classList).toContain('test-class-name')
  })

  it('should render the bodyClassName prop correctly', () => {
    const { getByRole } = render(
      <Drawer isOpen bodyClassName="test-class-name">
        {children}
      </Drawer>
    )
    expect(getByRole('dialog').querySelector('.drawer-body')?.classList).toContain('test-class-name')
  })

  it('should pass closeClassName down', () => {
    const { getByRole } = render(
      <Drawer isOpen closeClassName="test-class-name">
        {children}
      </Drawer>
    )
    expect(getByRole('dialog').querySelector('.close')?.classList).toContain('test-class-name')
  })

  it('should pass backdropClassName down', () => {
    const { getByTestId } = render(
      <Drawer isOpen backdropClassName="test-class-name">
        {children}
      </Drawer>
    )
    expect(getByTestId('backdrop')?.classList).toContain('test-class-name')
  })

  it('can toggle the backdrop', () => {
    const { container } = render(<Drawer backdrop={false}>{children}</Drawer>)
    expect(container.querySelector('.drawer-backdrop')).toBeNull()
  })

  it('should show close button if passed close', () => {
    const { getByRole, rerender } = render(<Drawer isOpen>{children}</Drawer>)
    expect(getByRole('dialog').querySelector('.close')).toBeInTheDocument()

    rerender(
      <Drawer isOpen close={false}>
        {children}
      </Drawer>
    )
    expect(getByRole('dialog').querySelector('.close')).toBeNull()
  })

  it('should be empty if not isOpen', () => {
    const { container } = render(<Drawer isOpen={false}>{children}</Drawer>)
    expect(container.querySelector('.drawer')).toBeNull()
  })

  it('should be dismissible by close button click', () => {
    const onClick = jest.fn()
    const { getByRole } = render(
      <Drawer isOpen onClose={onClick}>
        {children}
      </Drawer>
    )
    // @ts-ignore
    fireEvent.click(getByRole('dialog').querySelector('.close'))
    jest.runAllTimers()
    expect(onClick).toHaveBeenCalled()
  })

  it('should render different positions', () => {
    const { getByRole, rerender } = render(<Drawer isOpen>{children}</Drawer>)
    expect(getByRole('dialog')?.classList).toContain('right')

    rerender(
      <Drawer isOpen position="left">
        {children}
      </Drawer>
    )
    expect(getByRole('dialog')?.classList).toContain('left')

    rerender(
      <Drawer isOpen position="top">
        {children}
      </Drawer>
    )
    expect(getByRole('dialog')?.classList).toContain('top')

    rerender(
      <Drawer isOpen position="bottom">
        {children}
      </Drawer>
    )
    expect(getByRole('dialog')?.classList).toContain('bottom')
  })
})
