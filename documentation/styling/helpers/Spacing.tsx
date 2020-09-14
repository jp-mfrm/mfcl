import React from 'react'

const spacing = [
  {
    token: 'spacing-xxs',
    value: '5px',
    ratio: '1'
  },
  {
    token: 'spacing-xs',
    value: '10px',
    ratio: '2'
  },
  {
    token: 'spacing-s',
    value: '15px',
    ratio: '3'
  },
  {
    token: 'spacing-m',
    value: '30px',
    ratio: '6'
  },
  {
    token: 'spacing-l',
    value: '60px',
    ratio: '12'
  },
  {
    token: 'spacing-xl',
    value: '90px',
    ratio: '18'
  },
  {
    token: 'spacing-xxl',
    value: '120px',
    ratio: '24'
  }
]

const table = {
  tableLayout: 'fixed',
  width: '75%'
}

const tdHead = {
  borderBottom: '1px solid #e7e8ea',
  padding: '0.75rem'
}

const tr = {
  marginBottom: '10px'
}

const td = {
  padding: '0.75rem'
}

const Spacing = () => (
  <table style={table}>
    <thead>
      <tr>
        <td style={tdHead}>Token</td>
        <td style={tdHead}>Value</td>
        <td style={tdHead}>Ratio</td>
        <td style={tdHead}>Example</td>
      </tr>
    </thead>
    <tbody>
      {spacing.map((space) => (
        <tr key={space.token} style={tr}>
          <td style={td}>{space.token}</td>
          <td style={td}>{space.value}</td>
          <td style={td}>{space.ratio}</td>
          <td style={td}>
            <span
              style={{
                height: space.value,
                width: space.value,
                background: 'rgba(153, 102, 204, 0.2)',
                display: 'block'
              }}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default Spacing
