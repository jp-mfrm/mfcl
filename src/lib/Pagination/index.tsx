import React, { FunctionComponent, useState, useCallback } from 'react'
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

  const setNumberOfPage = useCallback(
    (number) => {
      onChange
      setCurrentPage(number)
    },
    [onChange, currentPage]
  )

  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1)
  }

  console.log(currentPage)
  const indexOfLastPage = currentPage * pages.length
  const indexOfFirstPage = indexOfLastPage - pages.length
  const currentItems = pages.slice(indexOfFirstPage, indexOfLastPage)

  for (let i = 1; i <= Math.ceil(pages.length / pages.length); i++) {
    items.push(i)
  }

  return (
    <div className={clsx(styles['pagination-wrapper'], className)} {...rest}>
      {pages.map((number) => (
        <button
          className={clsx(styles.button, currentPage === number && styles.active)}
          key={number}
          onClick={() => setNumberOfPage(number)}
        >
          {number}
        </button>
      ))}
    </div>
  )
}

export default Pagination
