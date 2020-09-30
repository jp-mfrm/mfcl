import React, { FunctionComponent, ReactSVG } from 'react'
import Typography from '../Typography'
import Button from '../Button'
import clsx from 'clsx'

import styles from './heroBanner.module.scss'

interface Props {
  title: string
  body: string
  imageSrc?: string
  imageAlt?: string
  brandLogo?: ReactSVG
  btnText?: string
  btnLink?: string
  fullSizeImg?: boolean
  bgColor?: string
  bgSize?: 'contain' | 'repeat' | 'cover'
  textColor?: 'primary' | 'secondary' | 'error' | 'alert' | 'success' | 'white'
  className?: string
  [rest: string]: unknown // ...rest property
}

const HeroBanner: FunctionComponent<Props> = ({
  bgColor = '#0A1232',
  imageSrc,
  imageAlt,
  title,
  body,
  btnText,
  btnLink,
  brandLogo,
  fullSizeImg,
  bgSize = 'cover',
  textColor = 'white',
  className,
  ...rest
}) => {
  let infoPanelStyles = { backgroundColor: `${bgColor}` }
  let heroBannerStyles = { background: `url(${imageSrc})`, backgroundSize: bgSize }

  let imageBg = fullSizeImg ? heroBannerStyles : infoPanelStyles

  let imageTile
  if (!fullSizeImg && imageSrc) {
    imageTile = (
      <div className={styles.imgContainer}>
        <img src={imageSrc} alt={imageAlt} />
      </div>
    )
  }

  //TODO: Get brand logo to render correctly
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
    <div className={clsx(styles['hero-banner-wrapper'], className)} {...rest}>
      <div className={styles.infoPanelContainer} style={imageBg}>
        {brandLogo}
        <Typography className={styles.title} variant="h4" color={textColor}>
          {title}
        </Typography>
        <Typography variant="paragraph" color={textColor}>
          {body}
        </Typography>
        {heroBtn}
      </div>
      {imageTile}
    </div>
  )
}

export default HeroBanner
