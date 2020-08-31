import React, { FunctionComponent, Children, isValidElement, CSSProperties } from 'react'
import GridItem from './GridItem'
import clsx from 'clsx'

interface Props {
  /** Child elements of the grid */
  children: React.ReactNode
  /**
   * Set to true when GridRows or GridItems components
   * are not used. This will take the child elements
   * of any kind and create GridItems out of them
   */
  createGridItems?: boolean
  /** Sets the page layout container outside of grid. */
  createContainer?: boolean
  /**
   * Creates rows with the given alignment (default: left aligned)
   * Set to false when using GridRow component
   */
  createRows?: boolean
  /**
   * Aligment for the rows.
   * Possible values: "center", "start", "end",
   * "around" (justify-content: space-around),
   * or "between" (justify-content: space-between)
   */
  alignRows?: string
  /**
   * Styles to set on the grid container
   */
  gridStyles?: CSSProperties
  /**
   * If createGridItems true, used to pass
   * GridItems props down
   */
  [rest: string]: unknown // ...rest property
}

const Grid: FunctionComponent<Props> = ({
  createGridItems = false,
  createContainer = true,
  createRows = true,
  children,
  alignRows = '',
  gridStyles = {},
  ...rest
}) => {
  const rowStyles = clsx('grid-row', alignRows && `grid-row-${alignRows}`)
  return (
    <div className={`${createContainer && 'container'}`} style={gridStyles} data-testid="grid-container">
      <div className={createRows ? rowStyles : ''} data-testid="grid-row">
        {createGridItems
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
