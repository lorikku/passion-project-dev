import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

function Bg() {
  return (
    <Svg
      width={'100%'}
      height={'100%'}
      viewBox="0 0 375 667"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin slice"
    >
      <Path fill="url(#prefix__paint0_linear)" d="M0 0h375v667H0z" />
      <Path fill="url(#prefix__paint1_linear)" d="M0 0h375v507H0z" />
      <Path
        d="M128.537 421.463c-16.805 5.103-39.012 20.032-48.015 26.859L11 582.95 513.158 590c5.168-31.559 6.902-97.765-27.509-110.12-43.014-15.443-35.511-22.493-61.019-48.009-25.508-25.515-117.217-78.66-135.63-75.371-15.953 2.849-22.92 9.904-58.431 18.297-35.511 8.393-51.516 27.53-66.021 34.58-14.504 7.05-15.005 5.708-36.011 12.086z"
        fill="#154A68"
      />
      <Path
        d="M-51.93 402.248c-23.088 7.906-85.667 19.369-114.07 24.113v237.573L435.964 692v-62.062c.458-34.654-3.298-108.311-21.989-125.704-23.364-21.741-35.733-58.899-47.415-58.899-11.682 0-32.985-31.229-52.226-43.087-19.24-11.859-50.163-11.464-102.388-27.276-52.226-15.812-80.015-20.611-94.446-15.472-11.545 4.111-50.319 3.35-75.286 7.171-21.76 8.565-71.054 27.671-94.143 35.577z"
        fill="#0C3953"
      />
      <Path
        d="M54.88 542.26c-20 5.11-46.428 20.057-57.142 26.891L-85 703.941 512.617 711c6.151-31.597 8.214-97.882-32.738-110.252-51.19-15.462-42.262-22.521-72.619-48.067C376.903 527.134 306.543 471 243.57 471c-19.286 0-25 16.134-67.261 24.538-42.262 8.403-61.31 27.563-78.572 34.622-17.261 7.058-17.857 5.714-42.856 12.1z"
        fill="#022234"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={187.5}
          y1={0}
          x2={187.5}
          y2={667}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.141} stopColor="#E4F0F6" />
          <Stop offset={0.51} stopColor="#0079BF" stopOpacity={0.96} />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={187.5}
          y1={0}
          x2={187.5}
          y2={507}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#0079BF" stopOpacity={0.87} />
          <Stop offset={1} stopColor="#E4F0F6" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default Bg;
