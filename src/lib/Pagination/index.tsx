import React, { FunctionComponent, useState, useCallback } from 'react'
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
  totalPages = 5,
  itemsPerPage = 6,
  showItemCount = true,
  onChange,
  countName = '',
  className,
  ...rest
}) => {
  const pages = []
  const [currentPage, setCurrentPage] = useState(activePage)
  const [currentItems, setCurrentItems] = useState(itemsPerPage)
  const indexOfLastPage = activePage * totalPages
  const indexOfFirstPage = indexOfLastPage - totalPages + 1
  const totalItems = itemsPerPage * totalPages

  const setNumberOfPage = useCallback(
    (number) => {
      onChange
      setCurrentPage(number)
      setCurrentItems(number * itemsPerPage)
    },
    [onChange, currentPage]
  )

  const setPreviousPage = () => {
    if (currentPage === indexOfFirstPage) {
      return
    }
    setCurrentPage(currentPage - 1)
    setCurrentItems((currentPage - 1) * itemsPerPage)
  }

  const setNextPage = () => {
    if (currentPage === indexOfLastPage) {
      return
    }
    setCurrentPage(currentPage + 1)
    setCurrentItems((currentPage + 1) * itemsPerPage)
  }

  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1)
  }

  let paginationNumbers = pages.map((number) => (
    <button
      className={clsx(styles.button, currentPage === number && styles.active)}
      key={number}
      onClick={() => setNumberOfPage(number)}
    >
      {number}
    </button>
  ))

  return (
    <div className={clsx(styles['pagination-wrapper'], className)} {...rest}>
      <div className={styles['button-wrapper']}>
        {currentPage > indexOfFirstPage && <PaginationArrow previous onClick={setPreviousPage} />}
        <div className={styles['button-wrapper']}>{paginationNumbers}</div>
        {currentPage < indexOfLastPage && <PaginationArrow next onClick={setNextPage} />}
      </div>
      <div className={styles.numText}>{showItemCount && `${currentItems} out of ${totalItems} ${countName}`}</div>
    </div>
  )
}

export default Pagination
