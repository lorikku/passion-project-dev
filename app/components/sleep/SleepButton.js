import * as React from 'react';
import { Alert } from 'react-native';
import * as Brightness from 'expo-brightness';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

import { useDispatch, useSelector } from 'react-redux';
import {
  addDiaryEntry,
  makeEntryAvailible,
  selectDiary,
} from '../../store/diarySlice';
import { selectTracker, toggleTracker } from '../../store/trackerSlice';
import trackerTools from './trackerTools';

import { TouchableOpacity } from 'react-native-gesture-handler';
import SleepIcon from '../svg/elements/SleepIcon';
import { toggleFullScreen } from '../../store/uiSlice';

export default SleepButton = ({ navigation, active }) => {
  const dispatch = useDispatch();

  const diary = useSelector(selectDiary);
  const analysisDataTooShort = diary[0].analysisData.length < 5;

  const tracker = useSelector(selectTracker);

  const handleTrackerToggle = () => {
    if (active) {
      /* STOPPING TRACKING SESSION */
      let message = 'Are you sure you want to stop tracking your sleep?';
      if (analysisDataTooShort)
        message += " You don't have enough data for a new entry!";

      Brightness.getPermissionsAsync().then(
        ({ status }) =>
          status === 'granted' && Brightness.setBrightnessAsync(0.05)
      );

      Alert.alert(
        'Wakey wakey!',
        message,
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
              //To let screen sleep
              deactivateKeepAwake('tracker');
              //Disable fullscreen
              dispatch(toggleFullScreen(false));
              //Make tracker availible in list
              if (analysisDataTooShort) {
                dispatch(makeEntryAvailible('remove'));
              } else {
                dispatch(makeEntryAvailible(tracker.activeTracker));
                //Navigate to diary list first to load it in as "first stack"
                navigation.navigate('DiaryScreen', {
                  screen: 'Diary',
                });
                //Then navigate to diary detail
                navigation.navigate('DiaryScreen', {
                  screen: 'DiaryDetail',
                  params: {
                    trackerName: active,
                    recordAudio: true,
                  },
                });
              }
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
      //Enable fullscreen
      dispatch(toggleFullScreen(true));
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
