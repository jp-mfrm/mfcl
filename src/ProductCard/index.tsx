import React, { FunctionComponent, ReactNode } from 'react'
import Rating from '../Rating'
import Price from '../Price'
import Button from '../Button'
import StoreLocationButton from './storeLocationButton'
import clsx from 'clsx'

import styles from './productCard.module.scss'

interface Props {
  /** image of brand name that will appear below product image */
  brandImg?: string
  /** badge text to appear above product image */
  badge?: string
  productImg: string
  /** The description of the product */
  title: string
  /** The text that appears before the product price */
  pricePrefix?: string
  /** Price or price range of product */
  price: number[]
  /** Rating of product out of 5 */
  rating?: number
  /** Position of where the ratings are shown in the card */
  ratingPosition?: 'top' | 'bottom'
  reviews: number
  /** Match of product with user, will appear at top */
  matchPercentage?: number
  /** discounted price or range of discounted prices if any */
  discountPrice?: number[]
  storeLocation?: string
  productPage?: string
  deliveryDate?: string
  children?: ReactNode
  storeLocationBtnText?: string
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
  children,
  matchPercentage,
  storeLocation = '',
  productPage,
  storeLocationBtnText = '',
  deliveryDate,
  ...rest
}) => {
  const productMatch = matchPercentage && <span className={styles['match-banner']}>{matchPercentage}% Match</span>

  const branding = brand && (
    <span className={styles['brand-logo']}>
      <img src={brandImg} />
    </span>
  )

  const ratings = rating && (
    <div className={styles['rating-row']}>
      <Rating data-testid="star-rating" name="product-rating" value={rating} readOnly size="sm" />
      <span className={styles.reviews}>
        <small className={styles['average-rating']}>{rating}/5</small>{' '}
        <small data-testid="review-count">({reviews})</small>
      </span>
    </div>
  )

  const priceInfo = (
    <div className={styles['price-container']}>
      <Price
        data-testid="price"
        text={pricePrefix}
        divider={pricePrefix ? true : false}
        price={price}
        discountPrice={discountPrice && discountPrice}
      />
    </div>
  )

  const productDetails = (
    <div className={styles['details-container']}>
      <div className={styles.reviewRow}>
        {branding}
        {ratingPosition === 'top' && ratings}
      </div>
      <p className={styles['details-container-title']}>{title}</p>
      {ratingPosition === 'bottom' && ratings}
    </div>
  )

  let storeBtnText = storeLocation ? 'Available to try in' : 'Online Only'

  return (
    <div className={styles['product-card-container']} {...rest}>
      <div className={styles.contentCol}>
        {badge && <div className={styles['product-badge']}>{badge}</div>}
        <div className={styles['product-image']}>
          {productMatch}
          <img src={productImg} />
        </div>
        {productDetails}
      </div>
      {priceInfo}
      <p className={styles.financing}>Special Financing for up to 12 months*</p>
      {deliveryDate && (
        <p className={styles.delivery}>
          Delivery as soon as: <span className={styles['delivery-date']}>{deliveryDate}</span>
        </p>
      )}
      <div className={styles.btnContainer}>
        <Button>Shop Here</Button>
        <StoreLocationButton btnText={storeBtnText} storeLocation={storeLocation} />
      </div>
      {children}
    </div>
  )
}

export default ProductCard
