import React from 'react'
import Textarea from './index'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Textarea Component', () => {
  it('should render the className prop', () => {
    const { container } = render(<Textarea className="test-class" />)
    expect(container.querySelector('textarea')?.classList).toContain('test-class')
  })

  it('should render the label and name attribute props correctly', () => {
    const { container, rerender } = render(<Textarea name="test-name" />)
    expect(container.querySelector('textarea')?.getAttribute('name')).toEqual('test-name')
    expect(container.querySelector('.textarea-wrapper label')).not.toBeInTheDocument()

    rerender(<Textarea label="test label name" />)
    expect(container.querySelector('.textarea-wrapper label'))?.toHaveTextContent('test label name')
    expect(container.querySelector('.textarea-wrapper label'))?.not.toHaveAttribute('for')
    expect(container.querySelector('textarea'))?.not.toHaveAttribute('name')

    rerender(<Textarea label="test label name" name="test-name" />)
    expect(container.querySelector('.textarea-wrapper label'))?.toHaveTextContent('test label name')
    expect(container.querySelector('.textarea-wrapper label')?.getAttribute('for')).toEqual('test-name')
    expect(container.querySelector('textarea')?.getAttribute('name')).toEqual('test-name')
  })

  it('should implement the custom styling props correctly', () => {
    const { container } = render(
      <Textarea
        wrapperStyling={{ width: '400px', backgroundColor: 'blue' }}
        style={{ height: '200px', alignItems: 'flex-start' }}
      ></Textarea>
    )
    expect(container.querySelector('.textarea-wrapper'))?.toHaveStyle('width: 400px; background-color: blue')
    expect(container.querySelector('.textarea-wrapper'))?.not.toHaveStyle('align-items: flex-start; height: 200px')
    expect(container.querySelector('textarea'))?.toHaveStyle('align-items: flex-start; height: 200px')
    expect(container.querySelector('textarea'))?.not.toHaveStyle('width: 400px; background-color: blue')
  })

  it('should render the error prop correctly', () => {
    const { container, rerender } = render(<Textarea />)
    expect(container.querySelector('textarea')?.classList).not.toContain('error')

    rerender(<Textarea error />)
    expect(container.querySelector('textarea')?.classList).toContain('error')
  })

  it('should properly handle keyDown and keyUp events', () => {
    const mockKeyDownHandler = jest.fn()
    const mockKeyUpHandler = jest.fn()

    const { container, rerender } = render(<Textarea onKeyDown={mockKeyDownHandler} onKeyUp={mockKeyUpHandler} />)

    fireEvent.keyDown(container.querySelector('textarea')!, { keyCode: 48 })
    expect(mockKeyDownHandler).toHaveBeenCalledTimes(1)
    expect(mockKeyUpHandler).toHaveBeenCalledTimes(0)

    fireEvent.keyUp(container.querySelector('textarea')!, { keyCode: 48 })
    expect(mockKeyDownHandler).toHaveBeenCalledTimes(1)
    expect(mockKeyUpHandler).toHaveBeenCalledTimes(1)

    rerender(<Textarea />)

    container.querySelector('textarea')!.value = 't'
    fireEvent.keyDown(container.querySelector('textarea')!, { keyCode: 48 })
    fireEvent.keyUp(container.querySelector('textarea')!, { keyCode: 48 })
    expect(container.querySelector('textarea')?.style.height).toEqual('-14px')

    container.querySelector('textarea')!.value = ''
    fireEvent.keyDown(container.querySelector('textarea')!, { keyCode: 48 })
    fireEvent.keyUp(container.querySelector('textarea')!, { keyCode: 48 })
    expect(container.querySelector('textarea')?.style.height).toEqual('inherit')
  })

  it('should render the textAreaMessage prop correctly', () => {
    const { container } = render(<Textarea inputMessage="the cake is a lie" />)
    expect(container.querySelector('.footer')).toBeVisible
  })

  it('should display the label animation properly', () => {
    const { container } = render(<Textarea label="howdy" value="hi" />)
    expect(container.querySelector('.textarea')?.classList).toContain('has-value')
  })

  it('should render the character limit correctly', () => {
    render(<Textarea placeholder="Please enter limited characters here" characterLimit={20} />)

    const textarea = screen.getByPlaceholderText('Please enter limited characters here')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveTextContent('')

    // Add text within limit
    userEvent.type(textarea, 'Character count')
    expect(screen.getByTestId('character-count')).toHaveTextContent('5')
    expect(textarea).toHaveTextContent('Character count')

    // Test the character limit
    userEvent.type(textarea, ' limit')
    expect(screen.getByTestId('character-count')).toHaveTextContent('0')
    expect(textarea).toHaveTextContent('Character count limi')
    expect(textarea).not.toHaveTextContent('Character count limit')

    // Clear the text and ensure character count is removed
    userEvent.clear(textarea)
    expect(screen.queryByTestId('character-count')).not.toBeInTheDocument()
    expect(textarea).toHaveTextContent('')
  })
})
