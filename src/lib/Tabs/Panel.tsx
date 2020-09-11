import React, { useState, FunctionComponent, useEffect, useRef } from 'react'
import clsx from 'clsx';
import styles from './tabs.module.scss'

export interface Props {
  id: string
  index?: number
  isSelected?: boolean
}

const Panel: FunctionComponent<Props> = ({ id, index, isSelected }) => {
  return (
    <section
    // aria-hidden={!isSelected}
    className='panel'
    id={id}
    role="tabpanel"
    // tabIndex={isSelected ? 0 : -1}
    >
      Panel Content
    {/* {React.Children.map(children, this.renderContents, this)} */}
  </section>
  
  )
}

export default Panel
