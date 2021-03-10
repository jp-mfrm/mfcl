import { fireEvent, render } from '@testing-library/react'

import Modal from './index'
import React from 'react'

const children = <div data-testid="yo">Yo</div>

describe('Modal', () => {
  it('should be empty if not isOpen', () => {
    const { container } = render(<Modal>{children}</Modal>)
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

  it('it should render header properly', () => {
    const { rerender, getByText, queryByText, getByRole } = render(
      <Modal isOpen header="Header">
        {children}
      </Modal>
    )

    expect(getByRole('dialog').querySelector('.h4')).toBeInTheDocument()
    expect(getByText('Header')).toBeInTheDocument()

    rerender(<Modal isOpen>{children}</Modal>)

    expect(getByRole('dialog').querySelector('.h4')).not.toBeInTheDocument()
    expect(queryByText('Header')).not.toBeInTheDocument()
  })

  it('it should render subheader properly', () => {
    const { rerender, getByText, queryByText, getByRole } = render(
      <Modal isOpen subheader="Subheader">
        {children}
      </Modal>
    )

    expect(getByRole('dialog').querySelector('.paragraph')).toBeInTheDocument()
    expect(getByText('Subheader')).toBeInTheDocument()

    rerender(<Modal isOpen>{children}</Modal>)

    expect(getByRole('dialog').querySelector('.paragraph')).not.toBeInTheDocument()
    expect(queryByText('Subheader')).not.toBeInTheDocument()
  })

  it('it should align header and subheader in the center', () => {
    const { getByRole } = render(
      <Modal isOpen header="Header" subheader="Subheader">
        {children}
      </Modal>
    )

    expect(getByRole('dialog').querySelector('.h4')?.classList).toContain('center')
    expect(getByRole('dialog').querySelector('.paragraph')?.classList).toContain('center')
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
    fireEvent.keyDown(getByRole('dialog'), { keyCode: 27 })
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
    fireEvent.keyDown(getByRole('dialog').querySelector('.close'), { keyCode: 9 })
    expect(onKeyDown).toHaveBeenCalled()
  })

  it('should render the header/subheader elements', () => {
    const { getByRole } = render(
      <Modal
        isOpen
        header={<div className="custom-header">Basic Modal (Element)</div>}
        subheader={
          <div className="custom-subheader" style={{ marginBottom: '15px' }}>
            Subheader Details (Element)
          </div>
        }
        borderStyle="square"
      ></Modal>
    )

    expect(getByRole('dialog').querySelector('.custom-header')).toBeInTheDocument()
    expect(getByRole('dialog').querySelector('.custom-subheader')).toBeInTheDocument()
  })
})
