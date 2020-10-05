import { fireEvent, render } from '@testing-library/react'

import Modal from './index'
import React from 'react'

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
      <Modal isOpen header={{ title: 'Header' }}>
        {children}
      </Modal>
    )
    expect(getByTestId('yo')?.textContent).toBe('Yo')
  })

  it('should render border style properly', () => {
    const { rerender, getByRole } = render(
      <Modal isOpen borderStyle="round">
        {children}
      </Modal>
    )

    expect(getByRole('dialog')?.classList).toContain('round')

    rerender(
      <Modal isOpen borderStyle="square">
        {children}
      </Modal>
    )

    expect(getByRole('dialog')?.classList).toContain('square')

    rerender(<Modal isOpen>{children}</Modal>)

    expect(getByRole('dialog')?.classList).toContain('square')
  })

  it('it should render header properly', () => {
    const { rerender, getByText, queryByText, getByRole } = render(
      <Modal isOpen header={{ title: 'Header' }}>
        {children}
      </Modal>
    )

    expect(getByRole('dialog').querySelector('.h1')).toBeInTheDocument()
    expect(getByText('Header')).toBeInTheDocument()

    rerender(<Modal isOpen>{children}</Modal>)

    expect(getByRole('dialog').querySelector('.h1')).not.toBeInTheDocument()
    expect(queryByText('Header')).not.toBeInTheDocument()
  })

  it('it should render subheader properly', () => {
    const { rerender, getByText, queryByText, getByRole } = render(
      <Modal isOpen subheader={{ title: 'Subheader' }}>
        {children}
      </Modal>
    )

    expect(getByRole('dialog').querySelector('.h2')).toBeInTheDocument()
    expect(getByText('Subheader')).toBeInTheDocument()

    rerender(<Modal isOpen>{children}</Modal>)

    expect(getByRole('dialog').querySelector('.h2')).not.toBeInTheDocument()
    expect(queryByText('Subheader')).not.toBeInTheDocument()
  })

  it('it should align header and subheader properly', () => {
    const { rerender, getByRole } = render(
      <Modal isOpen header={{ title: 'Header' }} subheader={{ title: 'Subheader' }}>
        {children}
      </Modal>
    )

    expect(getByRole('dialog').querySelector('.h1')?.classList).toContain('left')
    expect(getByRole('dialog').querySelector('.h2')?.classList).toContain('left')

    rerender(
      <Modal isOpen header={{ title: 'Header', align: 'center' }} subheader={{ title: 'Subheader', align: 'center' }}>
        {children}
      </Modal>
    )

    expect(getByRole('dialog').querySelector('.h1')?.classList).toContain('center')
    expect(getByRole('dialog').querySelector('.h2')?.classList).toContain('center')

    rerender(
      <Modal isOpen header={{ title: 'Header', align: 'right' }} subheader={{ title: 'Subheader', align: 'right' }}>
        {children}
      </Modal>
    )

    expect(getByRole('dialog').querySelector('.h1')?.classList).toContain('right')
    expect(getByRole('dialog').querySelector('.h2')?.classList).toContain('right')
  })

  it('it should render variations properly', () => {
    const { rerender, getByRole } = render(
      <Modal isOpen header={{ title: 'Header' }} subheader={{ title: 'Subheader' }}>
        {children}
      </Modal>
    )

    expect(getByRole('dialog').querySelector('.h1')).toBeInTheDocument()
    expect(getByRole('dialog').querySelector('.h2')).toBeInTheDocument()

    rerender(
      <Modal
        isOpen
        header={{ title: 'Header', variant: 'h4' }}
        subheader={{ title: 'Subheader', variant: 'paragraph' }}
      >
        {children}
      </Modal>
    )

    expect(getByRole('dialog').querySelector('.h4')).toBeInTheDocument()
    expect(getByRole('dialog').querySelector('.paragraph')).toBeInTheDocument()

    rerender(
      <Modal isOpen header={{ title: 'Header', variant: 'h3' }} subheader={{ title: 'Subheader', variant: 'subtitle' }}>
        {children}
      </Modal>
    )

    expect(getByRole('dialog').querySelector('.h3')).toBeInTheDocument()
    expect(getByRole('dialog').querySelector('.subtitle')).toBeInTheDocument()

    rerender(
      <Modal isOpen header={{ title: 'Header', variant: 'h5' }}>
        {children}
      </Modal>
    )

    expect(getByRole('dialog').querySelector('.h5')).toBeInTheDocument()
  })

  it('it should render variations and alignment properly', () => {
    const { rerender, getByRole } = render(
      <Modal isOpen header={{ title: 'Header' }} subheader={{ title: 'Subheader' }}>
        {children}
      </Modal>
    )

    expect(getByRole('dialog').querySelector('.h1')).toBeInTheDocument()
    expect(getByRole('dialog').querySelector('.h2')).toBeInTheDocument()
    expect(getByRole('dialog').querySelector('.h1')?.classList).toContain('left')
    expect(getByRole('dialog').querySelector('.h2')?.classList).toContain('left')

    rerender(
      <Modal
        isOpen
        header={{ title: 'Header', align: 'right', variant: 'h4' }}
        subheader={{ title: 'Subheader', align: 'right', variant: 'paragraph' }}
      >
        {children}
      </Modal>
    )

    expect(getByRole('dialog').querySelector('.h4')).toBeInTheDocument()
    expect(getByRole('dialog').querySelector('.paragraph')).toBeInTheDocument()
    expect(getByRole('dialog').querySelector('.h4')?.classList).toContain('right')
    expect(getByRole('dialog').querySelector('.paragraph')?.classList).toContain('right')
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
})
