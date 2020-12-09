import * as React from 'react';
import { Alert } from 'react-native';
import * as Brightness from 'expo-brightness';

import { useDispatch, useSelector } from 'react-redux';
import { addDiaryEntry, makeEntryAvailible } from '../../store/diarySlice';
import { selectTracker, toggleTracker } from '../../store/trackerSlice';
import trackerTools from './trackerTools';

import { TouchableOpacity } from 'react-native-gesture-handler';
import SleepIcon from '../svg/elements/SleepIcon';

export default SleepButton = ({ active }) => {
  const dispatch = useDispatch();
  const tracker = useSelector(selectTracker);

  const handleTrackerToggle = () => {
    if (active) {
      /* STOPPING TRACKING SESSION */
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
              //Set brightness back to system brightness
              Brightness.getPermissionsAsync().then(({ status }) => status === 'granted' && Brightness.useSystemBrightnessAsync());
              //Disable tracker
              dispatch(makeEntryAvailible(tracker.activeTracker));
              dispatch(toggleTracker(undefined));
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      /* NEW TRACKING SESSION */
      //Set lowest possible brightness to save batteries
      Brightness.getPermissionsAsync().then(({ status }) => status === 'granted' && Brightness.setBrightnessAsync(0));
      //Generate a filename and activate tracker
      const fileName = trackerTools.generateFileName();
      dispatch(toggleTracker(fileName));
      dispatch(addDiaryEntry(fileName));
    }
  };

  return (
    <TouchableOpacity
      style={{ height: 300, justifyContent: 'center' }}
      onPress={handleTrackerToggle}
    >
      <SleepIcon active={active} />
    </TouchableOpacity>
  );
};
