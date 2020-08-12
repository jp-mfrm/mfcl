import React from 'react';
import ColorBox from './ColorBox';

export const mainColors = [
  { color: '#00CE7D', name: '$main-green' },
  { color: '#389BFF', name: '$blue-accent' },
  { color: '#8459D4', name: '$purple-accent' },
  { color: '#FE0625', name: '$red-accent' },
];

const lightMode = [
  { color: 'transparent', name: '$transparent', letter: 'T' },
  { color: '#FFFFFF', name: '$white', letter: 'W' },
  { color: '#F9FAFB', name: '$gray-1', letter: '1' },
  { color: '#F5F6F7', name: '$gray-2', letter: '2' },
  { color: '#E7E8EA', name: '$gray-3', letter: '3' },
  { color: '#DADCDF', name: '$gray-4', letter: '4' },
  { color: '#CED1D5', name: '$gray-5', letter: '5' },
  { color: '#AFB3BA', name: '$gray-6', letter: '6' },
  { color: '#8A8F9C', name: '$gray-7', letter: '7' },
  { color: '#626669', name: '$gray-8', letter: '8' },
  { color: '#545658', name: '$gray-9', letter: '9' },
  { color: '#2F3337', name: '$gray-10', letter: '10' },
  { color: '#22252A', name: '$gray-11', letter: '11' },
  { color: '#17181A', name: '$gray-12', letter: '12' },
];

const darkMode = [
  { color: '#282828', name: '$gray-13', letter: '13' },
  { color: '#181818', name: '$gray-14', letter: '14' },
  { color: '#080808', name: '$gray-15', letter: '15' },
  { color: '#000000', name: '$black', letter: 'B' },
];

const Colors = () => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    }}
  >
    <div>
      <h2>Accent Colors</h2>
      {mainColors.map(color => (
        <ColorBox
          border="none"
          key={color.color}
          color={color.color}
          name={color.name}
        />
      ))}
    </div>
    <div>
      <h2>Light Mode</h2>
      {lightMode.map(color => (
        <ColorBox
          color={color.color}
          name={color.name}
          key={color.color}
          letter={color.letter}
        />
      ))}
    </div>
    <div>
      <h2>Dark Mode</h2>
      {darkMode.map(color => (
        <ColorBox
          color={color.color}
          name={color.name}
          key={color.color}
          letter={color.letter}
        />
      ))}
    </div>
  </div>
);

export default Colors;
