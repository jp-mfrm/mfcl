import React, { FunctionComponent, useState } from 'react'

const styles = {
  box: {
    alignItems: 'center',
    display: 'flex',
    height: '70px',
    justifyContent: 'center',
    margin: '10px',
    width: '70px'
  },
  words: {
    margin: '15px 0 5px'
  },
  wrapper: {
    cursor: 'pointer',
    display: 'flex'
  }
}

function pickTextColor(bgColor, lightColor, darkColor) {
  const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor
  const r = parseInt(color.substring(0, 2), 16) // hexToR
  const g = parseInt(color.substring(2, 4), 16) // hexToG
  const b = parseInt(color.substring(4, 6), 16) // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor
}

interface Props {
  border?: string
  color: string
  letter?: string
  name: string
}

const ColorBox: FunctionComponent<Props> = ({ color, name, letter, border }) => {
  const [copySuccess, setCopySuccess] = useState(false)

  const handleClick = () => {
    if (navigator.clipboard.writeText) {
      navigator.clipboard.writeText(color)
      setCopySuccess(true)

      setTimeout(() => {
        setCopySuccess(false)
      }, 1000)
    }
  }

  return (
    <div style={styles.wrapper} onClick={handleClick} onKeyPress={handleClick} role="button" tabIndex={0}>
      <div
        style={{
          border,
          backgroundColor: color,
          color: pickTextColor(color, '#EEF1F5', '#17181A'),
          ...styles.box
        }}
      >
        {copySuccess ? 'Copied!' : letter}
      </div>
      <div>
        <p style={styles.words}>{name}</p>
        <span>{color}</span>
      </div>
    </div>
  )
}

ColorBox.defaultProps = {
  border: '1px solid #dadcdf',
  letter: ''
}

export default ColorBox
