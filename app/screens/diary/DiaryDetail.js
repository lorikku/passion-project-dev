import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { selectDiary } from '../../store/diarySlice';

import DiaryGraph from '../../components/diary/DiaryGraph';
import BackIcon from '../../components/svg/elements/BackIcon';
import globalStyles from '../../styles';

export default DiaryDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const diary = useSelector(selectDiary);

  const [loadedEntry, setLoadedEntry] = React.useState(undefined);

  const navigateBack = () => navigation.goBack();

  //Load entry
  React.useState(() => {
    setLoadedEntry(
      diary.find((entry) => entry.trackerName === route.params.trackerName)
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.subtitle}>
          {loadedEntry
            ? new Date(
                parseInt(loadedEntry.trackerName.split('_')[1])
              ).toLocaleDateString()
            : 'Loading entry...'}
        </Text>
        <View style={{ opacity: 0 }}>
          <BackIcon />
        </View>
      </View>
      <View style={styles.contentWrapper}>
        <View>
        {/* <Text style={styles.headerText}>Dream recording audio</Text> */}
        </View>
        <View>
          <Text style={styles.headerText}>Sleep movement analysis graph</Text>
          {loadedEntry && <DiaryGraph data={loadedEntry.analysisData} />}
        </View>
      </View>
    </View>
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
    marginBottom: 10
  },
});
