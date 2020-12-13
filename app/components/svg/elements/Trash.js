import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

function Trash() {
  return (
    <Svg
      width={20}
      height={36}
      viewBox="0 0 20 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect x={1.111} y={5} width={17.778} height={31} rx={3} fill="#CF5B5B" />
      <Path
        d="M19.444 2.5H.556l4.326-1.145a20 20 0 0110.236 0L19.444 2.5z"
        stroke="#CF5B5B"
        strokeLinejoin="round"
      />
      <Rect y={2} width={20} height={2} rx={1} fill="#CF5B5B" />
    </Svg>
  );
}

export default Trash;
