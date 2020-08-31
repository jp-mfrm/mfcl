import React, { FunctionComponent, CSSProperties } from 'react'
import clsx from 'clsx'

interface Props {
  /**
   * Default column size to use on all screen sizes
   * valid sizes: 1 - 12
   */
  defaultSize?: number
  /** Column size for screens 424px and smaller */
  mobileSize?: number
  /** Column size for screens 425px-766px */
  largeMobileSize?: number
  /** Column size for screens 767px-1023px */
  tabletSize?: number
  /** Column size for screens 1024px and larger */
  desktopSize?: number
  children: React.ReactNode
  /** Styles to add to the gridItem container */
  itemStyles?: CSSProperties
  /** margin-bottom value to use*/
  rowMarginBottom?: string
}

const GridItem: FunctionComponent<Props> = ({
  defaultSize,
  desktopSize,
  tabletSize,
  largeMobileSize,
  mobileSize,
  children,
  itemStyles = {},
  rowMarginBottom = ''
}) => {
  const columnSizes = clsx(
    defaultSize && `col-xs-${defaultSize}`,
    mobileSize && `col-xs-${mobileSize}`,
    largeMobileSize && `col-sm-${largeMobileSize}`,
    tabletSize && `col-md-${tabletSize}`,
    desktopSize && `col-lg-${desktopSize}`
  )
  return (
    <div className={`${columnSizes} grid-column`} data-testid="grid-column">
      <div className="grid-item" style={{ marginBottom: rowMarginBottom, ...itemStyles }}>
        {children}
      </div>
    </div>
  )
}

export default GridItem
