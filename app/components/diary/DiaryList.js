import * as React from 'react';
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import { useDispatch } from 'react-redux';
import { deleteDiaryEntry } from '../../store/diarySlice/index';

import globalStyles from '../../styles';

export default DiaryList = ({ data }) => {
  const dispatch = useDispatch();

  const handleDeletion = (entry) => {
    Alert.alert(
      'Delete Diary Entry?',
      'Are you sure you want to delete this diary entry?',
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: () => dispatch(deleteDiaryEntry(entry.trackerName)),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      {data.map((entry) => (
        <TouchableOpacity
          key={entry.trackerName}
          onLongPress={() => handleDeletion(entry)}
        >
          <View style={styles.container}>
            <View>
              <Text style={styles.bodyText}>{entry.trackerName}</Text>
            </View>
            <Switch
              value={true}
              onValueChange={() => console.log('this does nothing XD')}
            />
          </View>
        </TouchableOpacity>
      ))}
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
});
