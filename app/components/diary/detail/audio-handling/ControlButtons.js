import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Audio } from 'expo-av';

import ControlButton from './ControlButton';

import globalStyles from '../../../../styles';

const buttons = {
  PLAY: 'play',
  STOP: 'stop',
  EDIT: 'edit',
  DELETE: 'delete',
};

let playbackAtUnMount = undefined;
export default ConrolButtons = ({
  navigateToRecordAudio,
  audioUri,
  deleteAudio,
  propStyle,
}) => {
  const [playbackObject, setPlaybackObject] = React.useState(undefined);
  const [audioPlaying, setAudioPlaying] = React.useState(false);

  //Loading audio object
  React.useEffect(() => {
    if (!playbackObject) {
      const fetchAudioAsync = async () => {
        const res = await Audio.Sound.createAsync(
          { uri: audioUri },
          { shouldPlay: false }
        );

        setPlaybackObject(res.sound);
      };
      fetchAudioAsync();
    }

    return () => {
      playbackAtUnMount &&
        playbackAtUnMount
          .stopAsync()
          .then(
            playbackAtUnMount.unloadAsync().then(setPlaybackObject(undefined))
          );
    };
  }, []);

  const handleAudio = async () => {
    if (audioPlaying) {
      await playbackObject.stopAsync();
      setAudioPlaying(false);
    } else {
      await playbackObject.playFromPositionAsync(0);
      setAudioPlaying(true);
    }
  };

  React.useEffect(() => {
    playbackAtUnMount = playbackObject;
  }, [playbackObject]);

  React.useEffect(() => {
    if (audioPlaying) {
      playbackObject.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          if (audioPlaying) {
            playbackObject.stopAsync().then(setAudioPlaying(false));
          }
        }
      });
    }
  }, [playbackObject, audioPlaying]);

  return playbackObject ? (
    <View style={[styles.recordedWrapper, propStyle]}>
      {!audioPlaying ? (
        <ControlButton name={buttons.PLAY} onPress={handleAudio} />
      ) : (
        <ControlButton name={buttons.STOP} onPress={handleAudio} />
      )}

      {navigateToRecordAudio && (
        <ControlButton name={buttons.EDIT} onPress={navigateToRecordAudio} />
      )}

      <ControlButton name={buttons.DELETE} onPress={deleteAudio} />
    </View>
  ) : (
    <Text style={styles.loading}>Loading recording...</Text>
  );
};

const styles = StyleSheet.create({
  recordedWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loading: {
    fontFamily: globalStyles.text.compact.fontFamily,
    color: globalStyles.color.white,
    fontSize: 18,
  },
});
