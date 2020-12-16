import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown
}

const PurpleBrand: React.FunctionComponent<Props> = ({ width = 123, height = 39, fillColor = '#4F2E7B', ...rest }) => (
  <svg width={width} height={height} viewBox="0 0 123 39" {...rest}>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(0 8.067)">
        <path d="M0 .139h24.045v30.23H0z" />
        <path
          fill={fillColor}
          d="M.968.686h4.346a.97.97 0 0 1 .97.97v1.947h.092a7.56 7.56 0 0 1 1.07-1.209c.44-.41.956-.78 1.548-1.116a9.68 9.68 0 0 1 1.935-.82 7.682 7.682 0 0 1 2.232-.319c1.64 0 3.127.282 4.463.842a10 10 0 0 1 3.438 2.37c.956 1.02 1.693 2.228 2.21 3.624.515 1.399.773 2.933.773 4.602 0 1.55-.235 3.031-.706 4.444-.47 1.413-1.14 2.666-2.004 3.76a9.759 9.759 0 0 1-3.164 2.62c-1.246.652-2.658.98-4.235.98-1.429 0-2.757-.221-3.985-.66a6.383 6.383 0 0 1-3.03-2.256h-.09v8.933a.97.97 0 0 1-.97.97H.968a.969.969 0 0 1-.968-.97V1.656c0-.536.433-.97.968-.97M6.284 11.76c0 1.67.478 3.022 1.435 4.054.957 1.033 2.3 1.55 4.03 1.55 1.731 0 3.075-.517 4.03-1.55.958-1.032 1.435-2.384 1.435-4.054 0-1.672-.477-3.024-1.435-4.057-.955-1.033-2.299-1.549-4.03-1.549-1.73 0-3.073.516-4.03 1.549-.957 1.033-1.435 2.385-1.435 4.057"
        />
      </g>
      <path
        fill={fillColor}
        d="M48.215 9.078h4.75c.52 0 .943.427.943.952v2.541h.087c.708-1.343 1.549-2.352 2.522-3.022.973-.673 2.197-1.008 3.671-1.008.383 0 .767.015 1.15.045l.193.016c.49.037.869.452.869.95v4.12a.947.947 0 0 1-1.094.942l-.3-.05a8.902 8.902 0 0 0-1.436-.113c-1.268 0-2.271.18-3.008.54-.74.357-1.305.856-1.704 1.499-.397.643-.656 1.41-.773 2.305a22.675 22.675 0 0 0-.177 2.956v8.138a.948.948 0 0 1-.943.954h-4.75a.948.948 0 0 1-.942-.954V10.03c0-.525.422-.952.942-.952"
      />
      <g transform="translate(63.818 8.067)">
        <path d="M.124.139h23.88v30.23H.124z" />
        <path
          fill={fillColor}
          d="M1.088.686h4.315c.532 0 .963.434.963.97v1.947h.09A7.498 7.498 0 0 1 7.52 2.394c.436-.41.949-.78 1.538-1.116a9.53 9.53 0 0 1 1.922-.82 7.573 7.573 0 0 1 2.216-.319c1.626 0 3.105.282 4.432.842a9.912 9.912 0 0 1 3.413 2.37c.952 1.02 1.68 2.228 2.193 3.624.513 1.399.77 2.933.77 4.602 0 1.55-.234 3.031-.701 4.444-.468 1.413-1.13 2.666-1.99 3.76a9.701 9.701 0 0 1-3.143 2.62c-1.237.652-2.638.98-4.207.98-1.416 0-2.735-.221-3.956-.66A6.339 6.339 0 0 1 7 20.465h-.091v8.933c0 .537-.432.97-.965.97H1.088a.967.967 0 0 1-.964-.97V1.656c0-.536.432-.97.964-.97M6.366 11.76c0 1.67.475 3.022 1.425 4.054.948 1.033 2.283 1.55 4.002 1.55 1.718 0 3.053-.517 4.001-1.55.95-1.032 1.426-2.384 1.426-4.054 0-1.672-.476-3.024-1.426-4.057-.948-1.033-2.283-1.549-4.001-1.549-1.72 0-3.054.516-4.002 1.549-.95 1.033-1.425 2.385-1.425 4.057"
        />
      </g>
      <path
        fill={fillColor}
        d="M116.014 26.913c.373.28.422.83.107 1.178a10.731 10.731 0 0 1-3.498 2.561 11.957 11.957 0 0 1-5.086 1.14c-1.666 0-3.235-.272-4.706-.821-1.474-.545-2.753-1.33-3.837-2.347-1.089-1.017-1.942-2.242-2.567-3.672-.624-1.426-.937-3.023-.937-4.785 0-1.763.313-3.357.937-4.787.625-1.428 1.478-2.651 2.567-3.67 1.084-1.018 2.363-1.801 3.837-2.347 1.47-.549 3.04-.822 4.706-.822 1.546 0 2.952.273 4.217.822a8.778 8.778 0 0 1 3.212 2.347c.877 1.019 1.553 2.242 2.03 3.67.475 1.43.713 3.024.713 4.787v1.143c0 .553-.438 1-.978 1h-14.548c.268 1.307.848 2.347 1.74 3.123.893.775 1.992 1.164 3.3 1.164 1.1 0 2.032-.253 2.79-.753a7.31 7.31 0 0 0 1.457-1.274.912.912 0 0 1 1.238-.132l3.306 2.475zm-4.998-9.254c.03-1.154-.342-2.143-1.115-2.963-.774-.822-1.77-1.23-2.989-1.23-.744 0-1.399.12-1.962.364a4.945 4.945 0 0 0-1.451.934c-.403.38-.713.822-.936 1.323a4.408 4.408 0 0 0-.38 1.572h8.833zM39.11 9.016c-.74 0-1.34.604-1.34 1.35v9.486c0 .717-.045 1.404-.134 2.061a5.128 5.128 0 0 1-.555 1.769c-.283.523-.69.94-1.222 1.254-.533.313-1.23.47-2.09.47-.86 0-1.518-.18-1.976-.538a3.2 3.2 0 0 1-1.024-1.389 6.184 6.184 0 0 1-.399-1.857 29.435 29.435 0 0 1-.066-1.948v-9.308c0-.746-.6-1.35-1.342-1.35h-4.687a.642.642 0 0 0-.639.644v.615c0 .29.098.569.266.802a13.384 13.384 0 0 1 1.697 3.212c.61 1.66.918 3.487.918 5.43a16.5 16.5 0 0 1-.823 5.193 15.75 15.75 0 0 1-.807 1.966c-.205.413-.167.904.076 1.294l.119.19c.578.926 1.391 1.65 2.443 2.173 1.052.52 2.422.782 4.111.782.8 0 1.54-.105 2.222-.314a7.793 7.793 0 0 0 1.823-.805 6.04 6.04 0 0 0 1.354-1.118c.37-.42.675-.838.913-1.254h.09v1.603c0 .746.6 1.352 1.34 1.352h3.718c.74 0 1.34-.606 1.34-1.352V10.366c0-.746-.6-1.35-1.34-1.35H39.11zM86.981.96v8.29c0 .856.301 1.672.803 2.358a12.067 12.067 0 0 1 1.607 3.02c.552 1.516.832 3.187.832 4.972 0 1.652-.252 3.257-.75 4.77a13.78 13.78 0 0 1-1.577 3.28c-.183.28-.915 1.323-.915 2.637v.545c0 .53.424.96.948.96h4.722c.525 0 .949-.43.949-.96V.959C93.6.43 93.176 0 92.65 0H87.93a.953.953 0 0 0-.948.96"
      />
      <g transform="translate(117.709 9.016)">
        <path d="M.1.011h4.479v4.256H.099z" />
        <path
          fill={fillColor}
          d="M4.579 2.126c0 1.2-.97 2.141-2.233 2.141C1.096 4.267.1 3.326.1 2.127.1.952 1.097.01 2.346.01c1.263 0 2.233.942 2.233 2.115zm-3.921 0c0 .942.717 1.69 1.701 1.69.957 0 1.661-.748 1.661-1.677 0-.941-.704-1.702-1.674-1.702s-1.688.76-1.688 1.69zM2 3.236h-.505V1.12c.2-.04.479-.065.837-.065.413 0 .599.065.758.155a.58.58 0 0 1 .213.464c0 .232-.186.413-.452.49v.026c.212.077.332.232.399.516.066.322.106.451.16.529h-.546c-.066-.078-.106-.271-.173-.516-.04-.232-.173-.335-.452-.335H2v.85zm.013-1.2h.24c.279 0 .505-.09.505-.31 0-.193-.146-.322-.465-.322-.133 0-.226.013-.28.026v.606z"
        />
      </g>
    </g>
  </svg>
)

export default PurpleBrand