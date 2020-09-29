import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const WarrantyCertificate: React.FunctionComponent<Props> = ({
  width = '20',
  height = '24',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 20 24" {...rest}>
    <mask id="z6tfzilwma" width="20" height="24" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M2 24h16c.828 0 1.5-.672 1.5-1.5v-21C19.5.672 18.828 0 18 0H2C1.172 0 .5.672.5 1.5v21c0 .828.672 1.5 1.5 1.5zM1.5 1.5c0-.276.224-.5.5-.5h16c.276 0 .5.224.5.5v21c0 .276-.224.5-.5.5H2c-.276 0-.5-.224-.5-.5v-21zM15.81 4H4c-.276 0-.5-.224-.5-.5S3.724 3 4 3h11.81c.276 0 .5.224.5.5s-.224.5-.5.5zM4 6.5h11.81c.276 0 .5-.224.5-.5s-.224-.5-.5-.5H4c-.276 0-.5.224-.5.5s.224.5.5.5zM15.81 9H4c-.276 0-.5-.224-.5-.5S3.724 8 4 8h11.81c.276 0 .5.224.5.5s-.224.5-.5.5zM4 11.5h3.7c.276 0 .5-.224.5-.5s-.224-.5-.5-.5H4c-.276 0-.5.224-.5.5s.224.5.5.5zm12.82 3.9c.006-1.876-1.376-3.467-3.233-3.726-1.858-.258-3.621.896-4.128 2.702-.506 1.806.4 3.709 2.121 4.454l-.73 2.42c-.037.127-.022.264.042.38.063.117.17.203.298.24h.14c.218-.002.412-.143.48-.35l.73-2.45c.354.067.716.067 1.07 0l.73 2.45c.069.207.262.348.48.35h.14c.127-.037.235-.123.298-.24.064-.116.08-.253.042-.38l-.73-2.42c1.363-.597 2.245-1.942 2.25-3.43zm-6.48-.007c-.004 1.512 1.218 2.741 2.73 2.747.728.003 1.428-.285 1.944-.799s.806-1.213.806-1.941c0-1.512-1.225-2.738-2.737-2.74-1.512-.002-2.74 1.221-2.743 2.733z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#z6tfzilwma)">
      <path fill={fillColor} d="M-5 -3H25V27H-5z" />
    </g>
  </svg>
)

export default WarrantyCertificate
