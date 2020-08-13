import React, { ReactNode, FunctionComponent } from 'react'

interface Props {
  children: ReactNode
}

const Row: FunctionComponent<Props> = ({ children }) => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      width: '100%'
    }}
  >
    {children}
  </div>
)

export default Row
