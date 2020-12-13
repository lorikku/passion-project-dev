import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Play from '../../../../svg/elements/Play';

import globalStyles from '../../../../../styles';

export default PlayButton = () => {
  return (
    <View style={styles.container}>
      <Play />
      <Text style={[styles.headerText, styles.buttonText]}>Play</Text>
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
