import React, { FunctionComponent, useState, useCallback, useMemo } from 'react'
import PaginationArrow from './PaginationArrow'
import clsx from 'clsx'

import styles from './pagination.module.scss'

interface Props {
  /** How many buttons are in the pagination */
  totalPages: number
  /** Which page is currently selected */
  activePage?: number
  itemsPerPage?: number
  /** Adds a name to the count if shown */
  countName?: string
  /** Shows the count of the items in the pagination list */
  showItemCount?: boolean
  onChange?: Function
  className?: string
  [rest: string]: unknown // ...rest property
}

const Pagination: FunctionComponent<Props> = ({
  activePage = 1,
  totalPages,
  itemsPerPage = 6,
  showItemCount = true,
  onChange,
  countName = '',
  className,
  ...rest
}) => {
  const [currentPage, setCurrentPage] = useState(activePage)
  const [currentItems, setCurrentItems] = useState(itemsPerPage)
  const indexOfLastPage = activePage * totalPages
  const totalItems = itemsPerPage * totalPages
  const indexOfFirstPage = indexOfLastPage - totalPages + 1

  const setNumberOfPage = useCallback(
    (number) => {
      onChange
      setCurrentPage(number)
      setCurrentItems(number * itemsPerPage)
    },
    [onChange, currentPage, currentItems]
  )

  const setPreviousPage = () => {
    setCurrentPage(currentPage - 1)
    setCurrentItems((currentPage - 1) * itemsPerPage)
  }

  const setNextPage = () => {
    setCurrentPage(currentPage + 1)
    setCurrentItems((currentPage + 1) * itemsPerPage)
  }

  /** Creates an array based of the number 
   * given to the totalPages prop */
  const pages = useMemo(() => {
      const newPages = []
    for (let i = 0; i < totalPages; i++) {
      newPages.push(i + 1)
    }
    return newPages
  }, [totalPages])

  /** The pages array is then mapped over to
   * create correct number of pagination buttons */
  let paginationNumbers = pages.map((number) => (
    <button
      className={clsx(styles.button, currentPage === number && styles.active)}
      key={number}
      onClick={() => setNumberOfPage(number)}
      aria-label={`Page ${number}`}
    >
      {number}
    </button>
  ))

  return (
    <div className={clsx(styles['pagination-wrapper'], className)} {...rest}>
      <div className={styles['button-wrapper']}>
        {currentPage > indexOfFirstPage && <PaginationArrow arrowType='Previous' onClick={setPreviousPage}/>}
        <div className={styles['button-wrapper']}>{paginationNumbers}</div>
        {currentPage < indexOfLastPage && <PaginationArrow arrowType='Next' onClick={setNextPage}/>}
      </div>
      {showItemCount && <div className={styles.numText}>{currentItems} out of {totalItems} {countName}</div>}
    </div>
  )
}

export default Pagination
