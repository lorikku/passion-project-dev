import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import {makeEntryAvailible} from '../../../store/diarySlice';

import globalStyles from '../../../styles';

//Component for prompting to record dream/audio
export default EntryUnavailible = ({ trackerName }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.contentWrapper}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          //Make entry availible in diary list which will also make user navigate to the 'EntryAvailible' component
          dispatch(makeEntryAvailible(trackerName))
        }}
      >
        <Text style={styles.addButtonText}>Add reality check</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    backgroundColor: globalStyles.color.darkBackground,
    width: '100%',
    padding: 20,

    justifyContent: 'center',
  },
  headerText: {
    ...globalStyles.text.compact,
    color: globalStyles.color.white,
    fontSize: 20,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: globalStyles.color.lightblue,
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 30,
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  addButtonText: {
    color: globalStyles.color.background,
    ...globalStyles.text.compact,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
