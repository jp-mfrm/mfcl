import React from 'react'
import { render } from '@testing-library/react'

import ProductCard from './index'

const defaultProps = {
  brand: '',
  brandImg: '',
  productImg: '',
  title: '',
  size: '',
  discountedPrice: 0,
  price: 0,
  rating: 1,
  reviews: 1,
  matchPercentage: 50
}

describe('ProductCard Component', () => {
  it('should render the discounted price', () => {
    const { container } = render(<ProductCard {...defaultProps} discountedPrice={200} />)
    expect(container.querySelector('.price-container > div > p')?.classList).toContain('discounted-price')
  })

  it('should render the price', () => {
    const { container } = render(<ProductCard {...defaultProps} price={100} />)
    expect(container.querySelector('.price-container > div > p')?.classList).toContain('original-price')
  })
})
