import React from "react";

type Props = {
  fillColor?: string;
  height?: string;
  width?: string;
  [x: string]: unknown; // for the rest property
};

const TRex: React.FunctionComponent<Props> = ({
  width = "210px",
  height = "405px",
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 210 405"
    enableBackground="new 0 0 210 405"
    {...rest}
  >
    <image
      id="image1"
      width="210px"
      height="405px"
      x="0"
      y="0"
      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAAGVBAMAAAB5nbIRAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAGFBMVEUAAAAAAAD9zZILT64F G6/LdBxOLQX////uCBqrAAAAAXRSTlMAQObYZgAAAAFiS0dEBxZhiOsAAAAHdElNRQflAhQPIB5L Me3FAAABR0lEQVR42u3aPc6CMACAYX+i8+cNDCcw8QLGzwO4uDt5/yM4WIYakFI7WHjetbQPTE2B xSKl5S7qL2lSViQSiUSqWIqFXfNqTyKRSCQSiUQikUglWjVRJBKJRCKRSCQSiZTX+jiiA4lEIpFm Ko0RjpdXJxKJRCKRSCQSiUQa6NLZP4lEIpFIyVIPTCKRSKSZSu2X9STpHF9MIpFIJFJCWT9vkUgk Eqli6e3qUVKo3a5IJBKJRBruFC/V9MAkEolEql8KrcLwLaNr95I9MIlEIpHql9oKSgORSCQSiUQi kUikOUmhTfeajzgSiUQikT7AOaMkEolEInVVcmMkkUgk0tSlcNa5k0gkEon0S/sTiUQikX5SSpq8 DRvTN89CIpFIJBKJRCKRZiGlTS7x8otEIpFIFUslbpNEIpFIU5eKnIFIJBKJNHHpCUu7MVg/o/oX AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTAyLTIwVDE1OjMyOjMwKzAwOjAwKIR3vgAAACV0RVh0 ZGF0ZTptb2RpZnkAMjAyMS0wMi0yMFQxNTozMjozMCswMDowMFnZzwIAAAAASUVORK5CYII="
    />
  </svg>
);

export default TRex;
