import React, { FunctionComponent, Children, isValidElement, CSSProperties } from 'react'
import GridItem from './GridItem'
import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  useChildren?: boolean
  createContainer?: boolean
  createRows?: boolean
  alignRows?: string
  gridStyles?: CSSProperties
  [rest: string]: unknown // ...rest property
}

const Grid: FunctionComponent<Props> = ({
  useChildren = false,
  createContainer = true,
  createRows = true,
  children,
  alignRows = '',
  gridStyles = {},
  ...rest
}) => {
  const rowStyles = clsx('grid-row', alignRows && `grid-row-${alignRows}`)
  return (
    <div className={`${createContainer && 'container'}`} style={gridStyles}>
      <div className={createRows ? rowStyles : ''}>
        {useChildren
          ? Children.map(children, (child, index) => {
              if (isValidElement(child)) {
                return (
                  <GridItem key={index} {...rest}>
                    {child}
                  </GridItem>
                )
              }
            })
          : children}
      </div>
    </div>
  )
}

export default Grid
