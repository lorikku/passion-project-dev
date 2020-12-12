import * as React from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { useDispatch } from 'react-redux';
import { deleteDiaryEntry } from '../../store/diarySlice/index';

import trackerTools from '../sleep/trackerTools';
import globalStyles from '../../styles';

const { formatTime } = trackerTools;

export default DiaryList = ({ navigation, data }) => {
  const dispatch = useDispatch();
  const navigateToDetail = (trackerName) => {
    navigation.navigate('DiaryDetail', {
      trackerName,
    });
  };

  const handleDeletion = (trackerName) => {
    Alert.alert(
      'Delete Diary Entry?',
      'Are you sure you want to delete this diary entry?',
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: () => dispatch(deleteDiaryEntry(trackerName)),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      {data.map((entry) => {
        const date = new Date(parseInt(entry.trackerName.split('_')[1]));
        return entry.availible ? (
          <TouchableOpacity
            key={entry.trackerName}
            onPress={() => navigateToDetail(entry.trackerName)}
            onLongPress={() => handleDeletion(entry.trackerName)}
          >
            <View style={styles.container}>
              <View>
                <Text
                  style={styles.headerText}
                  // entry.analysisData[entry.analysisData.length - 1].elapsedTime
                >{`${date.toLocaleDateString()} • ${formatTime(entry.analysisData[entry.analysisData.length - 1].elapsedTime)}`}</Text>
                <Text
                  style={[
                    styles.bodyText,
                    !entry.audioUri && { color: 'gray' },
                  ]}
                >
                  {entry.audioUri
                    ? 'Audio recording availible'
                    : 'Audio recording unavailible'}
                </Text>
              </View>
              <View style={styles.remWrapper}>
                <Text style={styles.remAmountText}>{`${entry.remAmount}`}</Text>
                <Text style={styles.remText}>REM</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: { alignItems: 'center' },
  container: {
    backgroundColor: globalStyles.color.blue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width - 50,

    marginBottom: 15,
    borderRadius: 30,
    padding: 20,
  },
  headerText: {
    ...globalStyles.text.compact,
    color: globalStyles.color.white,
    fontSize: 20,
    maxWidth: 200,
  },
  bodyText: {
    ...globalStyles.text.default,
    color: globalStyles.color.gray,
    fontSize: 14,
  },
  remWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  remAmountText: {
    fontFamily: globalStyles.text.title.fontFamily,
    color: globalStyles.color.white,
    fontSize: 16,
    marginBottom: Platform.OS === 'android' ? -13 : 0,
  },
  remText: {
    ...globalStyles.text.compact,
    color: globalStyles.color.lightblue,
  },
});
