import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectChecker, addRealityCheck, deleteCheckerById} from '../../store/checkerSlice';
import globalStyles from '../../styles';
import * as Notifications from 'expo-notifications';

export default RealityCheck = ({ navigation, props }) => {
  const checker = useSelector(selectChecker);
  const dispatch = useDispatch();

  const onAddRealityCheck = async () => {
    //Content extracted from input, shown in notification
    const content = {
      title: 'Are you dreaming?',
      body: 'Check the time!',
    }
    //Scheduling notification and extracting notification identifier as "id"
    const id = await Notifications.scheduleNotificationAsync({
      content,
      trigger: {
        seconds: 5,
      },
    });
    //When id is extracted -> add "id" and "body" to redux store
    console.log(id);
    dispatch(
      addRealityCheck({
        id,
        body: content.body,
      })
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Reality Checks</Text>
      <View style={styles.contentWrapper}>
        {checker.length === 0 ? (
          <Text>Checker array empty</Text>
        ) : (
          <Text>Checker array full</Text>
        )}
        <Text onPress={onAddRealityCheck}>PRESS ME</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.color.background,
    ...globalStyles.spacer.safePadding,
    alignItems: 'center'
  },
  subtitle: {
    ...globalStyles.text.subTitle,
    color: globalStyles.color.white,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: globalStyles.color.darkBackground
  }
});
