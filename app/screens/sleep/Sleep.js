import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../styles';

import { useSelector } from 'react-redux';
import { selectTracker } from '../../store/trackerSlice';
import SleepButton from '../../components/sleep/SleepButton';
import TrackerHandler from '../../components/sleep/TrackerHandler';

export default Sleep = ({ navigation, props }) => {
  const tracker = useSelector(selectTracker);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        {tracker.activeTracker ? 'Tracking' : 'Standby'}
      </Text>
      <View style={styles.buttonWrapper}>
        <SleepButton active={tracker.activeTracker} />
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
