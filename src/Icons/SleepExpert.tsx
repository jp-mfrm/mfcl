import React from "react";

type Props = {
  fillColor?: string;
  height?: string;
  width?: string;
  [x: string]: unknown; // for the rest property
};

const TRex: React.FunctionComponent<Props> = ({
  width = "255px",
  height = "405px",
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 255 405"
    enableBackground="new 0 0 255 405"
    {...rest}
  >
    <image
      id="image0"
      width="255"
      height="405"
      x="0"
      y="0"
      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAAGVBAMAAADDPjpxAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAG1BMVEUAAAAAAAD9zZILT67s MBoFG6/LdBxOLQX///+WYpK/AAAAAXRSTlMAQObYZgAAAAFiS0dECIbelXoAAAAHdElNRQflAhQP GznSibeWAAABjUlEQVR42u3aMU7DMBQG4EIlWIm4QNQTgEpvwAEQEnsnZia4PkNekGxFVe2YIuTv 3yLb7/9GK8lmU5GrIcldzYxVAQAAAAAA6BiQFg+7KSMAAAAAAAAAAAAAAAAAQEeAyPUuCQAAAAAA AAAAAAAAAABAD4DtfspwMrHpAQAAAAAAAKBl834xj2nxfboKAAAAAAAAcAFAlqfnKQAAAAAAAAAt Adu04vBWkNd4iQ4AAAAAAACwCjB/ni4pBgAAAAAAAGgDiMNjPNYAXpZHnS4CAAAAAAAA+LkAZNvW ALLJWXIQAAAAAAAAwO8BzgwAAAAAAEDHgCgel1cBAAAAAAAA/hzwXpEjAAAAAAAAAAAAAAAAAAAA AAAAAAAAQBngrNzE7K/FfAIAAAAAAABcDlCzCgAAAAAAAAAAAAAAAADQA2BObDoCAAAAAAAAtGwu mgkAAAAAAAAAAAAAAAAAABC/ln0AAAAAAAAAtCi+jWFFhwAAAAAAAAAAAAAAAAAA/jdgblwzBAAA AAAAAKDq7Dcp/H8HpVArBAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMi0yMFQxNToyNzo1Nysw MDowMAzrVDMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDItMjBUMTU6Mjc6NTcrMDA6MDB9tuyP AAAAAElFTkSuQmCC"
    />
  </svg>
);

export default TRex;
