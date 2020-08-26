import React, { FunctionComponent } from 'react'
import Rating from '../Rating'
import Price from '../Price'
import clsx from 'clsx'

import styles from './productCard.module.scss'

interface Props {
  brandImg: string
  productImg: string
  title: string
  size: string
  price: number
  rating: number
  reviews: number
  brand?: string
  matchPercentage?: number
  discountedPrice?: number
  [rest: string]: unknown // ...rest property
}

const ProductCard: FunctionComponent<Props> = ({
  brand,
  brandImg,
  productImg,
  title,
  size,
  discountedPrice,
  price,
  rating,
  reviews,
  matchPercentage,
  ...rest
}) => {
  let productMatch = matchPercentage && <span className={styles['match-banner']}>{matchPercentage}% Match</span>

  return (
    <div className={styles['product-card-container']} {...rest}>
      <div className={styles.contentRow}>
        <div className={styles['product-image']}>
          {productMatch}
          <img src={productImg} />
        </div>
        <div className={styles['details-container']}>
          <div className={styles.reviewRow}>
            <span className={styles['brand-logo']}>
              <img src={brandImg} />
            </span>
            <div className={styles['rating-row']}>
              <Rating data-testid="star-rating" name="product-rating" value={rating} readOnly size="sm" />
              <p className={styles.reviews}>
                <small className={styles['average-rating']}>{rating}/5</small>{' '}
                <small data-testid="review-count">({reviews})</small>
              </p>
            </div>
          </div>
          <p>{title}</p>
        </div>
      </div>
      <div className={styles['price-container']}>
        <span className={styles.placeholder} />
         
      </div>
    </div>
  )
}

export default ProductCard
