import * as React from 'react';

import RemMegaphone from '../../svg/intro/RemMegaphone';
import SleepIcon from '../../svg/elements/SleepIcon';

const images = [
  <SleepIcon />,
  <RemMegaphone />,
  <SleepIcon active={true} />,
];

export default TutorialImage = ({ tutorialStep }) => {
  return images[tutorialStep];
};
