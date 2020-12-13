import * as React from 'react';
import Svg, { Rect } from 'react-native-svg';

function Pause() {
  return (
    <Svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width={27} height={27} rx={4} fill="#CF5B5B" />
    </Svg>
  );
}

export default Pause;
