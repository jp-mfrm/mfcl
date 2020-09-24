import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const NaturalMaterial: React.FunctionComponent<Props> = ({
  width = '26',
  height = '26',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...rest} fill="none" viewBox="0 0 26 26">
    <mask id="e9vvbau7aa" width="26" height="26" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M24.45 1c.238-.02.462.117.55.34.074.211.01.446-.16.59-2.692 2.575-4.543 5.904-5.31 9.55-.78 3.58-2.26 10.25-9.26 10.25-2.322.077-4.599-.646-6.45-2.05-.887 1.46-1.475 3.081-1.73 4.77.029.213-.068.422-.249.538-.18.115-.412.115-.592 0-.18-.116-.278-.325-.249-.538.265-1.961.947-3.843 2-5.52-1.33-1.472-2.045-3.397-2-5.38C1 9.77 3.29 1 24.45 1zM10.31 20.64c5.66 0 7.2-4.85 8.2-9.39h-.04c.707-3.42 2.332-6.583 4.7-9.15-18.99.34-21.08 8.08-21.08 11.45-.026 1.583.509 3.124 1.51 4.35 2.47-4.09 6.6-8.83 11.93-11.41.276-.13.605-.011.735.265s.011.605-.265.735c-4.86 2.545-8.885 6.437-11.59 11.21 1.67 1.333 3.764 2.021 5.9 1.94z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#e9vvbau7aa)">
      <path fill={fillColor} d="M-2 -2H28V28H-2z" />
    </g>
  </svg>
)

export default NaturalMaterial
