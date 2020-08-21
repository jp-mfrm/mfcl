import React from 'react'
import { render } from '@testing-library/react'

import ProductCard from './index'

const DEFAULT_PROPS = {
  brand: '',
  brandImg: '',
  className: '',
  productImg: '',
  title: '',
  size: '',
  discountedPrice: 0,
  price: 0,
  rating: 1,
  reviews: 1,
  matchPercentage: 100
}

describe('ProductCard Component', () => {
  const { container } = render(
    <ProductCard {...DEFAULT_PROPS} className="test-class-name">
      Click Me
    </ProductCard>
  )
  expect(container.querySelector('product-card-wrapper')?.classList).toContain('test-class-name')
})
