import React, { FunctionComponent } from 'react'

import styles from './pagination.module.scss'

interface Props {
  pageLimit: number
  [rest: string]: unknown // ...rest property
}

const Pagination: FunctionComponent<Props> = ({ ...rest }) => {
  return (
    <div className={styles['pagination-wrapper']} {...rest}>
      <TestSubject />
    </div>
  )
}

export default Pagination

const TestSubject: FunctionComponent = () => {
  let numArr = Array.from(Array(51).keys())
  let styles = {
    width: '150px',
    height: '150px',
    border: 'solid black 1px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '15px 0'
  }

  const panelMap = numArr.map((number, i) => {
    return (
      <div style={styles} key={i}>
        {number}
      </div>
    )
  })

  return <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>{panelMap}</div>
}
