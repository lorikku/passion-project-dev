import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { selectTracker } from '../../store/trackerSlice';
import { toggleFullScreen } from '../../store/uiSlice';

import SleepButton from '../../components/sleep/SleepButton';
import TrackerHandler from '../../components/sleep/TrackerHandler';

import globalStyles from '../../styles';
import Help from '../../components/svg/elements/Help';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default Sleep = ({ navigation }) => {
  const dispatch = useDispatch();
  const tracker = useSelector(selectTracker);

  const navigateToHelp = () => {
    dispatch(toggleFullScreen(true));
    navigation.navigate('Tutorial');
  };

  React.useEffect(() => {
    dispatch(toggleFullScreen(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={{ opacity: 0 }}>
          <Help />
        </View>
        <Text style={styles.subtitle}>
          {tracker.activeTracker ? 'Tracking' : 'Standby'}
        </Text>
        <TouchableOpacity style={styles.backButton} onPress={navigateToHelp}>
          <Help />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <SleepButton navigation={navigation} active={tracker.activeTracker} />
        <TrackerHandler active={tracker.activeTracker} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.color.background,
    ...globalStyles.spacer.safePadding,
    alignItems: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    marginRight: 20,
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    ...globalStyles.text.subTitle,
    color: globalStyles.color.white,
  },
});
