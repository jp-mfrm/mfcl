import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Modal from './index'

const children = <div data-testid="yo">Yo</div>

describe('Modal', () => {
  it('should be empty if not isOpen', () => {
    const { container } = render(<Modal isOpen={false}>{children}</Modal>)
    expect(container.querySelector('.modal')).toBeNull()
  })

  it('should open if isOpen', () => {
    const { getByRole } = render(<Modal isOpen>{children}</Modal>)
    expect(getByRole('dialog').querySelector('.close')).toBeInTheDocument()
  })

  it('should render children', () => {
    const { getByTestId } = render(
      <Modal isOpen header="Header">
        {children}
      </Modal>
    )
    expect(getByTestId('yo')?.textContent).toBe('Yo')
  })

  it('it should render a header', () => {
    const { getByText } = render(
      <Modal isOpen header="Header">
        {children}
      </Modal>
    )
    expect(getByText('Header')).toBeInTheDocument()
  })

  it('it should render close button', () => {
    const { getByRole, container } = render(<Modal isOpen>{children}</Modal>)
    expect(getByRole('dialog').querySelector('.close')).toBeInTheDocument()
  })

  it('should be dismissible by close button click', () => {
    const onClick = jest.fn()
    const { getByRole } = render(
      <Modal isOpen onClose={onClick}>
        {children}
      </Modal>
    )
    // @ts-ignore
    fireEvent.click(getByRole('dialog').querySelector('.close'))
    expect(onClick).toHaveBeenCalled()
  })

  it('should close on esc key', () => {
    const onKeyDown = jest.fn()
    const { getByRole } = render(
      <Modal isOpen onKeyDown={onKeyDown}>
        {children}
      </Modal> 
    )
     // @ts-ignore
     fireEvent.keyDown(getByRole('dialog'), { keyCode: 27})
     expect(onKeyDown).toHaveBeenCalled()
  })

  it('should handle tab key to move focus', () => {
    const onKeyDown = jest.fn()
    const { getByRole } = render(
      <Modal isOpen onKeyDown={onKeyDown}>
        {children}
      </Modal> 
    )
     // @ts-ignore
    fireEvent.keyDown(getByRole('dialog').querySelector('.close'), { keyCode: 9})
    expect(onKeyDown).toHaveBeenCalled()
  })


})
