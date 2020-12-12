import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { selectDiary } from '../../store/diarySlice';

import BackIcon from '../../components/svg/elements/BackIcon';
import globalStyles from '../../styles';
import EntryAvailible from '../../components/diary/detail/EntryAvailible';
import EntryUnavailible from '../../components/diary/detail/EntryUnavailible';

export default DiaryDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const diary = useSelector(selectDiary);

  //Navigate back to diary list
  const navigateBack = () => navigation.navigate('Diary');

  //Load entry
  const loadedEntry = diary.find((entry) => entry.trackerName === route.params.trackerName);

  return loadedEntry ? (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.subtitle}>
          {new Date(
            parseInt(loadedEntry.trackerName.split('_')[1])
          ).toLocaleDateString()}
        </Text>
        <View style={{ opacity: 0 }}>
          <BackIcon />
        </View>
      </View>
      {loadedEntry.availible ? (
        <EntryAvailible entry={loadedEntry} />
      ) : (
        <EntryUnavailible trackerName={route.params.trackerName} />
      )}
    </View>
  ) : (
    <Text style={[styles.headerWrapper, styles.subtitle]}>Loading...</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.color.background,
    ...globalStyles.spacer.safePadding,
    alignItems: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  subtitle: {
    ...globalStyles.text.subTitle,
    color: globalStyles.color.white,
    textAlign: 'center',
  },
  backButton: {
    marginLeft: 20,
  },
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
