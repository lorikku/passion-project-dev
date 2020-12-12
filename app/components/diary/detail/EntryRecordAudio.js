import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

import { useDispatch } from 'react-redux';

import globalStyles from '../../../styles';
import Explanation from './audio-recording/Explanation';

const messages = {
  IDLE: '--/60s',
  PERMISSIONS: 'Checking permissions',
  PREPARE: 'Preparing your recording',
  RUN: 'run',
  SAVING: 'Saving recording',
};
//Variable used when component unmounts, scroll down to "emergencyStopRecording" for more
let recordingStateAtUnmount = undefined;

//Component for prompting to record dream/audio
export default EntryRecordAudio = ({ navigation, trackerName }) => {
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
  const [playbackObject, setPlaybackObject] = React.useState(undefined);

  const startRecording = async () => {
    setDisabledButton(true);
    setMessage(messages.PERMISSIONS);

    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    setMessage(messages.PREPARE);

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(
      Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY
    );
    await recording.startAsync();

    setRecordingObject(recording);
    setDisabledButton(false);
    console.log('recording started! :)');
  };

  const stopRecording = async () => {
    setDisabledButton(true);
    setMessage(messages.SAVING);

    await recordingObject.stopAndUnloadAsync();
    const uri = recordingObject.getURI();
    console.log(uri);

    await FileSystem.deleteAsync(uri);

    setRecordingObject(undefined);
    setDisabledButton(false);
    setMessage(messages.IDLE);
    console.log('recording saved (and then deleted)! :)');
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

  //Function to get parse time
  const getTime = (timeToParse) => {
    let res = '';
    const time = Math.round(timeToParse / 1000);
    if (time.toString().length === 1) {
      res += '0';
    }
    res += time.toString();
    res += '/90s';
    return res;
  };

  //Subscribing to status and update time
  React.useEffect(() => {
    if (recordingObject) {
      recordingObject.setProgressUpdateInterval(1000);
      recordingObject.setOnRecordingStatusUpdate((status) => {
        if (status.isRecording) {
          setTimeElapsed(status.durationMillis);
        }
      });
    }

    return () => setTimeElapsed(0);
  }, [recordingObject]);

  return (
    <View style={styles.contentWrapper}>
      <Explanation />
      {/* Time tracking */}
      <Text style={[styles.timer, { opacity: recordingObject ? 1 : 0.4 }]}>
        {recordingObject ? getTime(timeElapsed) : message}
      </Text>
      {/* Buttons */}
      <View style={{ alignItems: 'center', opacity: disabledButton ? 0.4 : 1 }}>
        <TouchableOpacity
          disabled={disabledButton}
          style={[
            styles.recordButton,
            {
              backgroundColor: !recordingObject
                ? globalStyles.color.white
                : globalStyles.color.red,
            },
          ]}
          onPress={!recordingObject ? startRecording : stopRecording}
        >
          <Text
            style={[
              styles.recordButtonText,
              {
                color: recordingObject
                  ? globalStyles.color.white
                  : globalStyles.color.red,
              },
            ]}
          >
            {disabledButton
              ? 'Standby'
              : recordingObject
              ? 'Stop recording'
              : 'Start recording'}
          </Text>
        </TouchableOpacity>
        {!recordingObject && (
          <Text onPress={navigateToEntryDetail} style={styles.recordLater}>
            I'll do this later
          </Text>
        )}
      </View>
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
  timer: {
    ...globalStyles.text.compact,
    color: globalStyles.color.lightblue,
    fontSize: 30,
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,

    marginBottom: 15,
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: Platform.OS === 'ios' ? 17 : 10,
  },
  recordButtonText: {
    fontFamily: globalStyles.text.subTitle.fontFamily,
    fontSize: 18,
  },
  recordLater: {
    fontFamily: globalStyles.text.default.fontFamily,
    fontSize: 18,
    color: globalStyles.color.white,
    textDecorationLine: 'underline',
  },
});
