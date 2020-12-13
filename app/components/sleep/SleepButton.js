import * as React from 'react';
import { Alert } from 'react-native';
import * as Brightness from 'expo-brightness';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

import { useDispatch, useSelector } from 'react-redux';
import { addDiaryEntry, makeEntryAvailible} from '../../store/diarySlice';
import { selectTracker, toggleTracker } from '../../store/trackerSlice';
import trackerTools from './trackerTools';

import { TouchableOpacity } from 'react-native-gesture-handler';
import SleepIcon from '../svg/elements/SleepIcon';

export default SleepButton = ({ navigation, active }) => {
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
              Brightness.getPermissionsAsync().then(
                ({ status }) =>
                  status === 'granted' && Brightness.useSystemBrightnessAsync()
              );
              //Disable tracker
              dispatch(toggleTracker(undefined));
              //Make tracker availible in list
              dispatch(makeEntryAvailible(tracker.activeTracker))
              //To let screen sleep
              deactivateKeepAwake('tracker');
              //Navigate to diary list first to load it in as "first stack"
              navigation.navigate('DiaryScreen', {
                screen: 'Diary',
              });
              //Then navigate to diary detail
              navigation.navigate('DiaryScreen', {
                screen: 'DiaryDetail',
                params: {
                  trackerName: active,
                  recordAudio: true
                },
              });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      /* NEW TRACKING SESSION */
      //Set lowest possible brightness to save batteries
      Brightness.getPermissionsAsync().then(
        ({ status }) => status === 'granted' && Brightness.setBrightnessAsync(0)
      );
      //Generate a filename and activate tracker
      const fileName = trackerTools.generateFileName();
      //Activate tracker with filename (used as id)
      dispatch(toggleTracker(fileName));
      //Add a new entry to the diary with filename (used as id)
      dispatch(addDiaryEntry(fileName));
      //To keep screen awake
      activateKeepAwake('tracker');
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
