import React, { FunctionComponent, CSSProperties } from 'react'
import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  /**
   * Aligment for the rows.
   * Possible values: "center", "start", "end",
   * "around" (justify-content: space-around),
   * or "between" (justify-content: space-between)
   */
  alignRow?: string
  /**
   * Styles to set on the row container
   */
  rowStyle?: CSSProperties
}

const GridRow: FunctionComponent<Props> = ({ children, alignRow = '', rowStyle = {} }) => {
  const rowClasses = clsx('grid-row', alignRow && `grid-row-${alignRow}`)
  return (
    <div className={rowClasses} style={rowStyle}>
      {children}
    </div>
  )
}

export default GridRow
