import React, { FunctionComponent } from 'react'
import Rating from '../Rating'
import clsx from 'clsx'

import styles from './productCard.module.scss'

interface Props {
  brand: string
  brandImg: string
  productImg: string
  title: string
  size: string
  discountedPrice?: number
  price: number
  rating: number
  reviews: number
  matchPercentage?: number
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
  let productPrice = discountedPrice ? discountedPrice : price
  let productMatch = matchPercentage && <span className={styles['match-banner']}>{matchPercentage}% Match</span>

  let productDiscount
  if (discountedPrice) {
    productDiscount = <p className={styles['price-cut']}>&#36;{price}</p>
  }

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
              <Rating name="product-rating" value={rating} readOnly size="sm" />
              <p className={styles.reviews}>
                <small className={styles['average-rating']}>{rating}/5</small> <small>({reviews})</small>
              </p>
            </div>
          </div>
          <p>{title}</p>
        </div>
      </div>
      <div className={styles['price-container']}>
        <span className={styles.placeholder} />
        <div>
          <p className={clsx(styles['original-price'], discountedPrice && styles['discounted-price'])}>
            {size} <span className={styles.divider}>|</span> &#36;{productPrice}
          </p>
          {productDiscount}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
