import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function SleepIcon({ active }) {
  return active ? (
    <Svg
      width={249}
      height={249}
      viewBox="0 0 249 249"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx={124} cy={124} r={86} fill="#0E3A54" />
      <Circle cx={124} cy={124} r={100} fill="#0E3A54" fillOpacity={0.6} />
      <Circle cx={124} cy={124} r={113} fill="#0E3A54" fillOpacity={0.6} />
      <Path
        d="M147.789 169.491c-24.889 12.902-55.524 3.186-68.427-21.702-12.902-24.889-3.186-55.524 21.702-68.427 24.889-12.902 55.524-3.186 68.427 21.702 12.902 24.889 3.186 55.524-21.702 68.427z"
        fill="#FFE600"
      />
    </Svg>
  ) : (
    <Svg
      width={192}
      height={192}
      viewBox="0 0 192 192"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx={96} cy={96} r={73.062} fill="#0E3A54" />
      <Circle cx={96} cy={96} r={84.956} fill="#0E3A54" fillOpacity={0.6} />
      <Circle cx={96} cy={96} r={96} fill="#0E3A54" fillOpacity={0.8} />
      <Path
        d="M145.286 82.979c7.362 27.05-8.599 54.946-35.65 62.307-27.05 7.362-54.946-8.599-62.307-35.65-7.361-27.05 8.6-54.946 35.65-62.307 27.05-7.361 54.946 8.6 62.307 35.65z"
        fill="#022234"
      />
    </Svg>
  );
}

export default SleepIcon;
