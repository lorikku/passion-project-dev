import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function BgTutorial() {
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
        fill="url(#prefix__paint2_linear)"
        fillOpacity={0.49}
        d="M0 0h375v667H0z"
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
          <Stop offset={1} stopColor="#022234" />
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
        <LinearGradient
          id="prefix__paint2_linear"
          x1={187.5}
          y1={0}
          x2={187.5}
          y2={667}
          gradientUnits="userSpaceOnUse"
        >
          <Stop />
          <Stop offset={1} stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default BgTutorial
