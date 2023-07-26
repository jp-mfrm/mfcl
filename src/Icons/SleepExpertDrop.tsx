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
      id="image2"
      width="255px"
      height="405px"
      x="0"
      y="0"
      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAAGVBAMAAADDPjpxAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAGFBMVEUAAAAAAAD9zZILT64F G6/LdBxOLQX////uCBqrAAAAAXRSTlMAQObYZgAAAAFiS0dEBxZhiOsAAAAHdElNRQflAhQPICnz jEjKAAABhElEQVR42u3ZMW7CMBSA4bSoncsNECeo1B6gajlAF5iZuP8RGPoyGFEX21AL+fvHKHnv y5RInqaKHpZJLzUzmgIAAAAAABgYkC5ern9aAQAAAAAAAAAAAAAAAAAMBIge10kAAAAAAAAAAAAA AAAAACMAFm8FvQIAAAAAAABcc3PMfN+cDQAAAAAAAOAfAJtsAAAAAAAAAN0B0RcAAAAAAADADQDz 8fRFgLmis+w/bgYAAAAAABgYcHK9CBB9xoz8q10IAwAAAAAAGAjwy/UawEf6LietpiIYAAAAAAAA QAugLAAAAAAAgIEB+c80AAAAAAAAQHfAtqJvAAAAAAAAAAAAAAAAAIA7A+QDAAAAAAAA6A6IntIV u8PZAAAAAAAAAG4ImMuvAAAAAAAAAOgOiOafBwAAAAAAAAAAAAAAAAAAAAAAAAAAAIBrLq6aGUfa ewAAAAAAAAAAAAAAAACA+wa0DAEAAAAAAADoBniOh5oWAwAAAAAAALQMAQAAAAAAACh79ggp3wRX e6cTQwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMi0yMFQxNTozMjo0MCswMDowMCJBfqcAAAAl dEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDItMjBUMTU6MzI6NDArMDA6MDBTHMYbAAAAAElFTkSuQmCC"
    />
  </svg>
);

export default TRex;
