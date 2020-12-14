import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowLeft() {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 10 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8.42.186a1 1 0 111.16 1.628L8.42.186zM1 6.704l-.552.834a1 1 0 01-.029-1.649L1 6.704zm8.552 4.462a1 1 0 11-1.104 1.668l1.104-1.668zm.029-9.352L4.409 5.501 2.391 6.94l-.595.424-.16.114a58.038 58.038 0 00-.052.037l-.003.002L1 6.705l-.58-.815.003-.002.01-.008a196.449 196.449 0 01.797-.568l2.018-1.438L8.419.186l1.162 1.628zM1.552 5.87l8 5.296-1.104 1.668-8-5.296L1.552 5.87z"
        fill="#fff"
      />
    </Svg>
  )
}

export default ArrowLeft
