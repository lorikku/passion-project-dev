import * as React from 'react';
import { Alert } from 'react-native';
import * as Brightness from 'expo-brightness';

import { useDispatch } from 'react-redux';
import { toggleTracker } from '../../store/trackerSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SleepIcon from '../svg/elements/SleepIcon';

export default SleepButton = ({ active }) => {
  const dispatch = useDispatch();

  const onButtonPress = () => {
    if (active) {
      Alert.alert(
        'Wakey wakey!',
        'Are you sure you want to stop tracking your sleep?',
        [
          {
            text: "No, I'll continue sleeping",
          },
          {
            text: "Yes, I'm awake!",
            onPress: () => {
              Brightness.getPermissionsAsync().then(({ status }) => {
                if (status === 'granted') {
                  Brightness.useSystemBrightnessAsync();
                }
              });
              dispatch(toggleTracker());
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Brightness.getPermissionsAsync().then(({ status }) => {
        if (status === 'granted') {
          Brightness.setBrightnessAsync(0);
        }
      });
      dispatch(toggleTracker());
    }
  };

  return (
    <TouchableOpacity
      style={{ height: 300, justifyContent: 'center' }}
      onPress={onButtonPress}
    >
      <SleepIcon active={active} />
    </TouchableOpacity>
  );
};
