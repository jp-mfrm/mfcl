import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Tabs from './index'

const items = ['Description', 'Specifications', 'About Beautyrest', 'Delivery & Shipping', 'Warranty']

describe('Tabs Component', () => {
  it('should render component', () => {
    const { container } = render(<Tabs name="test" items={items} />)
    expect(container.querySelector('.tablist-wrapper')).toBeInTheDocument()
  })

  it('should render a tablist', () => {
    const { getByText } = render(<Tabs name="test" items={items} />)
    expect(getByText('About Beautyrest')).toBeInTheDocument()
  })

  it('should change tab on click', () => {
    const onClick = jest.fn()
    const { container } = render(<Tabs name="test" items={items} onClick={onClick} />)
    // @ts-ignore
    fireEvent.click(container.querySelector('.tab-item'))
    expect(onClick).toHaveBeenCalled()
  })

  it('should change tab on left arrow', () => {
    const onKeyDown = jest.fn()
    const { getAllByRole } = render(<Tabs name="test" items={items} onKeyDown={onKeyDown} />)

    // @ts-ignore
    fireEvent.keyDown(getAllByRole('tab')[2], { keyCode: 39 })
    expect(getAllByRole('tab')[1]?.classList).toContain('active')
    expect(onKeyDown).toHaveBeenCalled()
  })

  it('should change tab on right arrow', () => {
    const onKeyDown2 = jest.fn()
    const { getAllByRole } = render(<Tabs name="test" items={items} onKeyDown={onKeyDown2} />)

    // @ts-ignore
    fireEvent.keyDown(getAllByRole('tab')[0], { keyCode: 39 })
    expect(getAllByRole('tab')[1]?.classList).toContain('active')
    expect(onKeyDown2).toHaveBeenCalled()
  })
})
