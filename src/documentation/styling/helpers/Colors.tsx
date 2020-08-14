import React from 'react'
import ColorBox from './ColorBox'

export const mainColors = [
  { color: '#d63426', name: '$red' },
  { color: '#fccc0b', name: '$yellow' },
  { color: '#119e16', name: '$green' },
  { color: '#0094ff', name: '$blue' }
]

const grayScale = [
  { color: 'transparent', name: '$transparent', letter: 'T' },
  { color: '#fff', name: '$white', letter: 'W' },
  { color: '#f8f8f8', name: '$gray-1', letter: '1' },
  { color: '#f5f6f7', name: '$gray-2', letter: '2' },
  { color: '#e1e1e1', name: '$gray-3', letter: '3' },
  { color: '#d8d8d8', name: '$gray-4', letter: '4' },
  { color: '#b3b5b7', name: '$gray-5', letter: '5' },
  { color: '#979797', name: '$gray-6', letter: '6' },
  { color: '#87817d', name: '$gray-7', letter: '7' },
  { color: '#626366', name: '$gray-8', letter: '8' },
  { color: '#545658', name: '$gray-9', letter: '9' },
  { color: '#2f3337', name: '$gray-10', letter: '10' },
  { color: '#2d2926', name: '$gray-11', letter: '11' },
  { color: '#323030', name: '$gray-12', letter: '12' },
  { color: '#000', name: '$black', letter: 'B' }
]

const Colors = () => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    }}
  >
    <div>
      <h2>Accent Colors</h2>
      {mainColors.map((color) => (
        <ColorBox border="none" key={color.color} color={color.color} name={color.name} />
      ))}
    </div>
    <div>
      <h2>Gray Scale</h2>
      {grayScale.map((color) => (
        <ColorBox color={color.color} name={color.name} key={color.color} letter={color.letter} />
      ))}
    </div>
  </div>
)

export default Colors
