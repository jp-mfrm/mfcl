import React, { FunctionComponent, CSSProperties } from 'react'
import clsx from 'clsx'

interface Props {
  defaultSize?: number
  mobileSize?: number
  largeMobileSize?: number
  tabletSize?: number
  desktopSize?: number
  children: React.ReactNode
  itemStyles?: CSSProperties
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
    <div className={`${columnSizes} column`}>
      <div className="gridItem" style={{ marginBottom: rowMarginBottom, ...itemStyles }}>
        {children}
      </div>
    </div>
  )
}

export default GridItem
