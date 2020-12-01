import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ArrowRight() {
  return (
    <Svg
      width={10}
      height={13}
      viewBox="0 0 10 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1.58.186A1 1 0 10.42 1.814L1.58.186zM9 6.704l.552.834a1 1 0 00.029-1.649L9 6.704zM.448 11.166a1 1 0 101.104 1.668L.448 11.166zM.419 1.814l5.172 3.687L7.609 6.94l.595.424.16.114.041.03.01.007.004.002L9 6.705l.58-.815-.003-.002a16.387 16.387 0 01-.212-.151L8.77 5.31 6.752 3.873 1.581.186.419 1.814zM8.448 5.87l-8 5.296 1.104 1.668 8-5.296L8.448 5.87z"
        fill="#fff"
      />
    </Svg>
  );
}

export default ArrowRight;
