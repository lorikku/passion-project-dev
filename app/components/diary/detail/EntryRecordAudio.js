import * as React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

import { useDispatch } from 'react-redux';
import { setEntryAudioUriAsyc } from '../../../store/diarySlice';

import Explanation from './audio-handling/Explanation';
import RecordButtons from './audio-handling/RecordButtons';
import StatusDisplay from './audio-handling/StatusDisplay';

import globalStyles from '../../../styles';

//Variable used when component unmounts, scroll down to "emergencyStopRecording" for more
let recordingStateAtUnmount = undefined;
const recordingMax = 60;
const messages = {
  IDLE: 'No recording made',
  PERMISSIONS: 'Checking permissions',
  PREPARE: 'Preparing your recording',
  RUN: 'run',
  SAVING: 'Saving recorded audio',
};

//Component for prompting to record dream/audio
export default EntryRecordAudio = ({
  navigation,
  trackerName,
  currentAudioUri,
  audioSaving,
  deleteAudio,
}) => {
  const dispatch = useDispatch();

  const navigateToEntryDetail = () =>
    navigation.navigate('DiaryDetail', {
      trackerName,
      recordAudio: false,
    });

  //UI States
  const [disabledButton, setDisabledButton] = React.useState(false);
  const [message, setMessage] = React.useState(messages.IDLE);
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  //Recording states
  const [recordingObject, setRecordingObject] = React.useState(false);

  const handleRecordingOverwrite = () => {
    Alert.alert(
      'Are you sure?',
      'This will replace your previous recording!',
      [
        {
          text: 'No, keep it',
        },
        {
          text: "Yes, I'm sure",
          onPress: () => {
            startRecording({overwrite: true});
          },
        },
      ],
      { cancelable: false }
    );
  };

  //Normal start recording functionc
  const startRecording = async ({overwrite}) => {
    if (!overwrite) {
      if (currentAudioUri) {
        handleRecordingOverwrite();
        return;
      }
    } else {
      deleteAudio(overwrite)
    }

    setDisabledButton(true);

    //Get permissions
    setMessage(messages.PERMISSIONS);
    const perms = await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    //Prepare recording
    setMessage(messages.PREPARE);
    if (perms.granted) {
      //If permissions granted
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY
      );
      await recording.startAsync();

      setRecordingObject(recording);
      console.log('-------------- recording started! :) --------------');

      //If permissions not granted
    } else {
      setMessage(messages.IDLE);
      console.log('no premission granted :(');
    }

    setDisabledButton(false);
  };

  //Normal stop recording function
  const stopRecording = async () => {
    setDisabledButton(true);

    //Saving audio recording
    setMessage(messages.SAVING);
    await recordingObject.stopAndUnloadAsync();
    const newCacheUri = recordingObject.getURI();
    console.log('file saved in cache!');

    dispatch(
      setEntryAudioUriAsyc({
        trackerName,
        oldAudioUri: currentAudioUri,
        newCacheUri,
      })
    );

    setRecordingObject(undefined);
    setMessage(messages.IDLE);
    setDisabledButton(false);
  };

  //Used as an 'emergency stop' function if user unmounts component while still recording
  const emergencyStopRecording = async () => {
    await recordingStateAtUnmount.stopAndUnloadAsync();
    const uri = recordingStateAtUnmount.getURI();

    await FileSystem.deleteAsync(uri);

    console.log('no worries, recording emergency canceled and deleted! :)');
  };

  //For unloading and cancelling any active audio recordings when component unmounts
  React.useEffect(() => {
    return () => {
      if (recordingStateAtUnmount) {
        console.log('WOW, YOU LEFT MID RECORDING? NICE');
        emergencyStopRecording();
      }
    };
  }, []);

  //^ Updating the variable for the above react effect when component unmounts to make sure no recordings keep running
  React.useEffect(() => {
    recordingStateAtUnmount = recordingObject;
  }, [recordingObject]);

  //Subscribing to status and update time
  React.useEffect(() => {
    if (recordingObject) {
      recordingObject.setProgressUpdateInterval(500);
      recordingObject.setOnRecordingStatusUpdate((status) => {
        if (status.isRecording) {
          setTimeElapsed(status.durationMillis);
          if (status.durationMillis / 1000 >= recordingMax) {
            stopRecording();
          }
        }
      });
    }

    return () => setTimeElapsed(0);
  }, [recordingObject]);

  // COMPONENT
  return (
    <View style={styles.contentWrapper}>
      <Explanation audioUri={currentAudioUri} />
      <StatusDisplay
        audioSaving={audioSaving}
        currentAudioUri={currentAudioUri}
        recordingObject={recordingObject}
        timeElapsed={timeElapsed}
        message={message}
        messages={messages}
        deleteAudio={deleteAudio}
        recordingMax={recordingMax}
      />
      <RecordButtons
        disabledButton={disabledButton}
        recordingObject={recordingObject}
        startRecording={startRecording}
        stopRecording={stopRecording}
        navigateToEntryDetail={navigateToEntryDetail}
        currentAudioUri={currentAudioUri}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    backgroundColor: globalStyles.color.darkBackground,
    width: '100%',
    padding: 20,

    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
