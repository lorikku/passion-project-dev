import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useSelector } from 'react-redux';
import { selectChecker } from '../../store/checkerSlice';

import globalStyles from '../../styles';

import AddIcon from '../../components/svg/elements/AddIcon';
import CheckerList from '../../components/reality-check/CheckerList';
import EmptyList from '../../components/general/EmptyList';
import {
  getPermissionsAsync,
  requestPermissionsAsync,
} from 'expo-notifications';

//Requesting notification permissions (for iOS)
getPermissionsAsync().then(() => {
  requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
});

export default RealityCheck = ({ navigation }) => {
  const checker = useSelector(selectChecker);
  const navigateToInput = () => navigation.navigate('RealityCheckInput');
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Reality Checks</Text>
      <View style={styles.contentWrapper}>
        {checker.length === 0 ? (
          <EmptyList />
        ) : (
          <CheckerList data={checker} />
        )}
        <View>
          <TouchableOpacity style={styles.addButton} onPress={navigateToInput}>
            <AddIcon />
          </TouchableOpacity>
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
  subtitle: {
    ...globalStyles.text.subTitle,
    color: globalStyles.color.white,
    paddingBottom: 10,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: globalStyles.color.darkBackground,
    width: '100%',
    paddingVertical: 25,
    justifyContent: 'space-between',
  },
  addButton: {
    alignSelf: 'center',
    paddingTop: 10,
    marginBottom: -10,
  },
});
