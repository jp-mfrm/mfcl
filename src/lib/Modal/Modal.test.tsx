import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from './index';

const children = <div data-testid="yo">Yo</div>

describe('Modal', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('should be empty if not isOpen', () => {
    const { container } = render(<Modal isOpen={false}>{children}</Modal>)
    expect(container.querySelector('.modal')).toBeNull()
  })

  // it('should open if isOpen', () => {
  //   const { container } = render(<Modal isOpen>{children}</Modal>)
  //   expect(container.querySelector('.modal')).toBeInTheDocument()
  // })

  it('should render children', () => {
    const { getByTestId } = render(<Modal isOpen header='Header'>{children}</Modal>)
    expect(getByTestId('yo')?.textContent).toBe('Yo')
  })

  it('it should render a header', () => {
    const { getByText } = render(<Modal isOpen header='Header'>{children}</Modal>)
    expect(getByText('Header')).toBeInTheDocument()
  })

  it('it should render close button', () => {
    const { getByTestId, container } = render(<Modal isOpen>{children}</Modal>)
    expect(getByTestId('closeBtn').querySelector('.close')).toBeInTheDocument();
  })

  it('should be dismissible by close button click', () => {
    const onClick = jest.fn()
    const { getByTestId, container } = render(
      <Modal isOpen onClose={onClick}>
        {children}
      </Modal>
    )
    // @ts-ignore
    fireEvent.click(getByTestId('closeBtn').querySelector('.close'))
    jest.runAllTimers()
    expect(onClick).toHaveBeenCalled()
  })

});
