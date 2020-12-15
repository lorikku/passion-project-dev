import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ArrowLeft from '../../svg/intro/ArrowLeft';
import ArrowRight from '../../svg/intro/ArrowRight';
import Dot from '../../svg/intro/Dot';

export default BottomSlider = ({
  tutorialStep,
  setTutorialStep,
  tutorialPages,
  navigateToSleep,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          setTutorialStep((prevState) => {
            if (0 === prevState) {
              return prevState;
            } else {
              return prevState - 1;
            }
          })
        }
      >
        <ArrowLeft />
      </TouchableOpacity>
      <View style={styles.dotWrapper}>
        {tutorialPages.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => setTutorialStep(index)}>
            <Dot active={tutorialStep === index} />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => {
          if (tutorialPages.length === tutorialStep + 1) {
            navigateToSleep();
          } else {
            setTutorialStep((prevState) => prevState + 1);
          }
        }}
      >
        <ArrowRight final={tutorialPages.length === tutorialStep + 1} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 220,
  },
  dotWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 120,
  },
});
