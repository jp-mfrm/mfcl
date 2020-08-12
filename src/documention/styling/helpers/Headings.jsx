import React from 'react';
import { Alert, Table, Input } from '../../../lib';
import { Clock, Search, DownCaret } from '../../../lib/icons';

import styles from './headings.module.scss';

const {
  heading1,
  heading2,
  heading3,
  heading4,
  heading5,
  heading6,
  rowEnd,
  header,
} = styles;

const headerTitles = [
  'Heading Four',
  'Heading Four',
  'Heading Four',
  'Heading Four',
  'Heading Four',
  'Heading Four',
];

const navBar = {
  alignItems: 'center',
  borderBottom: 'solid 2px transparent',
  color: '#8A8F9C',
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  justifyContent: 'space-between',
  padding: '10px 15px',
  textAlign: 'center',
  whiteSpace: 'nowrap',
};

const Card = ({ title, graph }) => ( // eslint-disable-line
  <div
    style={{
      backgroundColor: '#181818',
      marginRight: '20px',
      marginBottom: '20px',
      padding: '14px',
      width: '155px',
    }}
  >
    <div className={heading6}>HEADING SIX</div>
    <div className={heading2}>{title}</div>
    <div style={{ marginTop: '10px' }}>{graph}</div>
  </div>
);

const Headings = () => (
  <div>
    <div className={header}>
      <div style={{ display: 'flex' }}>
        <div
          className={heading3}
          style={{
            ...navBar,
            borderBottom: 'solid 2px #00ce7d',
            color: '#fff',
          }}
        >
          Three
        </div>
        <div className={heading3} style={navBar}>
          Three
        </div>
        <div className={heading3} style={navBar}>
          Three
        </div>
      </div>
      <div className={heading3}>
        Heading Three
        <DownCaret
          style={{ marginLeft: '10px', verticalAlign: 'middle' }}
          fillColor="#fff"
        />
      </div>
    </div>
    <div
      style={{
        background: '#181818',
        color: '#8a8f9c',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2px',
      }}
      className={heading4}
    >
      <div style={{ ...navBar, color: '#00ce7d' }}>
        Heading Four
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          style={{ marginLeft: '10px' }}
        >
          <g fill="#00ce7d" className="checkmark">
            <path
              fill="#00ce7d"
              d="M9,20c-0.3,0-0.5-0.1-0.7-0.3l-7-7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0L9,17.6L21.3,5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-13,13C9.5,19.9,9.3,20,9,20z"
            />
          </g>
        </svg>
      </div>
      <div
        className={heading4}
        style={{ ...navBar, borderBottom: 'solid 2px #fff', color: '#fff' }}
      >
        Heading Four
      </div>
      <div style={navBar} className={heading4}>
        Heading Four
      </div>
      <div style={navBar} className={heading4}>
        Heading Four
      </div>
      <div style={navBar} className={heading4}>
        Heading Four
      </div>
    </div>
    <div
      style={{
        background: '#181818',
        color: '#fff',
        marginBottom: '20px',
        padding: '18px',
      }}
      className={heading1}
    >
      Page Title - Heading One
    </div>
    <Alert
      color="primary"
      onClose={() => {}}
      // styleMode="dark"
    >
      <Clock
        fillColor="#004085"
        style={{ marginRight: 5, verticalAlign: 'middle' }}
      />
      <span className={heading3}> Heading Three in Titlecase</span>
      <span className={heading4}> Heading four in sentence format.</span>
    </Alert>
    <br />
    <br />
    <div className={rowEnd}>
      <div className={heading2}>Heading Two</div>
      <div
        className={heading5}
        style={{ color: '#389bff', fontWeight: 'bold' }}
      >
        HEADING FIVE
      </div>
    </div>
    <br />
    <Table>
      <thead>
        <tr>
          {headerTitles.map((title, i) => (
            <th className={heading4} key={i}> {/* eslint-disable-line */}
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={heading3}>Heading Three</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td className={heading3}>Heading Three</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      </tbody>
    </Table>
    <p className={heading4}>
      *Paragraph sizing and spacing in sentence format.
    </p>
    <br />
    <br />
    <div className={rowEnd}>
      <div className={heading2}>Heading Two</div>
      <div
        className={heading5}
        style={{ color: '#389bff', cursor: 'pointer', fontWeight: 'bold' }}
      >
        + HEADING FIVE ACTION
      </div>
    </div>
    <hr />
    <br />
    <div className={rowEnd}>
      <div className={heading2}>Heading Two</div>
      <div
        className={heading5}
        style={{ color: '#389bff', cursor: 'pointer', fontWeight: 'bold' }}
      >
        HEADING FIVE DROPDOWN{'  '} &#9662;
      </div>
    </div>
    <hr />
    <br />
    <Input leftIcon={<Search />} placeholder="Heading Three" styleMode="dark" />
    <br />
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <Card
        title="Heading Two"
        graph={
          <svg width="165" height="22">
            <polyline
              style={{
                fill: 'none',
                stroke: '#00ce7d',
                strokeWidth: '3',
              }}
              points="0,0 35,20 70,15 105,20 140,10 176,0 206,4"
            />
          </svg>
        }
      />
      <Card
        title="Heading Two"
        graph={
          <svg width="165" height="22">
            <polyline
              style={{
                fill: 'none',
                stroke: '#00ce7d',
                strokeWidth: '3',
              }}
              points="0,10 35,20 70,17 105,20 140,0 176,3 206,1"
            />
          </svg>
        }
      />
      <Card
        title="Heading Two"
        graph={
          <svg width="165" height="22">
            <polyline
              style={{
                fill: 'none',
                stroke: '#8a8f9c',
                strokeWidth: '3',
              }}
              points="0,0 35,20 70,15 105,3 140,8 176,2 206,16"
            />
          </svg>
        }
      />
      <Card
        title="Heading Two"
        graph={
          <svg width="165" height="22">
            <polyline
              style={{
                fill: 'none',
                stroke: '#fe0625',
                strokeWidth: '3',
              }}
              points="0,4 35,0 70,9 105,20 140,15 176,18 206,19"
            />
          </svg>
        }
      />
      <Card
        title="93"
        graph={
          <svg width="165" height="22">
            <polyline
              style={{
                fill: 'none',
                stroke: '#8a8f9c',
                strokeWidth: '3',
              }}
              points="0,0 35,20 70,15 105,20 140,10 176,0 206,4"
            />
          </svg>
        }
      />
      <Card
        title="0"
        graph={
          <svg width="165" height="22">
            <polyline
              style={{
                fill: 'none',
                stroke: '#389bff',
                strokeWidth: '3',
              }}
              points="0,10 35,20 70,17 105,5 140,16 176,10 206,11 "
            />
          </svg>
        }
      />
      <Card
        title="121"
        graph={
          <svg width="165" height="22">
            <polyline
              style={{
                fill: 'none',
                stroke: '#fe0625',
                strokeWidth: '3',
              }}
              points="0,0 35,20 70,15 105,3 140,8 176,2 206,16"
            />
          </svg>
        }
      />
      <Card
        title="66"
        graph={
          <svg width="165" height="22">
            <polyline
              style={{
                fill: 'none',
                stroke: '#fe0625',
                strokeWidth: '3',
              }}
              points="0,4 35,0 70,9 105,20 140,15 176,18 206,19"
            />
          </svg>
        }
      />
    </div>
  </div>
);

export default Headings;
