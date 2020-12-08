import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import globalStyles from '../../styles';

export default EmptyList = ({ navigation, diary }) => {
  const navigateToSleep = () => navigation.navigate('SleepScreen');
  return (
    <ScrollView>
      {diary ? (
        <View style={styles.container}>
          <Text style={styles.headerText}>
            You currently have no diary entries.
          </Text>
          <Text style={styles.bodyText}>
            A diary entry will automatically be generated whenever you{' '}
            <Text
              onPress={navigateToSleep}
              style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}
            >
              track your sleep.
            </Text>
            {'\n\n'}
            You will be able to listen to the dreams you have recorded, as well
            as seeing a graph of your movements in your sleep and when Lucidy
            thought you were in a REM stage, trying to notify you!
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.headerText}>
            You currently have no reality checks.
          </Text>
          <Text style={styles.bodyText}>
            A reality check is basically a notification reminding you to do
            something such as “checking the time” or “counting your fingers”.
            {'\n\n'}By doing these in real life, you will start doing them
            unconciously in your dreams, as well.{'\n\n\n'}But here’s the catch:
            {'\n\n'}Your dream has no sense of “time” or your “amount of
            fingers”. So, for example, checking the time in your dreams will
            make no sense, which will make you hopefully realise that something
            is not right.
            {'\n\n'}At that point, you should get concious about the fact that
            you’re probably dreaming, becoming able to control your dream and
            ultimately having a lucid dream.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 280,
    alignSelf: 'center',
  },
  headerText: {
    ...globalStyles.text.compact,
    color: globalStyles.color.white,
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  bodyText: {
    ...globalStyles.text.default,
    color: globalStyles.color.gray,
    fontSize: 14,
  },
});
