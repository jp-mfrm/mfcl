import React, { FunctionComponent, ReactNode } from 'react'
import Rating from '../Rating'
import Price from '../Price'

import styles from './productCard.module.scss'
import clsx from 'clsx'
import getBrandLogo from '../utils/getBrandLogo'
import getComfortLogo from '../utils/getComfortLogo'

interface Props {
  /** Product brand */
  brand?: string
  /** Brand logo svg height */
  brandHeight?: number
  /** Product card layout orientation */
  layout?: 'row' | 'column'
  /** Badge text to appear above product image */
  badge?: string
  /** Image src of the product */
  productImg: string
  /** The description of the product */
  title: string
  /** Product size */
  size?: string
  /** Product comfort */
  comfort?: string
  /** The text that appears before the product price */
  pricePrefix?: string
  /** Price or price range of product */
  price: number[]
  /** Rating of product out of 5 */
  rating?: number
  /** Position of where the ratings are shown in the card */
  ratingPosition?: 'top' | 'bottom'
  /** Number of Product reviews */
  reviews: number
  /** Match of product with user, will appear at top */
  matchPercentage?: number
  /** Discounted price or range of discounted prices if any */
  discountPrice?: number[]
  /** Product card container class */
  cardClass?: string
  /** Product details class. Container enclosing the brand, rating, title, size, comfort, price and children */
  detailsClass?: string
  /** Brand component class */
  brandClass?: string
  /** Product image container class */
  imgContainerClass?: string
  /** Product image class */
  imgClass?: string
  /** Title class */
  titleClass?: string
  /** Class for container of size and comfort */
  infoClass?: string
  /** Class for price details container */
  priceClass?: string
  children?: ReactNode
  [rest: string]: unknown // ...rest property
}

const ProductCard: FunctionComponent<Props> = ({
  brand,
  brandHeight,
  brandClass,
  layout = 'column',
  badge,
  cardClass,
  detailsClass,
  productImg,
  imgContainerClass,
  imgClass,
  title,
  titleClass,
  size,
  comfort,
  infoClass,
  discountPrice,
  pricePrefix = '',
  price,
  priceClass,
  rating,
  ratingPosition = 'top',
  reviews,
  children,
  matchPercentage,
  ...rest
}) => {
  const productMatch = matchPercentage && <span className={styles['match-banner']}>{matchPercentage}% Match</span>

  const branding = typeof brand === 'string' && (
    <span className={clsx(styles['brand-logo'], brandClass && styles[brandClass])}>
      {getBrandLogo(brand, brandHeight)}
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

  const priceInfo = price && (
    <div className={clsx(styles['price-container'], priceClass && styles[priceClass])}>
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
    <div className={clsx(styles['details-container'], detailsClass && styles[detailsClass])}>
      <div className={styles.reviewRow}>
        {branding}
        {ratingPosition === 'top' && ratings}
      </div>
      <p className={clsx(styles['details-container-title'], titleClass && styles[titleClass])}>{title}</p>
      {ratingPosition === 'bottom' && ratings}
      <div className={clsx(styles.infoRow, infoClass && styles[infoClass])}>
        {size && <div>{size}</div>}
        {typeof comfort === 'string' && getComfortLogo(comfort)}
      </div>
      {priceInfo}
      {children}
    </div>
  )

  return (
    <div className={clsx(styles['product-card-container'], styles[layout], cardClass && styles[cardClass])} {...rest}>
      <div className={clsx(styles.content, styles[layout])}>
        <div className={clsx(styles['product-image'], imgContainerClass && styles[imgContainerClass])}>
          {badge && <div className={styles['product-badge']}>{badge}</div>}
          {productMatch}
          <img src={productImg} className={imgClass && styles[imgClass]} />
        </div>
        {productDetails}
      </div>
    </div>
  )
}

export default ProductCard
