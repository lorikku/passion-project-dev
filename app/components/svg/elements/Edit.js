import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

function Edit() {
  return (
    <Svg
      width={23}
      height={44}
      viewBox="0 0 23 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect
        width={11.527}
        height={28.299}
        rx={1}
        transform="scale(-1 1) rotate(-14.263 .907 88.445)"
        fill="#5BA4CF"
      />
      <Path
        d="M4.499 29.01l8.815 2.241a1 1 0 01.495 1.64l-6.524 7.204a1 1 0 01-1.713-.436l-2.291-9.444a1 1 0 011.218-1.204z"
        fill="#5BA4CF"
      />
    </Svg>
  );
}

export default Edit;
