import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  box: {
    alignItems: 'center',
    display: 'flex',
    height: '70px',
    justifyContent: 'center',
    margin: '10px',
    width: '70px',
  },
  words: {
    margin: '15px 0 5px',
  },
  wrapper: {
    cursor: 'pointer',
    display: 'flex',
  },
};

function pickTextColor(bgColor, lightColor, darkColor) {
  const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor;
}

class ColorBox extends Component {
  constructor(props) {
    super(props);

    this.state = { copySuccess: false };
  }

  handleClick = () => {
    if (navigator.clipboard.writeText) {
      navigator.clipboard.writeText(this.props.color);
      this.setState({ copySuccess: true });

      setTimeout(() => {
        this.setState({ copySuccess: false });
      }, 1000);
    }
  };

  render() {
    const { color, name, letter, border } = this.props;
    const { copySuccess } = this.state;
    return (
      <div
        style={styles.wrapper}
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
        role="button"
        tabIndex={0}
      >
        <div
          style={{
            background: color,
            color: pickTextColor(color, '#EEF1F5', '#17181A'),
            border,
            ...styles.box,
          }}
        >
          {copySuccess ? 'Copied!' : letter}
        </div>
        <div>
          <p style={styles.words}>{name}</p>
          <span>{color}</span>
        </div>
      </div>
    );
  }
}

ColorBox.propTypes = {
  border: PropTypes.string,
  color: PropTypes.string.isRequired,
  letter: PropTypes.string,
  name: PropTypes.string.isRequired,
};

ColorBox.defaultProps = {
  border: '1px solid #dadcdf',
  letter: '',
};

export default ColorBox;
