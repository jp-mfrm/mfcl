import React, { FunctionComponent, useState } from 'react'

import styles from './pagination.module.scss'

interface Props {
  itemsPerPage: number
  totalItems: number
  // paginate: Function
  [rest: string]: unknown // ...rest property
}

const Pagination: FunctionComponent<Props> = ({ itemsPerPage = 5, totalItems, ...rest }) => {
  let items = Array.from(Array(51).keys())
  const numberOfPages = []

  const [currentPage, setCurrentPage] = useState(1)
  const [childrenPerPage] = useState(itemsPerPage)

  //Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Get current items
  const indexOfLastPage = currentPage * childrenPerPage
  const indexOfFirstPage = indexOfLastPage - childrenPerPage
  const currentItems = items.splice(indexOfFirstPage, indexOfLastPage)

  for (let i = 1; i <= Math.ceil(totalItems / childrenPerPage); i++) {
    numberOfPages.push(i)
  }

  return (
    <div className={styles['pagination-wrapper']} {...rest}>
      <TestSubject items={currentItems} />
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

interface TextProps {
  items: number[]
}

const TestSubject: FunctionComponent<TextProps> = ({ items }) => {
  let styles = {
    width: '150px',
    height: '150px',
    border: 'solid black 1px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '15px 0'
  }

  const panelMap = items.map((number, i) => {
    return (
      <div style={styles} key={i}>
        {number}
      </div>
    )
  })

  return <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>{panelMap}</div>
}
