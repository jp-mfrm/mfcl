import React from 'react'
import { render } from '@testing-library/react'

import ProductCard from './index'

const defaultProps = ({
  brand = '',
  brandImg = '',
  productImg = '',
  title = '',
  size = '',
  discountedPrice = 0,
  price = 0,
  rating = 1,
  reviews = 1,
  matchPercentage = 100
}) => ({
  brand,
  brandImg,
  productImg,
  title,
  size,
  discountedPrice,
  price,
  rating,
  reviews,
  matchPercentage
})

describe('ProductCard Component', () => {
  it('should render the discounted price', () => {
    const props = defaultProps({ discountedPrice: 100 })
    const { container } = render(<ProductCard {...props} />)
    expect(container.querySelector('.product-card-container')?.classList).toContain('price-cut')
  })

  it('should render the price', () => {
    const props = defaultProps({ price: 100 })
    const { container } = render(<ProductCard {...props} />)
    expect(container.querySelector('.product-card-container')?.classList).toContain('original-price')
  })
})
