import React from 'react'
import { render } from '@testing-library/react'

import ProductCard from './index'
import { isNull } from 'util'

const defaultProps = {
  brandImg: '',
  productImg: '',
  title: '',
  pricePrefix: '',
  price: [5, 10],
  rating: 1,
  reviews: 1
}

describe('ProductCard Component', () => {
  

  it('should render the match percentage correctly', () => {
    const { container } = render(<ProductCard {...defaultProps} matchPercentage={80} />)
    expect(container.querySelector('.match-banner')?.classList).toBeTruthy()
  })

  it('should render the title prop correctly', () => {
    const { getByText } = render(<ProductCard {...defaultProps} title={'text'} />)
    expect(getByText('text')).toBeInTheDocument
  })

  it('should render the overall rating correctly', () => {
    let userRating = 4
    const { container } = render(<ProductCard {...defaultProps} rating={userRating} />)
    expect(container.querySelector('.average-rating')?.textContent).toBe('4/5')
  })

  it('should render the stars rating correctly', () => {
    let starRating = 5
    const { getByTestId } = render(<ProductCard {...defaultProps} rating={starRating} />)
    expect(getByTestId('star-rating').getAttribute('aria-label')).toEqual(`${starRating} Stars`)
  })

  it('should render the total amount of reviews correctly', () => {
    let numOfReviews = 345
    const { getByTestId } = render(<ProductCard {...defaultProps} reviews={numOfReviews} />)
    expect(getByTestId('review-count').textContent).toEqual(`(${numOfReviews})`)
  })

  it('should render the brand img', () => {
    let image = 'image/choo-choo'
    const { container } = render(<ProductCard {...defaultProps} brand="brand" brandImg={image} />)
    expect(container.querySelector('.brand-logo > img')?.getAttribute('src')).toEqual(image)
  })

  it('should render the product img', () => {
    let image = 'image/chugga-chugga'
    const { container } = render(<ProductCard {...defaultProps} productImg={image} />)
    expect(container.querySelector('.product-image > img')?.getAttribute('src')).toEqual(image)
  })
})
