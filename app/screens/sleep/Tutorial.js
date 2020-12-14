import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useDispatch } from 'react-redux';
import { toggleFullScreen } from '../../store/uiSlice';

import BgTutorial from '../../components/svg/intro/BgTutorial';
import TutorialImage from '../../components/sleep/tutorial/TutorialImage';
import BottomSlider from '../../components/sleep/tutorial/BottomSlider';

import globalStyles from '../../styles';

const tutorialPages = [
  {
    title: 'Welcome to Lucidy!',
    content:
      'Lucidy is an app that will train you to experience more dreams and ultimately give you the ability to have lucid dreams!\n\nFirst, you need guidance through a brief tutorial showing you how to use our SLEEP TRACKER.\n\nThat’s right! This app allows you to use a sleeptracker which tracks your movements in your sleep!',
  },
  {
    title: 'Sleep tracker?',
    content:
      'By doing this, Lucidy can detect when you are having a REM phase. When Lucidy detects this, it will play a soft sound during your sleep to notify you that you are in a dreaming phase.\n\nThis way, you will hear the sound in your dream and realize that it’s Lucidy telling you that you’re dreaming, becoming aware of your dreams and ultimately having a lucid dream!',
  },
  {
    title: 'How does it work?',
    content:
      'Step 1: Activate the tracker by clicking on the huge button you find on the “Sleep” tab.\n\nStep 2: Put your phone on your bed, next to you. Charging is not necessary unless your phone is under 20% battery. (Scared of radiation? Turn on airplane mode!)\n\nStep 3: Sleep, and click the button again whenever you wake up!',
  },
];

export default Intro = ({ navigation }) => {
  const dispatch = useDispatch();

  const [tutorialStep, setTutorialStep] = React.useState(0);

  const navigateToSleep = () => {
    dispatch(toggleFullScreen(false));
    setTutorialStep(0);
    navigation.navigate('Sleep');
  };

  React.useEffect(() => {
    dispatch(toggleFullScreen(true));
  }, []);

  return (
    <View style={styles.container}>
      <BgTutorial style={{ ...StyleSheet.absoluteFillObject }} />
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{tutorialPages[tutorialStep].title}</Text>
        <Text style={styles.text}>{tutorialPages[tutorialStep].content}</Text>
        <TutorialImage tutorialStep={tutorialStep} />
        <BottomSlider
          tutorialStep={tutorialStep}
          setTutorialStep={setTutorialStep}
          tutorialPages={tutorialPages}
          navigateToSleep={navigateToSleep}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 60,
  },
  title: {
    fontFamily: globalStyles.text.title.fontFamily,
    fontSize: 30,
    color: globalStyles.color.white,
  },
  text: {
    ...globalStyles.text.compact,
    color: globalStyles.color.white,
    marginHorizontal: 40,
    fontSize: 15,
  },
});
