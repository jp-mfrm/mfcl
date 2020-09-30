import React, { FunctionComponent, ReactNode, ReactChild } from 'react'
import Typography from '../Typography'
import Button from '../Button'
import clsx from 'clsx'

import styles from './heroBanner.module.scss'

interface Props {
  backgroundColor?: string
  imageSrc?: string
  brandLogo?: ReactNode
  title: string
  body: string
  btnText?: string
  btnLink?: string
  bgSize?: 'contain' | 'repeat' | 'cover'
  [rest: string]: unknown // ...rest property
}

const HeroBanner: FunctionComponent<Props> = ({
  bgColor = '#0A1232',
  imageSrc,
  title,
  body,
  btnText,
  btnLink,
  brandLogo,
  ...rest
}) => {
  let infoPanelStyles = { backgroundColor: `${bgColor}` }

  let imageTile
  if (imageSrc) {
    imageTile = (
      <div className={styles.imgContainer}>
        <img src={imageSrc} alt="wowie zowie" />
      </div>
    )
  }

  let brandIcon
  if (brandLogo) {
    brandIcon = <span className={styles.brandLogo}>{brandLogo}</span>
  }

  let heroBtn
  if (btnText) {
    heroBtn = (
      <Button type="button" className={styles.btnStyles} size="md" href={btnLink}>
        {btnText}
      </Button>
    )
  }

  return (
    <div className={clsx(styles['hero-banner-wrapper'])} {...rest}>
      <div className={styles.infoPanelContainer} style={infoPanelStyles}>
        {brandIcon}
        <Typography className={styles.title} variant="h4" color="white">
          {title}
        </Typography>
        <Typography variant="paragraph" color="white">
          {body}
        </Typography>
        {heroBtn}
      </div>
      {imageTile}
    </div>
  )
}

export default HeroBanner
