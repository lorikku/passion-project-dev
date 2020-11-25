import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../styles';

export default RealityCheck = ({ navigation, props }) => {
  return (
    <View style={styles.container}>
      <Text>Checklist</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.color.background,
    ...globalStyles.spacer.safePadding,
  },
});
