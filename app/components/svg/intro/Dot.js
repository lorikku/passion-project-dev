import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';

function Dot({ active }) {
  return active ? (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx={7.5} cy={7.5} r={7} fill="#E4F0F6" stroke="#E4F0F6" />
    </Svg>
  ) : (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx={7.5} cy={7.5} r={7} stroke="#E4F0F6" />
    </Svg>
  );
}

export default Dot;
