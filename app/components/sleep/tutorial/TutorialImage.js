import * as React from 'react';

import RemMegaphone from '../../svg/intro/RemMegaphone';
import SleepIcon from '../../svg/elements/SleepIcon';
import KeepScreenOn from '../../svg/intro/KeepScreenOn';

const images = [
  <SleepIcon />,
  <RemMegaphone />,
  <SleepIcon active={true} />,
  <KeepScreenOn />,
];

export default TutorialImage = ({ tutorialStep }) => {
  return images[tutorialStep];
};
