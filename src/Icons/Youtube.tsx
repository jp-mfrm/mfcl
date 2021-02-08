import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  variant?: 'stencil' | 'red'
  [x: string]: unknown // for the rest property
}

const Youtube: React.FunctionComponent<Props> = ({
  width,
  height,
  fillColor = '#2D2926',
  variant = 'stencil',
  ...rest
}) => {
  switch (variant) {
    case 'red':
      width = width ?? '35'
      height = height ?? '35'
      return (
        <svg width={width} height={height} viewBox="0 0 35 35" fill="none" {...rest}>
          <rect  width={width} height={height} rx="17.5" fill="#D63426" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M28 21.5642V14.4358C28 14.4358 28 11 24.5534 11H11.4454C11.4454 11 8 11 8 14.4358V21.5642C8 21.5642 8 25 11.4454 25H24.5534C24.5534 25 28 25 28 21.5642ZM21.8829 18.01L15.3354 21.8432V14.1756L21.8829 18.01Z"
            fill="white"
          />
        </svg>
      )
    default:
      width = width ?? '30'
      height = height ?? '30'
      return (
        <svg width={width} height={height} viewBox="0 0 26 20" {...rest}>
          <path
            fill={fillColor}
            fillRule="evenodd"
            d="M9.49 19.16c1.166.116 2.338.173 3.51.17 1.172 0 2.344-.06 3.51-.18l5.29-.48c1.863-.198 3.258-1.798 3.2-3.67V5c.063-1.878-1.332-3.487-3.2-3.69L16.49.82c-2.329-.21-4.671-.21-7 0l-5.29.49C2.332 1.513.937 3.122 1 5v10c-.063 1.876 1.334 3.482 3.2 3.68l5.29.48zM13 1.72c-1.14 0-2.29 0-3.42.16l-5.3.48C2.948 2.51 1.955 3.66 2 5v10c-.04 1.334.953 2.475 2.28 2.62l5.3.49c2.275.21 4.565.21 6.84 0l5.3-.49c1.327-.145 2.32-1.286 2.28-2.62V5c.04-1.336-.952-2.48-2.28-2.63l-5.3-.48c-1.13-.12-2.28-.17-3.42-.17zm-2.74 13.49c.074.04.156.06.24.06.096-.001.19-.029.27-.08l7-4.75c.143-.1.23-.265.23-.44.008-.183-.08-.357-.23-.46l-7-4.75c-.155-.1-.355-.1-.51 0-.162.096-.261.271-.26.46v9.5c0 .188.1.362.26.46zm.74-1.43V6.21L16.58 10 11 13.78z"
            clipRule="evenodd"
          />
        </svg>
      )
  }
}

export default Youtube
