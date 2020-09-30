import React, { FunctionComponent, ReactNode } from 'react'
import Typography from '../Typography'
import Button from '../Button'
import clsx from 'clsx'

import styles from './heroBanner.module.scss'

interface Props {
  title: string
  body: string
  imageSrc?: string
  imageAlt?: string
  brandLogo?: ReactNode
  btnText?: string
  btnLink?: string
  fullSizeImg?: boolean
  bgColor?: string
  bgSize?: 'contain' | 'repeat' | 'cover'
  bgPosition?: 'center' | string
  textColor?: 'primary' | 'secondary' | 'error' | 'alert' | 'success' | 'white'
  className?: string
  [rest: string]: unknown // ...rest property
}

const HeroBanner: FunctionComponent<Props> = ({
  bgColor = '#0A1232',
  bgSize = 'cover',
  bgPosition = 'center',
  textColor = 'white',
  imageSrc,
  imageAlt,
  title,
  body,
  btnText,
  btnLink,
  brandLogo,
  fullSizeImg,
  className,
  ...rest
}) => {
  let infoPanelStyles = { backgroundColor: `${bgColor}`, width: `${imageSrc ? '50%' : '100%'}` }
  let heroBannerStyles = {
    background: `url(${imageSrc})`,
    backgroundSize: bgSize,
    backgroundPosition: bgPosition,
    width: '100%'
  }
  let imageBg = fullSizeImg ? heroBannerStyles : infoPanelStyles

  let imageTile
  if (!fullSizeImg && imageSrc) {
    imageTile = (
      <div className={styles.imgContainer}>
        <img src={imageSrc} alt={imageAlt} />
      </div>
    )
  }

  let brandIcon
  if (brandLogo) {
    brandIcon = <div className={styles.brandLogo}>{brandLogo}</div>
  }

  let heroBtn
  if (btnText) {
    heroBtn = (
      <Button type="button" className={styles.btnStyles} size="md" href={btnLink}>
        {btnText}
      </Button>
    )
  }

  console.log(brandIcon)

  return (
    <div className={clsx(styles['hero-banner-wrapper'], className)} {...rest}>
      <div className={styles.infoPanelContainer} style={imageBg}>
        {brandIcon}
        <Typography className={styles.title} variant="h4" color={textColor}>
          {title}
        </Typography>
        <Typography className={styles.body} variant="paragraph" color={textColor}>
          {body}
        </Typography>
        {heroBtn}
      </div>
      {imageTile}
    </div>
  )
}

export default HeroBanner
