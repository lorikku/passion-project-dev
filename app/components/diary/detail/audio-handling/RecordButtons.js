import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import globalStyles from '../../../../styles';

export default RecordButtons = ({
  disabledButton,
  recordingObject,
  startRecording,
  stopRecording,
  navigateToEntryDetail,
  currentAudioUri,
}) => {
  return (
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
          {currentAudioUri ? 'Go to detail page' : "I'll do this later"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
