import React, { FunctionComponent, useState, useMemo } from 'react'
import clsx from 'clsx'
import PaginationNumber from './PaginationNumber'
import PaginationArrow from './PaginationArrow'
import useControlled from '../utils/useControlled'

import styles from './pagination.module.scss'

interface Props {
  /** total pages are in the pagination */
  totalPages: number
  /** Number of always visible pages before and after the current page. */
  siblingPages?: number
  /** Which page is currently selected */
  activePage?: number
  /** Number of always visible pages at the beginning and end. */
  boundaryCount?: number
  /** How many items will show per page */
  itemsPerPage?: number
  /** Adds a name to the count if shown */
  countName?: string
  /** Shows the count of the items in the pagination list */
  showItemCount?: boolean
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

const Pagination: FunctionComponent<Props> = ({
  activePage,
  boundaryCount = 0,
  siblingPages = 1,
  totalPages,
  itemsPerPage = 6,
  showItemCount = false,
  onChange,
  countName = '',
  className,
  ...rest
}) => {
  const [currentPage, setCurrentPage] = useControlled({
    controlled: activePage,
    defaultValue: 1
  })

  const [currentItems, setCurrentItems] = useState(itemsPerPage)
  const totalItems = itemsPerPage * totalPages
  const indexOfFirstPage = totalPages - totalPages + 1

  const setNumberOfPage = (number: number) => {
    if (onChange) {
      onChange(number)
    }
    setCurrentPage(number)
    setCurrentItems(number * itemsPerPage)
  }

  const setPreviousPage = () => {
    setNumberOfPage(currentPage - 1)
  }

  const setNextPage = () => {
    setNumberOfPage(currentPage + 1)
  }

  /** This is the money💰💰💰 logic for pagination */
  const pages = useMemo(() => {
    const startPages = range(1, Math.min(boundaryCount, totalPages))
    const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages)

    const siblingsStart = Math.max(
      Math.min(
        // Natural start
        currentPage - siblingPages,
        // Lower boundary when currentPage is high
        totalPages - boundaryCount - siblingPages * 2
      ),
      // Greater than startPages
      boundaryCount + 1
    )

    const siblingsEnd = Math.min(
      Math.max(
        // Natural end
        currentPage + siblingPages,
        // Upper boundary when currentPage is low
        boundaryCount + siblingPages * 2 + 1
      ),
      // Less than endPages
      endPages.length > 0 ? endPages[0] - 2 : totalPages
    )

    return [...startPages, ...range(siblingsStart, siblingsEnd), ...endPages]
  }, [currentPage, siblingPages, totalPages])

  return (
    <nav className={clsx(styles['pagination-wrapper'], className)} aria-label="pagination" {...rest}>
      <ul className={styles['list-wrapper']}>
        <PaginationArrow arrowType="Previous" onClick={setPreviousPage} show={currentPage > indexOfFirstPage} />
        {pages.map((number) => (
          <PaginationNumber
            active={currentPage === number}
            key={number}
            number={number}
            setNumberOfPage={setNumberOfPage}
          />
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
