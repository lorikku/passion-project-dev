import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import ConrolButtons from './ControlButtons';

import globalStyles from '../../../../styles';

export default StatusDisplay = ({
  recordingObject,
  audioSaving,
  currentAudioUri,
  timeElapsed,
  message,
  messages,
  deleteAudio,
}) => {
  //Function to parse time
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

  return currentAudioUri ? (
    audioSaving ? (
      <Text style={[styles.timer, { opacity: recordingObject ? 1 : 0.4 }]}>{messages.SAVING}</Text>
    ) : (
      <ConrolButtons propStyle={{width: 300}} deleteAudio={deleteAudio} audioUri={currentAudioUri} />
    )
  ) : (
    <Text style={[styles.timer, { opacity: recordingObject ? 1 : 0.4 }]}>
      {recordingObject ? getTime(timeElapsed) : message}
    </Text>
  );
};

const styles = StyleSheet.create({
  timer: {
    ...globalStyles.text.compact,
    color: globalStyles.color.lightblue,
    fontSize: 24,
  },
});
