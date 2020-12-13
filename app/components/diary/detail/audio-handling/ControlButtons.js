import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Audio } from 'expo-av';

import EditButton from './buttons/EditButton';
import PlayButton from './buttons/PlayButton';
import DeleteButton from './buttons/DeleteButton';
import PauseButton from './buttons/PauseButton';
import globalStyles from '../../../../styles';

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

    //Unload playbackObject when component unmounts
    return () =>
      playbackObject &&
      playbackObject.unloadAsync().then(setPlaybackObject(undefined));
  }, []);

  const playAudio = async () => {
    if (audioPlaying) {
      await playbackObject.stopAsync();
      setAudioPlaying(false);
    } else {
      await playbackObject.playFromPositionAsync(0);
      setAudioPlaying(true);
    }
  };

  React.useEffect(() => {
    if (audioPlaying) {
      playbackObject;
    }
  }, [audioPlaying]);

  return playbackObject ? (
    <View style={[styles.recordedWrapper, propStyle]}>
      {!audioPlaying ? (
        <TouchableOpacity onPress={playAudio}>
          <PlayButton />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={playAudio}>
          <PauseButton />
        </TouchableOpacity>
      )}

      {navigateToRecordAudio ? (
        <TouchableOpacity onPress={navigateToRecordAudio}>
          <EditButton />
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity onPress={deleteAudio}>
        <DeleteButton />
      </TouchableOpacity>
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
