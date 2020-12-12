import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import globalStyles from '../../../styles';

export default function DiaryGraph() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading graph...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.color.blue,
    borderRadius: 20,
    padding: 10,
    height: 188,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { ...globalStyles.text.compact, color: 'white', fontSize: 20 },
});
