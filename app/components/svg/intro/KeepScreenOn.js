import * as React from "react"
import Svg, { Rect, Path, Circle } from "react-native-svg"

function KeepScreenOn() {
  return (
    <Svg
      width={143}
      height={249}
      viewBox="0 0 143 249"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect
        x={5}
        y={5}
        width={133}
        height={239}
        rx={15}
        stroke="#5BA4CF"
        strokeWidth={10}
      />
      <Rect x={40} y={229} width={68} height={4} rx={2} fill="#5BA4CF" />
      <Path
        d="M81.316 134.134c-3.312 8.485-15.32 8.485-18.632 0l-26.93-68.998C33.193 58.579 38.03 51.5 45.068 51.5H98.93c7.039 0 11.875 7.079 9.316 13.636l-26.931 68.998z"
        fill="#E4F0F6"
      />
      <Circle cx={72} cy={165} r={13} fill="#E4F0F6" />
    </Svg>
  )
}

export default KeepScreenOn
