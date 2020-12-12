import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../../../styles';

export default Explanation = () => {
  return (
    <View>
      <Text style={styles.headerText}>Hope you had a lucid dream :)</Text>
      <Text style={styles.bodyText}>
        Keeping track of your dreams is important so that you can get a sense of
        your personal dream patterns.{'\n'}By memorizing these, you will be able
        to recognize the fact that you’re dreaming, faster, thus lucid dreaming.
        {'\n\n'}
        Do you want to record you dream?{'\n'}You can always do this later.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    ...globalStyles.text.compact,
    color: globalStyles.color.white,
    fontSize: 20,
    marginBottom: 10,
  },
  bodyText: {
    ...globalStyles.text.default,
    color: globalStyles.color.gray,
    fontSize: 14,
  },
});
