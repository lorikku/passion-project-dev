import * as React from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Brightness from 'expo-brightness';

import { useDispatch } from 'react-redux';
import { disableFirstTime, toggleFullScreen } from '../../store/uiSlice';

import Bg from '../../components/svg/intro/Bg';
import ArrowRight from '../../components/svg/intro/ArrowRight';
import globalStyles from '../../styles';

export default Intro = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleNav = () => {
    navigation.navigate('Sleep');
    navigation.navigate('Tutorial');
    dispatch(disableFirstTime());
  };

  const onStartPress = () => {
    //Permissions required only for android
    if (Platform.OS === 'android') {
      Alert.alert(
        'Permissions',
        'Lucidy needs permissions to write system settings. We use this to edit your brightness level when tracking your sleep. This would drastically save your battery life.',
        [
          {
            text: 'Give permissions',
            onPress: () => {
              Brightness.requestPermissionsAsync().then(() => {
                handleNav();
              });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      handleNav();
    }
  };
  return (
    <View style={styles.container}>
      <Bg style={{ ...StyleSheet.absoluteFillObject }} />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>Lucidy</Text>
        <TouchableOpacity style={styles.button} onPress={onStartPress}>
          <Text style={styles.text}>Start your dreaming journey</Text>
          <ArrowRight />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textWrapper: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    ...globalStyles.text.title,
    color: globalStyles.color.white,
  },
  text: {
    ...globalStyles.text.default,
    color: globalStyles.color.white,
    marginRight: 10,
    fontSize: 22,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
