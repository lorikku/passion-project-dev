import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import IntroBg from '../../components/svg/intro/IntroBg';
import ArrowRight from '../../components/svg/elements/ArrowRight';
import globalStyles from '../../styles';

import { useDispatch } from 'react-redux';
import { toggleNav } from '../../store/uiSlice';

export default Intro = ({ navigation, props }) => {
  const dispatch = useDispatch();
  const onStartPress = () => {
    dispatch(toggleNav());
  };
  return (
    <View style={styles.container}>
      <IntroBg style={{ ...StyleSheet.absoluteFillObject }} />
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
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
