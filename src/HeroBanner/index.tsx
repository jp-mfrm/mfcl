import React, { FunctionComponent, ReactNode } from 'react'
import Typography from '../Typography'
import Button from '../Button'
import clsx from 'clsx'

import styles from './heroBanner.module.scss'

interface Props {
  /** title of the hero banner */
  title: string
  /** paragraph of the hero banner */
  body: string
  /** image link */
  imageSrc?: string
  /** alt attribute for the img tag  */
  imageAlt?: string
  /** the svg logo right above the title  */
  brandLogo?: ReactNode
  /** props for the button component */
  btnProps?: Object
  /** Sets the color of the text */
  textColor?: 'primary' | 'secondary' | 'error' | 'success' | 'alert' | 'white'
  /** image will take up the entire width */
  fullSizeImg?: boolean
  /** style of the HeroBanner div wrapper */
  heroBannerStyle?: any
  className?: string
  [rest: string]: unknown
}

const HeroBanner: FunctionComponent<Props> = ({
  bgSize = 'cover',
  bgPosition = 'center',
  heroBannerStyle = {},
  textColor = 'white',
  imageSrc,
  imageAlt,
  title,
  body,
  btnProps,
  brandLogo,
  fullSizeImg,
  className,
  ...rest
}) => {
  let infoPanelStyles = { width: `${imageSrc ? '50%' : '100%'}`, ...heroBannerStyle }
  let heroBannerStyles = {
    background: `url(${imageSrc})`,
    ...heroBannerStyle
  }
  let imageBg = fullSizeImg ? heroBannerStyles : infoPanelStyles

  return (
    <div className={clsx(styles['hero-banner-wrapper'], className)} {...rest}>
      <div className={styles.infoPanelContainer} style={imageBg}>
        {brandLogo && <div className={styles.brandLogo}>{brandLogo}</div>}
        <Typography className={styles.title} variant="h4" color={textColor}>
          {title}
        </Typography>
        <Typography className={styles.body} variant="paragraph" color={textColor}>
          {body}
        </Typography>
        {btnProps && <Button className={styles.btnStyles} {...btnProps} />}
      </div>
      {!fullSizeImg && imageSrc && (
        <div className={styles.imgContainer}>
          <img src={imageSrc} alt={imageAlt} />
        </div>
      )}
    </div>
  )
}

export default HeroBanner
