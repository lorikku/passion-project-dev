import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useDispatch } from 'react-redux';

import DiaryGraph from '../graph/DiaryGraph';
import DiaryGraphLoading from '../graph/DiaryGraphLoading';
import ControlButtons from './audio-handling/ControlButtons';

import globalStyles from '../../../styles';

export default EntryDetail = ({ navigation, entry, deleteAudio }) => {
  const dispatch = useDispatch();

  const navigateToRecordAudio = () =>
    navigation.navigate('DiaryDetail', {
      trackerName: entry.trackerName,
      recordAudio: true,
    });

  const [graphShouldLoad, setGraphShouldLoad] = React.useState(false);
  React.useEffect(() => {
    //Graph is a heavy component to load in when the parent component is mounting, so load this after parent component succesfully mounts instead
    setGraphShouldLoad(true);
  }, []);

  return (
    <View style={styles.contentWrapper}>
      <View>
        <Text style={styles.headerText}>Recorded dream</Text>
        {entry.audioUri ? (
          <ControlButtons
            propStyle={{ marginTop: 20}}
            audioUri={entry.audioUri}
            deleteAudio={deleteAudio}
            navigateToRecordAudio={navigateToRecordAudio}
          />
        ) : (
          <Text style={styles.bodyText}>
            You currently don't have a recorded dream.{`\n`}Do you wish to{' '}
            <Text
              onPress={navigateToRecordAudio}
              style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}
            >
              record one
            </Text>
            ?
          </Text>
        )}
      </View>
      <View>
        <Text style={styles.headerText}>Sleep movement analysis graph</Text>
        {graphShouldLoad ? (
          <DiaryGraph data={entry.analysisData} />
        ) : (
          <DiaryGraphLoading />
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
  },
  headerText: {
    ...globalStyles.text.compact,
    color: globalStyles.color.white,
    fontSize: 20,
    marginBottom: 10,
  },
  bodyText: {
    ...globalStyles.text.default,
    color: globalStyles.color.gray,
    fontSize: 16,
  },
});
