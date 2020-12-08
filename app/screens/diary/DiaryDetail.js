import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../styles';

export default DiaryDetail = ({ navigation, route }) => {
  const navigateBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Diary</Text>
      <View style={styles.contentWrapper}>
        <Text>Test ddetail page</Text>
      </View>
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
    paddingBottom: 10,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: globalStyles.color.darkBackground,
    width: '100%',
    padding: 25,
  },
});
