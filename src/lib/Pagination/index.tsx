import React, { FunctionComponent, useState, ReactNode } from 'react'
import Price from '../Price'

import styles from './pagination.module.scss'

interface Props {
  items: [] | ReactNode[]
  itemsPerPage?: number
  totalItems?: number
  [rest: string]: unknown // ...rest property
}

const Pagination: FunctionComponent<Props> = ({ items, itemsPerPage = 6, ...rest }) => {
  const numberOfPages = []
  let totalItems = items.length
  let numStyles = {
    width: '5%',
    border: 'solid black 1px',
    display: 'flex',
    justifyContent: 'center',
    margin: '15px 0',
    padding: '25px'
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [childrenPerPage] = useState(itemsPerPage)

  //Change page
  const paginate = (number: number) => setCurrentPage(number)

  // Get current items
  const indexOfLastPage = currentPage * childrenPerPage
  const indexOfFirstPage = indexOfLastPage - childrenPerPage
  const currentItems = items.slice(indexOfFirstPage, indexOfLastPage)

  for (let i = 1; i <= Math.ceil(totalItems / childrenPerPage); i++) {
    numberOfPages.push(i)
  }

  return (
    <div className={styles['pagination-wrapper']} {...rest}>
      <div className={styles.wrapper}>
        {currentItems.map((num, index) => (
          <Price price={num} key={index} style={numStyles} />
        ))}
      </div>
      <div>
        {numberOfPages.map((number) => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Pagination
