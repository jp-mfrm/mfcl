import Input from './index'
import React from 'react'
import { render } from '@testing-library/react'

describe('Input Component', () => {
  it('should render the different className prop', () => {
    const { container } = render(<Input type="text" inputClass="test-class"></Input>)
    expect(container.querySelector('.input')?.classList).toContain('test-class')
  })

  it('should render the label and name attribute props correctly', () => {
    const { container, rerender } = render(<Input type="text" name="test-name"></Input>)

    expect(container.querySelector('.input')?.getAttribute('name')).toEqual('test-name')
    expect(container.querySelector('.input-wrapper label')).not.toBeInTheDocument()

    rerender(<Input label="test label name"></Input>)

    expect(container.querySelector('.input-wrapper label'))?.toHaveTextContent('test label name')
    expect(container.querySelector('.input-wrapper label'))?.not.toHaveAttribute('for')
    expect(container.querySelector('.input-wrapper input'))?.not.toHaveAttribute('name')

    rerender(<Input label="test label name" name="test-name"></Input>)

    expect(container.querySelector('.input-wrapper label'))?.toHaveTextContent('test label name')
    expect(container.querySelector('.input-wrapper label')?.getAttribute('for')).toEqual('test-name')
    expect(container.querySelector('.input-wrapper input')?.getAttribute('name')).toEqual('test-name')
  })

  it('should render the button properly only when addBtn prop is present', () => {
    const { container, rerender } = render(<Input type="text"></Input>)
    expect(container.querySelector('button')).not.toBeInTheDocument()

    rerender(<Input type="text" addBtn></Input>)
    expect(container.querySelector('button')).toBeInTheDocument()

    rerender(<Input type="text" addBtn btnLabel="Test Label"></Input>)
    expect(container.querySelector('button')?.textContent).toEqual('Test Label')

    rerender(<Input type="text" addBtn btnProps={{ btnType: 'secondary', type: 'submit' }}></Input>)
    expect(container.querySelector('button.secondary')).toBeInTheDocument()
    expect(container.querySelector('button.secondary')?.getAttribute('type')).toEqual('submit')

    rerender(<Input type="text" addBtn></Input>)
    expect(container.querySelector('button.secondary')).not.toBeInTheDocument()
    expect(container.querySelector('button.primary')).toBeInTheDocument()
  })

  it('should render different sizes correctly', () => {
    const { container, rerender } = render(<Input type="text" size="sm"></Input>)
    expect(container.querySelector('.input')?.classList).toContain('sm')
    expect(container.querySelector('.input')?.classList).not.toContain('md')
    expect(container.querySelector('.input')?.classList).not.toContain('lg')

    rerender(<Input type="text" size="md"></Input>)
    expect(container.querySelector('.input')?.classList).not.toContain('sm')
    expect(container.querySelector('.input')?.classList).toContain('md')
    expect(container.querySelector('.input')?.classList).not.toContain('lg')

    rerender(<Input type="text" size="lg"></Input>)
    expect(container.querySelector('.input')?.classList).not.toContain('sm')
    expect(container.querySelector('.input')?.classList).not.toContain('md')
    expect(container.querySelector('.input')?.classList).toContain('lg')
  })

  it('should render the disabled prop correctly', () => {
    const { container, rerender } = render(<Input type="text"></Input>)
    expect(container.querySelector('input')).not.toHaveAttribute('disabled')

    rerender(<Input type="text" disabled></Input>)
    expect(container.querySelector('input')).toHaveAttribute('disabled')

    rerender(<Input type="text" addBtn disabled></Input>)
    expect(container.querySelector('button')).toHaveAttribute('disabled')

    rerender(<Input type="text" addBtn></Input>)
    expect(container.querySelector('button')).not.toHaveAttribute('disabled')
  })

  it('should render the focus prop correctly', () => {
    const { container, rerender } = render(<Input type="text"></Input>)
    expect(container.querySelector('input')?.classList).not.toContain('focus')

    rerender(<Input type="text" focus></Input>)
    expect(container.querySelector('input')?.classList).toContain('focus')
  })

  it('should render the error prop correctly', () => {
    const { container, rerender } = render(<Input type="text"></Input>)
    expect(container.querySelector('input')?.classList).not.toContain('error')

    rerender(<Input type="text" error></Input>)
    expect(container.querySelector('input')?.classList).toContain('error')
  })

  it('should render the inputMessage prop and its alignment correctly', () => {
    const { container, rerender } = render(<Input type="text" inputMessage={{ infoMsg: 'Test message' }}></Input>)
    expect(container.querySelector('.input-wrapper-footer p')?.getAttribute('data-info')).toEqual('true')

    rerender(<Input type="text" inputMessage={{ successMsg: 'Test message' }}></Input>)
    expect(container.querySelector('.input-wrapper-footer p')?.getAttribute('data-success')).toEqual('true')

    rerender(<Input type="text" inputMessage={{ errorMsg: 'Test message' }}></Input>)
    expect(container.querySelector('.input-wrapper-footer p')?.getAttribute('data-error')).toEqual('true')

    rerender(
      <Input
        type="text"
        inputMessage={{ infoMsg: 'Test message', successMsg: 'Test message', errorMsg: 'Test message' }}
      ></Input>
    )
    var footers = container.querySelectorAll('.input-wrapper-footer p')
    expect(footers[0].getAttribute('data-info')).toEqual('true')
    expect(footers[1].getAttribute('data-success')).toEqual('true')
    expect(footers[2].getAttribute('data-error')).toEqual('true')

    rerender(<Input type="text" inputMessage={{ infoMsg: 'Test message', alignment: 'left' }}></Input>)
    expect(container.querySelector('.input-wrapper-footer')?.classList).toContain('left')

    rerender(<Input type="text" inputMessage={{ infoMsg: 'Test message', alignment: 'center' }}></Input>)
    expect(container.querySelector('.input-wrapper-footer')?.classList).toContain('center')

    rerender(<Input type="text" inputMessage={{ infoMsg: 'Test message', alignment: 'right' }}></Input>)
    expect(container.querySelector('.input-wrapper-footer')?.classList).toContain('right')
  })
})
