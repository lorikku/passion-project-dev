import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { purgeDiary, selectDiary } from '../../store/diarySlice';

import DiaryList from '../../components/diary/DiaryList';
import EmptyList from '../../components/general/EmptyList';
import globalStyles from '../../styles';

export default RealityCheck = ({ navigation }) => {
  const dispatch = useDispatch();
  const diary = useSelector(selectDiary); 
  return (
    <View style={styles.container}>
      <Text onLongPress={() => dispatch(purgeDiary())} style={styles.subtitle}>Diary</Text>
      <View style={styles.contentWrapper}>
        {diary.length === 0 || diary.findIndex(entry => entry.availible === true) === -1 ? (
          <EmptyList diary={true} navigation={navigation} />
        ) : (
          <DiaryList data={diary} navigation={navigation} />
        )}
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
  subtitle: {
    ...globalStyles.text.subTitle,
    color: globalStyles.color.white,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: globalStyles.color.darkBackground,
    width: '100%',
    paddingVertical: 25,
  }
});
