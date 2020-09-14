import React, { FunctionComponent, useState, useCallback } from 'react'

import styles from './pagination.module.scss'

interface Props {
  activePage?: number
  itemsPerPage?: number
  totalPages: number
  onChange?: Function
  [rest: string]: unknown // ...rest property
}

const Pagination: FunctionComponent<Props> = ({
  activePage = 1,
  totalPages = 10,
  itemsPerPage,
  onChange,
  ...rest
}) => {
  const numberOfPages = []
  const pages = []
  const [currentPage, setCurrentPage] = useState(activePage)
  const [childrenPerPage] = useState(itemsPerPage)
//   let totalItems = Array.from(Array(totalPages).keys())

  useCallback(() => {
    onChange
  }, [onChange])

  let totalItems
  for (let i = 0; i < totalPages; i++){
    pages.push(i + 1)
  }

  console.log(pages)
  // const indexOfLastPage = currentPage * childrenPerPage
  // const indexOfFirstPage = indexOfLastPage - childrenPerPage
  // const currentItems = pages.slice(indexOfFirstPage, indexOfLastPage)

  // for (let i = 1; i <= Math.ceil(pages.length / childrenPerPage); i++) {
  //   numberOfPages.push(i)
  // }

//   console.log(numberOfPages)
  return (
    <div className={styles['pagination-wrapper']} {...rest}>
      <div>
        {pages.map((number) => (
          <button key={number} onClick={() => setCurrentPage(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Pagination
