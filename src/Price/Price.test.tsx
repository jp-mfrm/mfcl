import React from 'react'
import { render, screen } from '@testing-library/react'

import Price from './index'

describe('Price Component', () => {
  const price = [1500]

  it('renders a className', () => {
    const { container } = render(<Price price={price} className="test-class-name" />)
    expect(container.querySelector('.price-wrapper')?.classList).toContain('test-class-name')
  })

  it('should render the size prop correctly', () => {
    let size = 'wumbo'
    const { container } = render(<Price price={price} text={size} />)
    expect(container.querySelector('.text')?.textContent).toContain(size)
  })

  it('should render the discounted price', () => {
    const originalPrice = 200
    const { container } = render(<Price price={price} originalPrice={[originalPrice]} />)
    expect(container.querySelectorAll('.price-integer')[0].textContent).toBe('$1,500')
  })

  it('should render the price', () => {
    const { getByTestId } = render(<Price price={price} />)
    expect(getByTestId('price-container-prices').querySelector('div')?.classList).toContain('price')
  })

  it('should center the content', () => {
    const { container } = render(<Price price={price} center />)
    expect(container.querySelector('.price-wrapper')?.classList).toContain('center')
  })
  it('should render the text prop correctly', () => {
    let text = 'choo choo'
    const { container } = render(<Price price={price} text={text} />)
    expect(container.querySelector('.text')?.textContent).toContain(text)
  })

  it('should render the divider prop correctly', () => {
    const { container } = render(<Price price={price} text="text" divider />)
    expect(container.querySelector('.divider')?.textContent).toContain('|')
  })

  it('should render the discounted percentage', () => {
    const { container } = render(<Price price={price} originalPrice={[2000]} discountPercentage />)
    expect(container.querySelector('.price-cut-percent')?.textContent).toContain('%')
  })

  it('should render the rightText', () => {
    const { getByTestId } = render(<Price rightText={'/ mo'} price={[20]} />)
    expect(getByTestId('price-container-prices').querySelector('.price')?.textContent).toContain('/ mo')
  })
})
