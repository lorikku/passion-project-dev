import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../../../styles';

export default Explanation = ({ audioUri }) => {
  return !audioUri ? (
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
  ) : (
    <View>
      <Text style={styles.headerText}>Take a listen to your dream!</Text>
      <Text style={styles.bodyText}>
        You can listen to the audio you have recorded, or delete it if you don't
        like it.
        {'\n\n'}
        If you want to change your recording, just hit the record button.{'\n'}
        Just know that if you start recording, you will overwrite your previous
        recording.
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
