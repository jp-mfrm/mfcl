import React from 'react'

type Props = {
  fillColor?: string
  height?: string | number
  width?: string | number
  [x: string]: unknown // for the rest property
}

// TODO: get the correct SVG
const Star: React.FunctionComponent<Props> = ({ height = 16, width = 16, ...rest }) => {
  return (
    <svg viewBox="0 0 8 8" {...rest}>
      <path d="M3.67444 0.212345L2.63552 2.41511L0.312205 2.7684C0.0139737 2.81375 -0.105114 3.19732 0.110683 3.41748L1.79181 5.13257L1.39507 7.55424C1.34414 7.86508 1.65586 8.10212 1.92259 7.9554L4.00049 6.81247L6.07838 7.9554C6.34512 8.10212 6.65683 7.86508 6.60591 7.55424L6.20916 5.13257L7.89029 3.41748C8.10609 3.19732 7.987 2.81375 7.68877 2.7684L5.36545 2.41511L4.32653 0.212345C4.19315 -0.0704562 3.80782 -0.0704562 3.67444 0.212345Z" />
    </svg>
  )
}

export default Star
