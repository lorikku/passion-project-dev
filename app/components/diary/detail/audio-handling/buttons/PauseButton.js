import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Pause from '../../../../svg/elements/Pause';

import globalStyles from '../../../../../styles';

export default PauseButton = () => {
  return (
    <View style={styles.container}>
      <Pause />
      <Text style={[styles.headerText, styles.buttonText]}>Pause</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    ...globalStyles.text.compact,
    color: globalStyles.color.white,
    fontSize: 20,
  },
  buttonText: { fontSize: 22, marginLeft: 10 },
});
