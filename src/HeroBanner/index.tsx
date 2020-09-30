import React, { FunctionComponent, ReactNode } from 'react'
import Typography from '../Typography'
import Button from '../Button'
import SleepysBrand from '../Icons/SleepysBrand'
import clsx from 'clsx'

import styles from './heroBanner.module.scss'

interface Props {
  backgroundColor?: string
  imageSrc?: string
  brandLogo?: ReactNode
  title?: string
  text?: string
  btnText?: string
  btnLink?: string
  bgSize?: 'contain' | 'repeat' | 'cover'
  [rest: string]: unknown // ...rest property
}

const HeroBanner: FunctionComponent<Props> = ({
  bgColor = '#0A1232',
  imageSrc,
  title,
  text,
  btnText,
  btnLink,
  bgSize = 'cover',
  brandLogo,
  ...rest
}) => {
  let infoPanelStyles = { backgroundColor: `${bgColor}` }
  let customHeroStyle = { backgroundImage: `url(${imageSrc})`, backgroundSize: bgSize, backgroundPosition: 'center' }

  return (
    <div className={clsx(styles['hero-banner-wrapper'])} {...rest}>
      <div className={styles.infoPanelContainer} style={infoPanelStyles}>
        <span className={styles.brandLogo}>
          <SleepysBrand />
        </span>
        <Typography className={styles.title} variant="h4" color="white">
          {title}
        </Typography>
        <Typography variant="paragraph" color="white">
          {text}
        </Typography>
        <Button className={styles.btnStyles} size="md" href={btnLink}>
          {btnText}
        </Button>
      </div>
      <div className={styles.imgContainer}>
        <img src={imageSrc} alt="wowie zowie" />
      </div>
    </div>
  )
}

export default HeroBanner
