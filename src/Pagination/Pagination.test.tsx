import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Pagination from './index'

const defaultProps = {
  totalPages: 5
}

describe('Pagination Component', () => {
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
    expect(container.querySelector('.list-wrapper')?.textContent?.length).toBe(3)
  })

  it('renders the siblingPages prop', () => {
    const { container } = render(<Pagination {...defaultProps} siblingPages={2} />)
    expect(container.querySelector('.list-wrapper')?.textContent?.length).toBe(5)
  })

  it('renders the activePage prop', () => {
    const { getByLabelText } = render(<Pagination {...defaultProps} activePage={3} />)
    expect(getByLabelText('Go to page 3').classList).toContain('active')
  })

  it('renders the showItemCount prop', () => {
    const { container, rerender } = render(<Pagination {...defaultProps} showItemCount={false} boundaryCount={1} />)
    expect(container.querySelector('.numText')).not.toBeInTheDocument()
    rerender(<Pagination {...defaultProps} showItemCount />)
    expect(container.querySelector('.numText')).toBeInTheDocument()
  })

  it('clicks the correct button and sets the correct page', () => {
    const { getByLabelText } = render(<Pagination {...defaultProps} />)
    const page2 = getByLabelText('Go to page 2')
    fireEvent.click(page2)
    expect(page2.classList).toContain('active')
  })

  it('clicks the correct button and sets the correct page', () => {
    let activePage = 1
    const onChange = (index: number) => {
      activePage = index
    }
    const { getByLabelText } = render(<Pagination {...defaultProps} onChange={onChange} />)
    expect(activePage).toBe(1)
    fireEvent.click(getByLabelText('Go to page 3'))
    expect(activePage).toBe(3)
  })

  it('clicks the next and previous arrow and sets the correct page', () => {
    let activePage = 3
    const onChange = (index: number) => {
      activePage = index
    }
    const { getByLabelText, rerender } = render(<Pagination {...defaultProps} activePage={activePage} />)
    fireEvent.click(getByLabelText('Next page'))
    fireEvent.click(getByLabelText('Previous page'))

    rerender(<Pagination {...defaultProps} activePage={activePage} onChange={onChange} />)
    fireEvent.click(getByLabelText('Previous page'))
    fireEvent.click(getByLabelText('Next page'))
    expect(activePage).toBe(4)
    fireEvent.click(getByLabelText('Previous page'))
    expect(activePage).toBe(2)
  })
})
