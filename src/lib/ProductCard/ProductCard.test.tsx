import React from 'react'
import { render } from '@testing-library/react'

import ProductCard from './index'

// const defaultProps = ({
//   brand = '',
//   brandImg = '',
//   productImg = '',
//   title = '',
//   size = '',
//   discountedPrice = 0,
//   price = 100,
//   rating = 1,
//   reviews = 1,
//   matchPercentage = 0
// }) => ({
//   brand,
//   brandImg,
//   productImg,
//   title,
//   size,
//   discountedPrice,
//   price,
//   rating,
//   reviews,
//   matchPercentage
// })

describe('ProductCard Component', () => {
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

  it('should render the discounted price', () => {
    // const props = defaultProps({ discountedPrice: 100 })
    const { container } = render(<ProductCard {...defaultProps} discountedPrice={200} />)
    expect(container.querySelector('.price-container > div > p')?.classList).toContain('discounted-price')
  })

  it('should render the price', () => {
    // const props = defaultProps({ price: 100 })
    const { container } = render(<ProductCard {...defaultProps} price={100} />)
    expect(container.querySelector('.price-container > div > p')?.classList).toContain('original-price')
  })
})
