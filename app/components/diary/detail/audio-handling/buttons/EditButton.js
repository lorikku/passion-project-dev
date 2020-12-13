import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Edit from '../../../../svg/elements/Edit';

import globalStyles from '../../../../../styles';

export default EditButton = () => {
  return (
    <View style={styles.container}>
      <Edit />
      <Text style={[styles.headerText, styles.buttonText]}>Edit</Text>
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
