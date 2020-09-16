import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Pagination from './index'
import { get } from 'http'

let defaultProps = {
  totalPages: 5
}

describe('Pagination Component', () => {
  let mock = jest.fn()
  it('renders a className', () => {
    const { container } = render(
      <Pagination {...defaultProps} className="test-class-name">
        Click Me
      </Pagination>
    )
    expect(container.querySelector('.pagination-wrapper')?.classList).toContain('test-class-name')
  })

  it('renders the totalPages prop', () => {
    const { container } = render(<Pagination {...defaultProps} />)
    expect(container.querySelector('.button-wrapper')?.textContent?.length).toBe(5)
  })

  it('renders the activePage prop', () => {
    const { container } = render(<Pagination {...defaultProps} activePage={1} />)
    expect(container.querySelector('.button-wrapper > .button')?.classList).toContain('active')
  })

  it('clicks the correct button and sets the correct page', () => {
    const { getByLabelText } = render(<Pagination {...defaultProps} />)
    fireEvent.click(getByLabelText('Page 2'))
    expect(mock).toBeCalled
  })

  it('clicks the next arrow and sets the correct page', () => {
    const { getByLabelText } = render(<Pagination {...defaultProps} activePage={1} />)
    fireEvent.click(getByLabelText('Next'))
    expect(mock).toBeCalled
  })

  it('does not render the next arrow', () => {
    const { getByLabelText } = render(<Pagination {...defaultProps} activePage={4} />)
    fireEvent.click(getByLabelText('Next'))
    expect(getByLabelText('Next')).toBeNull
  })

  it('clicks the previous arrow and sets the correct page', () => {
    const { getByLabelText, rerender } = render(<Pagination {...defaultProps} activePage={1} />)
    fireEvent.click(getByLabelText('Next'))
    rerender(<Pagination {...defaultProps} activePage={2} />)
    fireEvent.click(getByLabelText('Previous'))
    expect(mock).toBeCalled
  })
})
