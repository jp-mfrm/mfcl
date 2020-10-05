import React, { FunctionComponent } from 'react'
import Rating from '../Rating'
import Price from '../Price'

import styles from './productCard.module.scss'

interface Props {
  /** image of brand name that will appear below product image */
  brandImg: string
  /** Image of product */
  productImg: string
  /** The description of the product */
  title: string
  /** The size of the mattress */
  size: string
  /** Price of product */
  price: number
  /** Rating of product out of 5 */
  rating: number
  /** How many reviews product has */
  reviews: number
  /** Match of product with user, will appear at top */
  matchPercentage?: number
  /** discounted price if any */
  discountPrice?: number
  [rest: string]: unknown // ...rest property
}

const ProductCard: FunctionComponent<Props> = ({
  brandImg,
  productImg,
  title,
  size,
  discountPrice,
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
        <Price data-testid="price" text="Wumbo" divider price={price} discountPrice={discountPrice} />
      </div>
    </div>
  )
}

export default ProductCard
