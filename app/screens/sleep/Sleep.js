import * as React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../styles';

import { useDispatch, useSelector } from 'react-redux';
import { selectTracker, toggleTracker } from '../../store/trackerSlice';
import SleepIcon from '../../components/svg/elements/SleepIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default Sleep = ({ navigation, props }) => {
  const tracker = useSelector(selectTracker);
  const dispatch = useDispatch();

  const onButtonPress = () => {
    if (tracker.activeTracker) {
      Alert.alert(
        'Wakey wakey!',
        'Are you sure you want to stop tracking your sleep?',
        [
          {
            text: "No, I'll continue sleeping",
            style: 'default',
          },
          {
            text: "Yes, I'm awake!",
            onPress: () => {
              dispatch(toggleTracker());
            },
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    } else {
      dispatch(toggleTracker());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        {tracker.activeTracker ? 'Tracking' : 'Standby'}
      </Text>
      <TouchableOpacity
        style={{ height: 300, justifyContent: 'center' }}
        onPress={onButtonPress}
      >
        <SleepIcon active={tracker.activeTracker} />
      </TouchableOpacity>
      <Text
        style={[styles.timer, { opacity: tracker.activeTracker ? 1 : 0.4 }]}
      >
        {tracker.activeTracker ? '00:00:00' : '--:--:--'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.color.background,
    ...globalStyles.spacer.safePadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    ...globalStyles.text.subTitle,
    color: globalStyles.color.white,
  },
  timer: {
    ...globalStyles.text.compact,
    color: globalStyles.color.yellow,
  },
});
