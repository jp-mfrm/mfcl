import React from 'react'
import { render } from '@testing-library/react'

import ProductCard from './index'

const defaultProps = {
  brand: '',
  brandImg: '',
  productImg: '',
  title: '',
  size: '',
  price: 0,
  rating: 1,
  reviews: 1
}

describe('ProductCard Component', () => {
  it('should render the discounted price', () => {
    const { container } = render(<ProductCard {...defaultProps} discountedPrice={200} />)
    expect(container.querySelector('.discounted-price')?.classList).toBeTruthy()
  })

  it('should render the price', () => {
    const { container } = render(<ProductCard {...defaultProps} price={100} />)
    expect(container.querySelector('.price-container > div > p')?.classList).toContain('original-price')
  })

  it('should render the match percentage correctly', () => {
    const { container } = render(<ProductCard {...defaultProps} matchPercentage={80} />)
    expect(container.querySelector('.match-banner')?.classList).toBeTruthy()
  })

  it('should render the title prop correctly', () => {
    const { getByText } = render(<ProductCard {...defaultProps} title={'text'} />)
    expect(getByText('text')).toBeInTheDocument
  })

  it('should render the ratings correctly', () => {
    let userRating = 4
    const { container } = render(<ProductCard {...defaultProps} rating={userRating} />)
    expect(container.querySelector('.average-rating')?.textContent).toBe('4/5')
  })
})
