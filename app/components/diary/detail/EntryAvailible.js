import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useDispatch } from 'react-redux';

import DiaryGraph from '../../../components/diary/DiaryGraph';
import globalStyles from '../../../styles';

export default EntryAvailible = ({ navigation, entry }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.contentWrapper}>
      <View>
        {/* <Text style={styles.headerText}>Dream recording audio</Text> */}
      </View>
      <View>
        <Text style={styles.headerText}>Sleep movement analysis graph</Text>
        <DiaryGraph data={entry.analysisData} />
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

    justifyContent: 'center',
  },
  headerText: {
    ...globalStyles.text.compact,
    color: globalStyles.color.white,
    fontSize: 20,
    marginBottom: 10,
  },
});
