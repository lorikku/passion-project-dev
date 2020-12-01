import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackIcon() {
  return (
    <Svg
      width={44}
      height={44}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 44c12.15 0 22-9.85 22-22S34.15 0 22 0 0 9.85 0 22s9.85 22 22 22zm3.5-31.526L12 20.268c-1.333.77-1.333 2.694 0 3.464l13.5 7.794c1.333.77 3-.192 3-1.732V14.206c0-1.54-1.667-2.502-3-1.732z"
        fill="#5BA4CF"
      />
    </Svg>
  )
}

export default BackIcon
