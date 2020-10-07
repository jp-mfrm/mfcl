import React, { FunctionComponent, ReactNode, Fragment } from 'react'
import Typography from '../Typography'
import styles from './breadcrumbs.module.scss'

interface Props {
  /** Should be Link components from Nextjs, a tags, or other router components */
  children: ReactNode
  /** Override styles to li elements: BreadcrumbsItem */
  itemClassName?: string
  /** Symbol that separates the links */
  separator?: ReactNode
  [rest: string]: unknown // for the Typography component
}

const Breadcrumbs: FunctionComponent<Props> = ({ children, itemClassName, separator = '/', ...rest }) => {
  const items = React.Children.toArray(children)
  const itemsLength = items.length
  const allItems = items.map((child, index) => {
    if (index < itemsLength - 1) {
      return (
        <Fragment key={`separator-${index}`}>
          <li className={itemClassName}>{child}</li>
          <li aria-hidden className={styles.separator}>
            {separator}
          </li>
        </Fragment>
      )
    }

    return (
      <li className={itemClassName} key={`child-${index}`}>
        {child}
      </li>
    )
  })

  return (
    <Typography variant="paragraph-sm" tag="nav" {...rest}>
      <ol className={styles['breadcrumbs-wrapper']}>{allItems}</ol>
    </Typography>
  )
}

export default Breadcrumbs
