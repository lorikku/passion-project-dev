import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Trash from '../../../svg/elements/Trash';

import globalStyles from '../../../../styles';

export default TrashButton = () => {
  return (
    <View style={styles.container}>
      <Trash />
      <Text style={[styles.headerText, styles.buttonText]}>Delete</Text>
    </View>
  );
};s

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    ...globalStyles.text.compact,
    color: globalStyles.color.white,
    fontSize: 20,
    marginBottom: 10,
  },
  buttonText: { fontSize: 22, marginLeft: 10 },
});
