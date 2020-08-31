import React, { ReactNode, FunctionComponent } from 'react'

interface Props {
  children: ReactNode
  justifyContent?: string
}

const Row: FunctionComponent<Props> = ({ children, justifyContent = 'space-around' }) => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      justifyContent,
      flexWrap: 'wrap',
      width: '100%'
    }}
  >
    {children}
  </div>
)

export default Row
