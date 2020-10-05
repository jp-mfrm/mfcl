import React, { FunctionComponent } from 'react'
import Rating from '../Rating'
import Price from '../Price'

import styles from './productCard.module.scss'

interface Props {
  brandImg?: string
  badge?: string
  productImg: string
  title: string
  pricePrefix?: string
  price: number[]
  rating?: number
  ratingPosition?: 'top'|'bottom'
  reviews: number
  brand?: string
  matchPercentage?: number
  discountPrice?: number[]
  [rest: string]: unknown // ...rest property
}

const ProductCard: FunctionComponent<Props> = ({
  brand,
  badge,
  brandImg,
  productImg,
  title,
  discountPrice,
  pricePrefix = '',
  price,
  rating,
  ratingPosition = 'top',
  reviews,
  matchPercentage,
  ...rest
}) => {
  const productMatch = matchPercentage && 
    <span className={styles['match-banner']}>{matchPercentage}% Match</span>

  const branding = brand && 
    <span className={styles['brand-logo']}>
      <img src={brandImg} />
    </span>

  const ratings = rating &&
    <div className={styles['rating-row']}>
      <Rating data-testid="star-rating" name="product-rating" value={rating} readOnly size="sm" />
      <span className={styles.reviews}>
        <small className={styles['average-rating']}>{rating}/5</small>{' '}
        <small data-testid="review-count">({reviews})</small>
      </span>
    </div>

  const priceInfo = 
  <div className={styles['price-container']}>
      <Price data-testid="price" text={pricePrefix} divider={pricePrefix ? true : false} price={price} discountPrice={discountPrice && discountPrice} />
  </div>
  
  const productDetails = 
  <div className={styles['details-container']}>
    <div className={styles.reviewRow}>
      {branding}
      {ratingPosition === 'top' && ratings}
    </div>
    <p className={styles['details-container-title']}>{title}</p>
    {ratingPosition === 'bottom' && ratings}
  </div>

  return (
    <div className={styles['product-card-container']} {...rest}>
      <div className={styles.contentCol}>
        {badge && <div className={styles['product-badge']} >{badge}</div>}
        <div className={styles['product-image']}>
          {productMatch}
          <img src={productImg} />
        </div>
        {productDetails}
      </div>
      {priceInfo}
    </div>
  )
}

export default ProductCard
