import React, { FunctionComponent, useState, useMemo, useEffect } from 'react'
import clsx from 'clsx'
import PaginationNumber from './PaginationNumber'
import PaginationArrow from './PaginationArrow'
import useControlled from '../utils/useControlled'

import styles from './pagination.module.scss'

interface Props {
  /** total items to be paginated */
  totalItems: number
  /** Number of always visible pages before and after the current page. */
  siblingPages?: number
  /** Which page is currently selected */
  activePage?: number
  /** Number of always visible pages at the beginning and end. */
  boundaryCount?: number | { start: number; end: number }
  /** How many items will show per page */
  itemsPerPage: number
  /** Adds a name to the count if shown */
  countName?: string
  /** Shows the count of the items in the pagination list */
  showItemCount?: boolean
  /** truncates the pagination numbers with an ellipses */
  ellipses?: boolean
  /** callback when a number or arrow is clicked */
  onChange?: Function
  /** Override styles to Wrapper */
  className?: string
  [rest: string]: unknown // ...rest property
}

// https://dev.to/namirsab/comment/2050
export const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

const insertEllipses = (
  boundaryStart: number,
  boundaryEnd: number,
  siblingsStart: number,
  siblingsEnd: number,
  startPages: number[],
  endPages: number[]
) => {
  let pages: Array<any> = [...startPages, ...range(siblingsStart, siblingsEnd), ...endPages]

  if (startPages[startPages.length - 1] !== siblingsStart - 1) {
    pages.splice(boundaryStart, 0, '...')
  }

  if (endPages.length && siblingsEnd !== endPages[0] - 1 && startPages[startPages.length - 1] !== endPages[0] - 1) {
    pages.splice(pages.length - boundaryEnd, 0, '...')
  }

  return pages
}

const Pagination: FunctionComponent<Props> = ({
  activePage,
  boundaryCount = 0,
  siblingPages = 1,
  totalItems,
  itemsPerPage = 6,
  showItemCount = false,
  ellipses = false,
  onChange,
  countName = '',
  className,
  ...rest
}) => {
  const [currentPage, setCurrentPage] = useControlled({
    controlled: activePage,
    defaultValue: 1
  })

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const [currentItems, setCurrentItems] = useState(
    `${1 + itemsPerPage * (currentPage - 1)} - ${currentPage === totalPages ? totalItems : itemsPerPage * currentPage}`
  )
  const indexOfFirstPage = totalPages - totalPages + 1

  let boundaryStart = 0
  let boundaryEnd = 0

  if (ellipses && boundaryCount === 0) boundaryCount = 1

  if (typeof boundaryCount === 'object' && 'start' in boundaryCount && 'end' in boundaryCount) {
    boundaryStart = boundaryCount.start < totalPages ? boundaryCount.start : 1
    if (totalPages < boundaryCount.start + boundaryCount.end) boundaryEnd = 1
    else boundaryEnd = boundaryCount.end
  } else {
    boundaryStart = boundaryEnd = boundaryCount
  }

  useEffect(() => {
    setCurrentPage(1)
    setCurrentItems(`1 - ${1 === totalPages ? totalItems : itemsPerPage}`)
  }, [totalItems])

  const setNumberOfPage = (number: number) => {
    if (onChange) {
      onChange(number)
    }
    setCurrentPage(number)
    setCurrentItems(
      `${1 + itemsPerPage * (number - 1)} - ${number === totalPages ? totalItems : itemsPerPage * number}`
    )
  }

  const setPreviousPage = () => {
    setNumberOfPage(currentPage - 1)
  }

  const setNextPage = () => {
    setNumberOfPage(currentPage + 1)
  }

  /** This is the money💰💰💰 logic for pagination */
  const pages = useMemo(() => {
    const startPages = range(1, Math.min(boundaryStart, totalPages))
    const endPages = range(Math.max(totalPages - boundaryEnd + 1, boundaryEnd + 1), totalPages)

    const siblingsStart = Math.max(
      Math.min(
        // Natural start
        currentPage - siblingPages,
        // Lower boundary when currentPage is high
        totalPages - boundaryEnd - siblingPages * 2
      ),
      // Greater than startPages
      boundaryStart + 1
    )

    const siblingsEnd = Math.min(
      Math.max(
        // Natural end
        currentPage + siblingPages,
        // Upper boundary when currentPage is low
        boundaryEnd + siblingPages * 2 + 1
      ),
      // Less than endPages
      endPages.length > 0 ? endPages[0] - 1 : totalPages
    )

    if (ellipses) {
      return insertEllipses(boundaryStart, boundaryEnd, siblingsStart, siblingsEnd, startPages, endPages)
    } else {
      return [...startPages, ...range(siblingsStart, siblingsEnd), ...endPages]
    }
  }, [currentPage, siblingPages, totalPages])

  return (
    <nav className={clsx(styles['pagination-wrapper'], className)} aria-label="pagination" role="navigation" {...rest}>
      <ul className={styles['list-wrapper']}>
        <PaginationArrow arrowType="Previous" onClick={setPreviousPage} show={currentPage > indexOfFirstPage} />
        {pages.map((value, index) => (
          <li key={`pagination-${index}-${value === '...' ? 'ellipses' : value}`}>
            {value === '...' ? (
              <span>...</span>
            ) : (
              <PaginationNumber
                active={currentPage === value}
                key={value}
                number={value}
                setNumberOfPage={setNumberOfPage}
              />
            )}
          </li>
        ))}
        <PaginationArrow arrowType="Next" onClick={setNextPage} show={currentPage < totalPages} />
      </ul>
      {showItemCount && (
        <span className={styles.numText}>
          {currentItems} out of {totalItems} {countName}
        </span>
      )}
    </nav>
  )
}

export default Pagination
