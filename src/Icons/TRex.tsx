import React from "react";

type Props = {
  fillColor?: string;
  height?: string;
  width?: string;
  [x: string]: unknown; // for the rest property
};

const TRex: React.FunctionComponent<Props> = ({
  fillColor = "#333030",
  width = "60px",
  height = "60px",
  ...rest
}) => (
  <svg
    id="Layer_1"
    width={width}
    height={height}
    viewBox="0 0 60 60"
    enableBackground="new 0 0 60 60"
    {...rest}
  >
    <g fillRule="evenodd">
      <g fill={fillColor}>
        <image
          id="image0"
          width={width}
          height={height}
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN RQflAhQPFALkGkJ9AAACXUlEQVRYw+2ZS28SURTHfxeQUoVY46OND3wkdWPTmGhca2LQ1DgL4wfw o/gJNHHh1u+A4kZrgztjfCW6UDH1RWoIsYUygK1wXVCGxwDDnZky09b/hrl3zjl/zv+euXNmRuAM u7S14Y2TonUccEhsGyEHvgcRk7MqDnsm9TqCHIBQceyA0OrGsWzODePYENxJxhuorz0aA4jEE9+G 9/JsjbdkcTX/e/h6zRNiEDZ023lr/J94+xO7cjmZ8eSoR8SVrJXFdpM6ke8cF16/SIyEOLK/c1yd 2PSMC297zRY/moivFiFzJ3NbIXb07AOIHe99Mn2eoe5VoXAMAmNKSYXiN50rsyWqOqYV3SP2NmMR RNBqUrshun4H4tIno+utp6f72wnNoEv2CXwudWTOTk6y/jDY/6wfimtqrvQdSu9bM9EZMO9Cg7C6 uHgPYPaulWWb1A20C65JK/duZB+/utb09L/UDVxIVXLOwyYtl8dEPGWrgk34bWWw85o974rr2QzA xXeBoNNQisSlDwBS+Yp1TOxWoPKPp3EbxPPTIINXMvaJq8u2Mq5+BUa6yp5VtfkeHNVW1UKsV5+f ROo18ipeLhTX+rL+S93LR1IDsPvwZcvnPYCXN5YWkBTUiR1KvbTAij3PfsSykofxA12TfzdkcqEy BrasprZoL0VgQjM2i+Q+uxn7p/XpDSnLWYyWX/8JgfD4oREQFzPp08ZgZf4YRE4lvjgh9rPUNR2k PnJiWUtFNyNj/0otAmfuw59c77ckJ27l0lB+o0485AZS+NxW1UBnVSdtfERyQWp7feI/mOKVpBhT 98kAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDItMjBUMTU6MjA6MDIrMDA6MDD0726JAAAAJXRF WHRkYXRlOm1vZGlmeQAyMDIxLTAyLTIwVDE1OjIwOjAyKzAwOjAwhbLWNQAAAABJRU5ErkJggg=="
        />
      </g>
    </g>
  </svg>
);

export default TRex;
