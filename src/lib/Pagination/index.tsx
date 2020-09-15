import React, { FunctionComponent, useState, useCallback } from 'react'
import PaginationArrow from './PaginationArrow'
import clsx from 'clsx'

import styles from './pagination.module.scss'

interface Props {
  totalPages: number
  activePage?: number
  itemsPerPage?: number
  onChange?: Function
  className?: string
  [rest: string]: unknown // ...rest property
}

const Pagination: FunctionComponent<Props> = ({
  activePage = 1,
  totalPages = 3,
  itemsPerPage,
  onChange,
  className,
  ...rest
}) => {
  const pages = []
  const items = []
  const [currentPage, setCurrentPage] = useState(activePage)
  const [childrenPerPage] = useState(itemsPerPage)
  let totalItems = Array.from(Array(totalPages).keys())

  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1)
  }

  console.log(currentPage)
  const indexOfLastPage = activePage * totalPages
  const indexOfFirstPage = indexOfLastPage - totalPages
  const currentItems = pages.slice(indexOfFirstPage, indexOfLastPage)

  console.log(indexOfFirstPage)

  for (let i = 1; i <= Math.ceil(pages.length / pages.length); i++) {
    items.push(i)
  }

  const setNumberOfPage = useCallback(
    (number) => {
      onChange
      setCurrentPage(number)
    },
    [onChange, currentPage]
  )

  const setPreviousPage = () => {
    if (currentPage === indexOfFirstPage + 1) {
      return
    }
    setCurrentPage(currentPage - 1)
  }

  const setNextPage = () => {
    if (currentPage === indexOfLastPage) {
      return
    }
    setCurrentPage(currentPage + 1)
  }

  return (
    <div className={clsx(styles['pagination-wrapper'], className)} {...rest}>
      <PaginationArrow previous onClick={setPreviousPage} />
      {pages.map((number) => (
        <button
          className={clsx(styles.button, currentPage === number && styles.active)}
          key={number}
          onClick={() => setNumberOfPage(number)}
        >
          {number}
        </button>
      ))}
      <PaginationArrow next onClick={setNextPage} />
    </div>
  )
}

export default Pagination
