import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../styles';

export default Diary = ({ navigation, props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Diary</Text>
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
  },
});
